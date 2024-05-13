from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __table_name__='user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    nickname = db.Column(db.String(40),unique=False, nullable=False)
    name = db.Column(db.String(40),unique=False, nullable=False)
    lastname = db.Column(db.String(40),unique=False, nullable=False)
    rol = db.Column(db.String(40),unique=False, nullable=False)
    calendar = db.Column(db.DateTime,unique=False, nullable=True)
    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "nickname":self.nickname,
            "name":self.name,
            "lastname":self.lastname,
            "rol":self.rol,
            "calendar":self.calendar
        }
    
class Coach(db.Model):
    __table_name__='coach'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    nickname = db.Column(db.String(40),unique=False, nullable=False)
    name = db.Column(db.String(40),unique=False, nullable=False)
    lastname = db.Column(db.String(40),unique=False, nullable=False)
    description = db.Column(db.String(180), unique=False, nullable=False)
    image = db.Column(db.String(180), unique=False, nullable=True)
    speciality = db.Column(db.String(80), unique=False, nullable=False)
    calendar = db.Column(db.DateTime,unique=False, nullable=True)

    def __repr__(self):
        return f'<Coach {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "nickname":self.nickname,
            "name":self.name,
            "lastname":self.lastname,
            "description":self.description,
            "image":self.image,
            "speciality": self.speciality,
            "calendar":self.calendar
        }
    
class Shop (db.Model):
        __table_name__='shop'
        id = db.Column(db.Integer, primary_key=True)
        product = db.Column(db.String(120), unique=False, nullable=False)
        price = db.Column(db.Float, unique=False, nullable=False)
        vip_price = db.Column(db.Float,unique=False, nullable=True)
        image_product = db.Column(db.String(200),unique=False, nullable=False)
        description = db.Column(db.String(180), unique=False, nullable=False)
        type = db.Column(db.String(80), unique=False, nullable=True)
        stock = db.Column(db.Integer, unique=False, nullable=True)

        def __repr__(self):
            return f'<Coach {self.product}>'
        
        def serialize(self):
            return {
            "id": self.id,
            "product": self.product,
            "price":self.price,
            "vip_price":self.vip_price,
            "image_product":self.image_product,
            "description":self.description,
            "type": self.type,
            "stock":self.stock
        }

class Club (db.Model):
    __table_name__='club'
    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String(60), unique=False, nullable=False)
    gym = db.Column(db.String(60), unique=False, nullable=False)
    address = db.Column(db.String(180),unique=False, nullable=True)
    phone = db.Column(db.String(60),unique=False, nullable=False)
    email = db.Column(db.String(60), unique=False, nullable=False)
    url = db.Column(db.String(60), unique=False, nullable=True)
    

    def __repr__(self):
        return f'<Name {self.gym}>'
        
    def serialize(self):
        return {
        "id": self.id,
        "city": self.city,
        "gym":self.gym,
        "address":self.address,
        "phone":self.phone,
        "email":self.email,
        "url":self.url,
        }