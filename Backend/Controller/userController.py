from flask import Flask, request, jsonify,session
from werkzeug.security import check_password_hash , generate_password_hash
from flask_login import LoginManager, UserMixin, login_user, logout_user,login_required, current_user
from config import app, db
from models import User



@app.route("/get_current_user", methods=["GET"])
def get_current_user():
    user = User.query.filter_by(is_authenticated=1).first()
    return jsonify({
        "message": "Logged in successfully",
        "user": {
            "id": user.id,
            "email": user.email,
            "role": user.role.value,
            "access": user.access,
            "loan_amount": user.loan_amount,
            "is_verified":user.is_verified
        }
    })

@app.route("/logout/<int:user_id>", methods=["POST"])
def logout(user_id):
    user = User.query.get(user_id)
    if user:
        user.is_authenticated = False  # Définissez is_authenticated sur False
        db.session.commit()  # Enregistrez les modifications dans la base de données
        logout_user()  # Déconnectez l'utilisateur de la session
        return jsonify({"message": "Logged out successfully"}), 200
    else:
        return jsonify({"message": "User not found"}), 404

@app.route("/create_user", methods=["POST"])
def create_user():
    email = request.json.get("email")
    password = request.json.get("password")
    role = request.json.get("role")
    access = request.json.get("access")

    if not email or not password or not role:
        return (
            jsonify({"message": "You must include an email, password, and role"}),
            400,
        )

    hashed_password = generate_password_hash(password)
    new_user = User(email=email, password=hashed_password, role=role, access = access, loan_amount = None)
    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "User created!"}), 201
@app.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    json_users = [{"id": user.id, "email": user.email, "role": user.role.value , "access" : user.access , "loan_amount" : user.loan_amount} for user in users]
    return jsonify({"users": json_users})

@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    user_email = data.get('email')
    user_password = data.get('password')

    user = User.query.filter_by(email=user_email).first()
    user.is_authenticated = 1
    db.session.add(user)
    db.session.commit()
    if not user or not check_password_hash(user.password, user_password):
        return jsonify({"message": "Invalid email or password"}), 401

    login_user(user, remember=True)

    return jsonify({
        "message": "Logged in successfully",
        "user": {
            "id": user.id,
            "email": user.email,
            "role": user.role.value,
            "access": user.access,
            "loan_amount": user.loan_amount,
            "is_verified":user.is_verified
        }
    })

@app.route("/change_password/<int:user_id>", methods=["POST"])
def change_password(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404
    data = request.get_json()
    new_password = data.get('new_password')
    confirm_password = data.get('confirm_password')

    # Check if the new passwords match
    if new_password != confirm_password:
        return jsonify({"message": "Passwords do not match"}), 400

    # Update the user's password
    user.password = generate_password_hash(new_password)
    user.is_verified=1
    db.session.commit()

    return jsonify({"message": "Password updated successfully"})

@app.route("/update_user/<int:user_id>", methods=["PATCH"])
def update_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404

    data = request.json
    user.email = data.get("email", user.email)
    user.password = data.get("password", user.password)
    user.role = data.get("role", user.role)
    user.access = data.get("access" , user.access)

    db.session.commit()

    return jsonify({"message": "User updated."}), 200


@app.route("/change_loan_amount/<int:user_id>/loan_amount", methods=["PATCH"])
def update_loan_amount_user(user_id):
    user = User.query.get(user_id)
    loan_amount = request.args.get('loan_amount')

    if not user:
        return jsonify({"message": "User not found"}), 404
    
    user.loan_amount = loan_amount

    db.session.commit()

    return jsonify({"message": "User updated."}), 200


@app.route("/delete_user/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "User deleted!"}), 200