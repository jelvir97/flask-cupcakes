"""Flask app for Cupcakes"""
from flask import Flask, request, render_template,redirect
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, Cupcake

app= Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'lowlypotato'

debug = DebugToolbarExtension(app)
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

app.context().push()
connect_db(app)

