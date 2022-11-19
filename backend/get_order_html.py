### get_order_html.py

def get_order_html(contact, items):

    print("contact info")
    print(contact)
    print("items")
    print(items)

    items_string = ""
    total = 0

    for item in items:

      items_string += f" : {item['size_info']['amount']}g x {item['count']} {item['product_info']['name']} ({item['product_info']['category']}) <br />"
      total += item['count'] * item['size_info']['price']

    return f"""\
<html>
  <head></head>
  <body>
    <p>Hi {contact["firstName"]} {contact["lastName"]},<br /><br />
    We've recieved your order for: <br />
    {items_string} <br />
    Total: ${total} ({contact["payment"]}) <br /><br />

    Cheers,
    </p>
  </body>
</html>
"""
