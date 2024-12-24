from flask import Blueprint, render_template, request, jsonify
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from flask_jwt_extended import create_access_token
from models import Meme, User, db

#degine the main bludprint for general app functionality
main = Blueprint('main', __name__)

#define the auth blueprint for authentication related routes
auth_bp = Blueprint('auth', __name__)
login_manager = LoginManager()

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@main.route('/')
def home():
    latest_memes = Meme.query.order_by(Meme.id.desc()).limit(5).all()
    popular_memes = Meme.query.order_by(Meme.id.desc()).limit(5).all()  # Replace with actual popularity logic
    return render_template('home.html', latest=latest_memes, popular=popular_memes)

@main.route('/api/generate', methods=['POST'])
def generate():
    data = request.get_json()
    text_input = data.get('text_input')
    # Logic to generate meme using AI model (not implemented here)
    
    # Example response after meme generation (replace with actual logic)
    return jsonify({"message": "Meme generated!", "text": text_input})

@main.route('/api/all_memes', methods=['GET'])
def all_memes():
    memes = Meme.query.all()
    return jsonify([{"owner_name": meme.owner_name, "image_url": meme.image_url, "caption": meme.caption} for meme in memes])

# @main.route('/pricing')
# def pricing():
#     return render_template('pricing.html')

# @main.route('/about')
# def about():
#     return render_template('about.html')

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data['email']
    password = data['password']

    #check if user already exists
    if User.query.filter_by(email=email).first():
        return jsonify({"message" : "User already exists!"}), 400
    
    #create a new user
    new_user = User(email=email)
    new_user.set_password(password) #assume set_password hashes the password
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registed successfully!"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']

    user = User.query.filter_by(email=email).first()

    if user and user.check_password(password):
        if not user.is_active:
            return jsonify({"message": "Account is inactive."}), 403
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token), 200
    return jsonify({"message": "Invalid credentials"}), 401

@auth_bp.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({"message": "Logged out successfully!"}), 200

@auth_bp.route('/protected', methods=['GET'])
@login_required
def protected():
    return jsonify({"message": f"Hello {current_user.email}!"}), 200
