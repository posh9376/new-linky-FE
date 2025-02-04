from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import os
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from sqlalchemy_serializer import SerializerMixin
import bcrypt
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity, create_access_token
from datetime import datetime



load_dotenv()

app = Flask(__name__)
CORS(**{'origins': ['http://localhost:5000']})

DB_CONFIG = {
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASS'),
    'host': os.getenv('DB_HOST'),
    'port': os.getenv('DB_PORT'),
    'database': os.getenv('DB_NAME'),
}

app.config['SQLALCHEMY_DATABASE_URI']=f"postgresql://{DB_CONFIG['user']}:{DB_CONFIG['password']}@{DB_CONFIG['host']}:{DB_CONFIG['port']}/{DB_CONFIG['database']}"
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["JWT_SECRET_KEY"] =os.getenv("JWT_SECRET_KEY")

db = SQLAlchemy(app)# initialize db
migrate = Migrate(app, db) # initialize migration
bcrypt = bcrypt(app)
jwt = JWTManager(app)


# user model definition
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)
    orders = db.relationship("Order", back_populates="user")

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode("utf-8")

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)
    
    def __repr__(self):
        return f"<User {self.username} {self.email}>"


# product model definition
class Product(db.Model, SerializerMixin):
    __tablename__ = 'products'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    description = db.Column(db.Text, nullable=False)
    image = db.Column(db.String(120), nullable=False)
    price = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(120), nullable=False)
    orders = db.relationship("Order", back_populates="product")# relationship to orders

    def __repr__(self):
        return f"<Product {self.name} {self.description} {self.image} {self.price} {self.category}>"

# order model definition
class Order(db.Model, SerializerMixin):
    __tablename__ = 'orders'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    status = db.Column(db.String(120), nullable=False)
    created_at = db.Column(db.DateTime, )
    user = db.relationship("User", back_populates="orders")
    product = db.relationship("Product", back_populates="orders")

    def __repr__(self):
        return f"<Order {self.user_id} {self.product_id} {self.quantity}>"

# cart model definition
class Cart(db.Model, SerializerMixin):
    __tablename__ = 'cart'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    user = db.relationship("User", back_populates="carts")
    product = db.relationship("Product", back_populates="carts")

    def __repr__(self):
        return f"<Cart {self.user_id} {self.product_id} {self.quantity}>"

@app.route('/')
def index():
    return "Hello, World!"

#
@app.route('/signup', methods=['POST'])# create a new user
def signup():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')

    new_user = User(username=name, email=email, password=password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': 'User created successfully'}), 201

@app.route('/login', methods=['POST'])#login credentials
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if user and user.password == password:
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'message': 'Invalid email or password'}), 401

@app.route('/products', methods=['GET', 'POST'])#get all the products
@jwt_required()
def get_products():
    if request.method == 'POST':
        data = request.get_json()
        name = data.get('name')
        description = data.get('description')
        image = data.get('image')
        price = data.get('price')
        category = data.get('category')

        new_product = Product(name=name, description=description, image=image, price=price, category=category)
        db.session.add(new_product)
        db.session.commit()
        return jsonify({'message': 'Product created successfully'}), 201
    
    products = Product.query.all()
    return jsonify({'products': [product.to_dict() for product in products]}), 200

@app.route('/orders', methods=['GET'])#get all the orders
@jwt_required()
def get_orders():
    orders = Order.query.all()
    return jsonify({'orders': [order.to_dict() for order in orders]}), 200 

@app.route('/orders', methods=['POST']) #create a new order
@jwt_required()
def create_order():
    data = request.get_json()
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    product = Product.query.get(data["product_id"])
    quantity = data.get('quantity')

    new_order =Order(user=user, product=product, quantity=quantity, status="pending")
    db.session.add(new_order)
    db.session.commit()

    return jsonify({'message': 'Order created successfully'}), 201

@app('/cart', methods=['POST'])#create a new cart item
@jwt_required()
def add_to_cart():
    try:
        data = request.get_json()
        if not data or "product_id" not in data or "quantity" not in data:
            return jsonify({'message': 'Invalid request data'}), 400
        
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if not user:
            return jsonify({'message': 'User not found'}), 404
        product = Product.query.get(data["product_id"])
        if not product:
            return jsonify({'message': 'Product not found'}), 404
        quantity = data.get('quantity')
        if quantity <= 0 or not isinstance(quantity, int):
            return jsonify({'message': 'Invalid quantity'}), 400

        cart_item = Cart.query.filter_by(user_id=user_id, product_id=data["product_id"]).first()
        if cart_item:
            cart_item.quantity += quantity
            db.session.commit()
            return jsonify({'message': 'Product quantity updated in cart successfully'}), 200

        # Create a new cart item
        new_cart = Cart(user=user, product=product, quantity=quantity)
        db.session.add(new_cart)
        db.session.commit()
        return jsonify({'message': 'Product added to cart successfully'}), 201
    except Exception as e:
        return jsonify({'message': f'Error adding product to cart: {str(e)}'}), 500

@app.route('/cart/<int:cart_item_id>', methods=['DELETE'])#delete specific items in cart
@jwt_required()
def remove_from_cart(cart_item_id):
    try:
        cart_item = Cart.query.get_or_404(cart_item_id)
        db.session.delete(cart_item)
        db.session.commit()
        return jsonify({'message': 'Product removed from cart successfully'}), 200
    except Exception as e:
        return jsonify({'message': f'Error removing product from cart: {str(e)}'}), 500
    
@app.route('/cart', methods=['DELETE'])#delete all the items in cart
@jwt_required()
def clear_cart():
    try:
        user_id = get_jwt_identity()
        user = User.query.get(user_id)
        if not user:
            return jsonify({'message': 'User not found'}), 404
        Cart.query.filter_by(user_id=user_id).delete()
        db.session.commit()
        return jsonify({'message': 'Cart cleared successfully'}), 200
    except Exception as e:
        return jsonify({'message': f'Error clearing cart: {str(e)}'}), 500


if __name__ == '__main__':
    app.run(debug=True)