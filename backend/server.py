### server.py

import os
import sys
import json
from flask import Flask, send_from_directory
from flask import request
from flask import render_template
from flask_cors import CORS

from OpenSSL import SSL

from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from data import *
from verify_credentials import verify_credentials
from make_response import make_response
from send_mail import send_mail
from get_order_html import get_order_html

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite://backend/test.db'
CORS(app)
db.init_app(app)

def get_object_dict(object):

    dict = object.__dict__.copy()
    dict.pop("_sa_instance_state")

    return dict

with app.app_context():
    db.create_all()

##############################
#
#   user
#
##############################

@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def user(path):

    return send_from_directory("public/user/", "index.html")

##############################
#
# admin
#
##############################

@app.route("/admin", defaults={"path": ""})
@app.route("/admin/<path:path>")
def admin(path):

    print("headers")
    print(request.headers)
    print("cookie?")
    print(request.cookies.get("credentials"))
    if request.cookies.get("credentials") \
       and verify_credentials(request.cookies.get("credentials")):

        return send_from_directory("public/admin/", "index.html")

    return send_from_directory("public/admin_login/", "index.html")

##############################
#
# static js, css
#
##############################

@app.route("/public/<path:path>/<string:file>")
def send_static(path, file):

    print("path, file")
    print(path)
    print(file)

    return send_from_directory("public/" + path, file)

##############################
#
# assets
#
##############################

@app.route("/assets/<path:path>/<string:file>")
def send_asset(path, file):
    

    print("path, file")
    print(path)
    print(file)

    return send_from_directory("public/assets/" + path, file)

##################################################
#
#   user api
#
##################################################

@app.route("/api/user/products/<string:category>", methods=["GET"])
def user_api_products(category):

    query = db.session.execute(db.select(Product).where(Product.category==category)).scalars()

    data = []
    for item in query:
        data.append(get_object_dict(item))

    return make_response(True, data)

@app.route("/api/user/sizes/<int:id>", methods=["GET"])
def user_api_sizes(id):

    query = db.session.execute(db.select(Size).where(Size.product_id==id)).scalars()

    data = []
    for item in query:
        data.append(get_object_dict(item))

    return make_response(True, data)

@app.route("/api/user/order", methods=["POST"])
def user_order():

    print("order request")
    print(request.json)
    data = request.json
    items = []

    for item in data["items"]:

        sizeQuery = db.session.execute(db.select(Size).where(Size.id==item["size"])).scalars().one()

        if sizeQuery.stock < item["count"]:

            return make_response(False, {"invalid": item["size"]}) # todo make this more detailed for the frontend

    for item in data["items"]:

        sizeQuery = db.session.execute(db.select(Size).where(Size.id==item["size"])).scalars().one()
        db.session.execute(db.update(Size).where(Size.id==item["size"]).values(stock=Size.stock-item["count"]))
        productQuery = db.session.execute(db.select(Product).where(Product.id==sizeQuery.product_id)).scalars().one()

        itemData = {
            "count": item["count"],
            "allocated": False,
            "size_info": get_object_dict(sizeQuery),
            "product_info": get_object_dict(productQuery)
        }

        items.append(itemData)

    print("order items")
    print(items)

    db.session.add(Order(
        contact=json.dumps(data["contactInfo"]),
        items=json.dumps(items),
        fulfilled=False
    ))
    db.session.commit()

    send_mail(data["contactInfo"]["email"], "[EE] Order Recieved", get_order_html(data["contactInfo"], items))

    return make_response(True)

##################################################
#
#   admin api
#
##################################################

@app.route("/api/admin/login", methods=["POST"])
def admin_api_login():

    return json.dumps({"success": verify_credentials(request.headers["Authorization"])})

@app.route("/api/admin/data/<string:type>", methods=["GET", "POST"])
def admin_api_data(type):

    if not verify_credentials(request.headers["Authorization"]):

        return make_response(False)

    if request.method == "GET":

        query = db.session.execute(db.select(Product if type == "products" else Order)).scalars()

        data = []
        for item in query:
            data.append(get_object_dict(item))

        print("data")
        print(data)
        
        return make_response(True, data)

    elif request.method == "POST" and type == "products":

        db.session.add(Product(name="New product", 
                               category="peppers", 
                               heat=1, 
                               preview_image="/assets/images/carolina-reaper-small.png"))
        db.session.commit()

        return make_response(True)

    return make_response(False)

@app.route("/api/admin/data/<string:type>/<int:id>", methods=["GET", "DELETE", "PUT", "POST"])
def admin_api_data_id(type, id):

    if not verify_credentials(request.headers["Authorization"]):

        return make_response(False)

    object_type = Product if type == "products" else (Size if type == "sizes" else Order)

    if request.method == "GET":

        if type == "sizes":

            query = db.session.execute(db.select(Size)
                                        .where(Size.product_id==id)).scalars()

            data = []

            for size in query:
                data.append(get_object_dict(size))

            return make_response(True, data)

        query = db.session.execute(db.select(object_type)
                                    .where(object_type.id==id)).scalars().one()

        data = get_object_dict(query)

        return make_response(True, data)

    elif request.method == "DELETE":

        db.session.execute(db.delete(object_type).where(object_type.id==id))
        db.session.execute(db.update(object_type).where(object_type.id>=id).values(id=object_type.id-1))

        if type == "products": # need to delete associated sizes to clean up

            db.session.execute(db.delete(Size).where(Size.product_id==id))

        db.session.commit()

        return make_response(True)

    elif request.method == "PUT":

        db.session.execute(db.update(object_type).where(object_type.id==id).values(**request.json))
        db.session.commit()
        
        return make_response(True)

    elif request.method == "POST" and type == "sizes": # should always be sizes

        db.session.add(Size(product_id=id,
                            amount=0,
                            price=0,
                            available=False,
                            stock=0))
        db.session.commit()

        return make_response(True)
        
    return make_response(False)

if __name__ == "__main__":

    print("arguments")
    print(sys.argv)

    if not "--secure" in sys.argv:

        server_port = int(os.environ.get("PORT", 5000)) 
        app.run(debug=False, port=server_port, host='0.0.0.0')

    else:

        context = ("eember_ca.crt", "eember_ca.key")

        app.run(debug=True, host="0.0.0.0", port="443", ssl_context=context)
