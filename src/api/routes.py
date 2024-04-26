"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Coach
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route("/signup", methods=["POST"])
def handle_register():
    rqt_body = request.get_json(force=True)
    credentials = ["email", "password", "nickname","name","lastname"]
    for input in credentials:
        if input not in rqt_body or not rqt_body[input]:
            raise APIException('Some important field is missing', 400)
    if "rol" in rqt_body and rqt_body["rol"]:
        new_email = User.query.filter_by(email=rqt_body["email"]).first()
        if new_email:
            raise APIException("the email already exists in the system", 400)
        user = User(email=rqt_body["email"], password=rqt_body["password"],nickname=rqt_body["nickname"],name=rqt_body["name"],lastname=rqt_body["lastname"],rol=rqt_body["rol"])
        db.session.add(user)
        db.session.commit()
        answer = {
            "msg": "User Registered",
            "user": user.serialize()
        }
        return jsonify(answer), 200
    if not "rol" in rqt_body:
        new_email = Coach.query.filter_by(email=rqt_body["email"]).first()
        if new_email:
            raise APIException("the email already exists in the system", 400)
        coach = Coach(email=rqt_body["email"], password=rqt_body["password"],nickname=rqt_body["nickname"],name=rqt_body["name"],lastname=rqt_body["lastname"],description=rqt_body["description"],image=rqt_body["image"],speciality=rqt_body["speciality"])
        db.session.add(coach)
        db.session.commit()
        answer = {
            "msg": "Coach Registered",
            "coach": coach.serialize()
        }
        return jsonify(answer), 200
    
@api.route('/login', methods=['POST'])
def login():
    rqt_body = request.get_json(force=True)
    email = rqt_body["email"]
    password = rqt_body["password"]
    user = User.query.filter_by(email=email, password=password).first()
    if user:
        new_token = create_access_token(identity=user.id)
        answer = {
        "msg": "logged",
        "user": user.serialize(),
        "token": new_token
    }
        return jsonify(answer), 200
    coach = Coach.query.filter_by(email=email, password=password).first()
    if coach:
        new_token = create_access_token(identity=coach.id)
        answer = {
        "msg": "logged",
        "user": coach.serialize(),
        "token": new_token
    }
        return jsonify(answer), 200
    
    if not user and not coach:
        return jsonify("Incorrect credentials"), 401