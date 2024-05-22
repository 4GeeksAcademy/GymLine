"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Coach, Shop, Club,Shop_car
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import decode_token
api = Blueprint('api', __name__)
# Allow CORS requests to this API
CORS(api)
@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200

# Users Information
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

# Endpoint GET User by ID
@api.route ('/user/<int:user_id>', methods = ['GET'])
def handle_user_id(user_id): 
    response_body = {}
    user = User.query.get(user_id)
    if not user:
         raise APIException('User does not exist', status_code=400)
    response_body ['results'] = [user.serialize()]
    response_body['message'] = 'Method GET by ID an user'
    return jsonify (response_body) , 200


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

@api.route('/users', methods=['GET'])
@jwt_required()
def handle_user():
    # Obtener el token JWT desde la cabecera de la solicitud
    jwt_token = request.headers.get('Authorization')
    
    # Decodificar el token JWT para obtener los datos del usuario
    token_data = decode_token(jwt_token.replace('Bearer ', ''))

    print(token_data)
    
    # Verificar si el rol del usuario es "admin"
    if token_data['sub']['rol'] != 'admin':
        return jsonify({'message': 'Unauthorized access'}), 401

    # Si el usuario es un administrador, obtener y devolver los datos de todos los usuarios
    response_body = {}
    users = User.query.all()
    response_body['results'] = [row.serialize() for row in users]
    response_body['message'] = 'Method GET Users'
    return jsonify(response_body), 200

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

# Endpoint Delete User
@api.route ('/member/<int:member_id>', methods = ['DELETE'])
def delete_member (member_id):
    member_deleted = User.query.filter_by(id = member_id).first()
    if not member_deleted:
        raise APIException('Member does not exist', status_code=400)
    db.session.delete(member_deleted)
    db.session.commit()
    response_body = {'msg':'Member deleted'}
    return jsonify (response_body) , 200


# Endpoint Put User
@api.route ('/member/<int:member_id>', methods = ['PUT'])
def update_member(member_id):
    member = User.query.get(member_id)
    if not member:
         raise APIException('Member does not exist', status_code=400)
    data = request.json
    if 'email' in data:
        member.email = data['email']
    if 'password' in data:
        member.password = data['password']
    if 'nickname' in data:
        member.nickname = data['nickname']
    if 'name' in data:
        member.name = data['name']
    if 'lastname' in data:
        member.lastname = data['lastname']
    if 'rol' in data:
        member.rol = data['rol']
   
    db.session.commit()

    return jsonify({'message': 'Product updated successfully'}), 200

# Shop Information

# Endpoint GET All Products
@api.route('/products', methods=['GET'])
def handle_products():
    response_body = {}
    products = Shop.query.all()
    response_body['results'] = [row.serialize() for row in products]
    response_body['message'] = 'Method GET products'
    return jsonify(response_body), 200

# Endpoint GET product by ID
@api.route ('/product/<int:product_id>', methods = ['GET'])
def handle_product_id(product_id): 
    response_body = {}
    product = Shop.query.get(product_id)
    if not product:
         raise APIException('Product does not exist', status_code=400)
    response_body ['results'] = [product.serialize()]
    response_body['message'] = 'Method GET by ID an product'
    return jsonify (response_body) , 200

# Endpoint Post Product
@api.route ('/product', methods=['POST'])
def handle_create_product():
    data = request.json
    if 'product' not in data or 'price' not in data or 'image_product' not in data or 'description' not in data or 'type' not in data or 'stock' not in data:
        raise APIException('Some fields are missing', status_code=400)
    new_product = Shop(
        product=data['product'],
        price=data['price'],
        image_product=data['image_product'],
        description=data['description'],
        type=data['type'],
        stock=data['stock']
    )
    db.session.add(new_product)
    db.session.commit()
    return jsonify(new_product.serialize()), 201

# Endpoint Put Product
@api.route ('/product/<int:product_id>', methods = ['PUT'])
def update_product(product_id):
    product = Shop.query.get(product_id)
    if not product:
         raise APIException('Product does not exist', status_code=400)
    data = request.json
    if 'product' in data:
        product.product = data['product']
    if 'price' in data:
        product.price = data['price']
    if 'image_product' in data:
        product.image_product = data['image_product']
    if 'description' in data:
        product.description = data['description']
    if 'type' in data:
        product.type = data['type']
    if 'stock' in data:
        product.stock = data['stock']
   
    db.session.commit()

    return jsonify({'message': 'Product updated successfully'}), 200

# Endpoint Delete Product
@api.route ('/product/<int:product_id>', methods = ['DELETE'])
def delete_product (product_id):
    product_deleted = Shop.query.filter_by(id = product_id).first()
    if not product_deleted:
        raise APIException('Product does not exist', status_code=400)
    db.session.delete(product_deleted)
    db.session.commit()
    response_body = {'msg':'Product deleted'}
    return jsonify (response_body) , 200

# Club Information

# Endpoint GET All GYM
@api.route('/gyms', methods=['GET'])
def handle_clubs():
    response_body = {}
    clubs = Club.query.all()
    response_body['results'] = [row.serialize() for row in clubs]
    response_body['message'] = 'Method GET gyms'
    return jsonify(response_body), 200

# Endpoint GET GYM by ID
@api.route ('/gym/<int:gym_id>', methods = ['GET'])
def handle_gym_id(gym_id): 
    response_body = {}
    club = Club.query.get(gym_id)
    if not club:
         raise APIException('Gym does not exist', status_code=400)
    response_body ['results'] = [club.serialize()]
    response_body['message'] = 'Method GET by ID an gym'
    return jsonify (response_body) , 200

# Endpoint Post GYM
@api.route ('/gym', methods=['POST'])
def handle_create_gym():
    data = request.json
    if 'city' not in data or 'gym' not in data or 'address' not in data or 'phone' not in data or 'email' not in data or 'url' not in data:
        raise APIException('Some fields are missing', status_code=400)
    new_gym = Club(
        city=data['city'],
        gym=data['gym'],
        address=data['address'],
        phone=data['phone'],
        email=data['email'],
        url=data['url'],
    )
    db.session.add(new_gym)
    db.session.commit()
    return jsonify(new_gym.serialize()), 201

# Endpoint Put GYM
@api.route ('/gym/<int:gym_id>', methods = ['PUT'])
def update_gym(gym_id):
    club = Club.query.get(gym_id)
    if not club:
         raise APIException('Gym does not exist', status_code=400)
    data = request.json
    if 'city' in data:
        club.city = data['city']
    if 'gym' in data:
        club.gym = data['gym']
    if 'address' in data:
        club.address = data['address']
    if 'phone' in data:
        club.phone = data['phone']
    if 'email' in data:
        club.email = data['email']
    if 'url' in data:
        club.url = data['url']
   
    db.session.commit()

    return jsonify({'message':'Gym updated successfully'}), 200

# Endpoint Delete GYM
@api.route ('/gym/<int:gym_id>', methods = ['DELETE'])
def delete_gym (gym_id):
    gym_deleted = Club.query.filter_by(id = gym_id).first()
    if not gym_deleted:
        raise APIException('Gym does not exist', status_code=400)
    db.session.delete(gym_deleted)
    db.session.commit()
    response_body = {'msg':'Gym deleted'}
    return jsonify (response_body) , 200

# Endpoint Post Shop Car

@api.route ('/shop_car', methods=['POST'])
def handle_add_car():
    data = request.json
    if 'user_id' not in data or 'product_id' not in data :
        raise APIException('Some fields are missing', status_code=400)
    car = Shop_car(
        user_id=data['user_id'],
        product_id=data['product_id'] 
    )
    db.session.add(car)
    db.session.commit()
    return jsonify(car.serialize()), 201

# Endpoint Get Shop Car

@api.route('/shop_car/<int:user_id>', methods=['GET'])
def handle_get_car(user_id): 
    response_body = {}

    # Realiza un join entre Shop_car y Shop
    car_items = db.session.query(Shop_car, Shop).join(Shop, Shop_car.product_id == Shop.id).filter(Shop_car.user_id == user_id).all()
    
    if not car_items:
        raise APIException('User does not have products in car', status_code=400)
    
    # Construye la respuesta serializada
    results = []
    for car_item, product in car_items:
        item_data = car_item.serialize()
        item_data['product'] = product.serialize()
        results.append(item_data)
    
    response_body['results'] = results
    response_body['message'] = 'Method GET products in car by user'
    
    return jsonify(response_body), 200

# Endpoint Delete Products of user in car
@api.route('/shop_car/<int:user_id>', methods=['DELETE'])
def delete_user_car_items(user_id):
    car_items = Shop_car.query.filter_by(user_id=user_id).all()
    
    if not car_items:
        raise APIException('User does not have products in car', status_code=400)
    
    for item in car_items:
        db.session.delete(item)
    
    db.session.commit()
    
    response_body = {'msg': 'Products of user deleted'}
    return jsonify(response_body), 200