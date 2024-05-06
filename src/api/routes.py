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
        token_data = {
            "id": user.id,
            "rol":user.rol
        }
        new_token = create_access_token(identity=token_data)
        answer = {
        "msg": "logged",
        "user": user.serialize(),
        "token": new_token
    }
        return jsonify(answer), 200
    coach = Coach.query.filter_by(email=email, password=password).first()
    if coach:
        token_data = {
            "id": coach.id,
            "rol":"coach"
        }
        new_token = create_access_token(identity=token_data)
        answer = {
        "msg": "logged",
        "user": coach.serialize(),
        "token": new_token
    }
        return jsonify(answer), 200
    if not user and not coach:
        return jsonify("Incorrect credentials"), 401
@api.route('/member', methods=['GET'])
@jwt_required()
def proct_member():
    new_user = get_jwt_identity()
    user = User.query.filter_by(id=new_user).first()
    if not user:
        return jsonify(success=False, message='Non-existent user'), 404
    answer = {
        "logged_in_as": new_user,
        "user": user.serialize()
    }
    return jsonify(success=True, response=answer), 200
@api.route('/coach', methods=['GET'])
@jwt_required()
def proct_coach():
    new_coach = get_jwt_identity()
    coach = Coach.query.filter_by(id=new_coach).first()
    if not coach:
        return jsonify(success=False, message='Non-existent coach'), 404
    answer = {
        "logged_in_as": new_coach,
        "user": coach.serialize()
    }
    return jsonify(success=True, response=answer), 200
@api.route('/users', methods = ['GET'])
def handle_user():
    response_body = {}
    users = User.query.all()
    response_body['results'] = [row.serialize() for row in users]
    response_body['message'] = 'Method GET Users'
    return jsonify (response_body),200
@api.route('/coaches', methods = ['GET'])
def handle_coach():
    response_body = {}
    coaches = Coach.query.all()
    response_body['results'] = [row.serialize() for row in coaches]
    response_body['message'] = 'Method GET Coaches'
    return jsonify (response_body),200
@api.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    new_user = get_jwt_identity()
    user_id = new_user['id']
    print (new_user)
    user = User.query.filter_by(id=user_id).first()
    if not user:
        return jsonify(success=False, message='Non-existent user'), 404
    answer = {
        "logged_in_as": new_user,
        "user": user.serialize()
    }
    return jsonify(success=True, response=answer), 200