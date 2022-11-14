### data.py

from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Product(db.Model):

    id              = db.Column(db.Integer, primary_key=True)
    name            = db.Column(db.String)
    category        = db.Column(db.String)
    heat            = db.Column(db.Integer)
    preview_image   = db.Column(db.String)

class Size(db.Model):

    id          = db.Column(db.Integer, primary_key=True)
    product_id  = db.Column(db.Integer)
    amount      = db.Column(db.Integer)
    price       = db.Column(db.Integer)
    available   = db.Column(db.Boolean)
    stock       = db.Column(db.Integer)

class Order(db.Model):

    id          = db.Column(db.Integer, primary_key=True)
    contact     = db.Column(db.String)
    items       = db.Column(db.String)
    fulfilled   = db.Column(db.Boolean)
