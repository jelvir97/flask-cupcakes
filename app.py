"""Flask app for Cupcakes"""
from flask import Flask, request, render_template,redirect,jsonify
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, Cupcake

app= Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = 'lowlypotato'

debug = DebugToolbarExtension(app)
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

app.app_context().push()
connect_db(app)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/cupcakes')
def get_all_cupcakes():
    cupcakes = Cupcake.query.all()
    data = [c.serialize() for c in cupcakes]
    return jsonify(cupcakes=data)

@app.route('/api/cupcakes/<id>')
def get_cupcake_by_id(id):
    cupcake =Cupcake.query.get_or_404(int(id))
    return jsonify(cupcake=cupcake.serialize())

@app.route('/api/cupcakes', methods=["POST"])
def create_new_cupcake():
    resp = request.json
    cupcake = Cupcake(flavor=resp['flavor'],image=resp['image'],rating=resp['rating'],size=resp['size'])
    db.session.add(cupcake)
    db.session.commit()
    return (jsonify(cupcake = cupcake.serialize()),201)

@app.route('/api/cupcakes/<id>', methods=['PATCH'])
def update_cupcake(id):
    cupcake = Cupcake.query.get_or_404(int(id))
    db.session.query(Cupcake).filter_by(id=id).update(request.json)
    db.session.commit()
    return jsonify(cupcake = cupcake.serialize())

@app.route('/api/cupcakes/<id>', methods=["DELETE"])
def delete_cupcake(id):
    cupcake = Cupcake.query.get_or_404(int(id))
    db.session.delete(cupcake)
    db.session.commit()
    return jsonify(message="Deleted")

