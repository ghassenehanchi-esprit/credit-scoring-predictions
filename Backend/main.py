import os
from flask import request, jsonify, session
from flask_login import LoginManager, UserMixin
from config import app, db
from Controller.smallEtreprisesController import *
from Controller.userController import *
from Controller.scoreController import *
from Controller.chatbotController import *
from Controller.IndividualController import *
from Controller.IndividualScoreController import *
from Controller.DepositController import *

from Controller.recommendationController import *
from Controller.NlpController import *
from Controller.ScoringController import *
from flask_session import Session
from flask_cors import CORS
from flask_mail import Mail, Message
from werkzeug.security import generate_password_hash
import secrets

login_manager = LoginManager()
login_manager.init_app(app)
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "http://localhost:5173"}})

@login_manager.user_loader
def load_user(user_id):
    try:
        return User.query.get(user_id)
    except:
        return None

app.config.update(
    SECRET_KEY=os.urandom(24),
    SESSION_TYPE="filesystem",
    PERMANENT_SESSION_LIFETIME=1800
)

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USERNAME'] = 'alikhemakhem01@gmail.com'  # Use your Gmail address
app.config['MAIL_PASSWORD'] = 'ygmqyzqiztjzjicn'    # Use the generated app password
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False

mail = Mail(app)


@app.route("/create_individual_with_user", methods=["POST"])
def create_individual_with_user():
    email = request.json.get("email")
    role = "Individual"
    access = "Client"
    emp_title = request.json.get("empTitle")
    term = request.json.get("term")
    loan_amnt = request.json.get("loanAmnt")
    purpose = request.json.get("purpose")
    home_ownership = request.json.get("homeOwnership")
    dti = request.json.get("dti")
    grade = request.json.get("grade")
    annual_inc = request.json.get("annualInc")
    int_rate = request.json.get("intRate")

 

    if not email or not role:
        return jsonify({"message": "You must include an email and role"}), 400

    # Generate a random password
    random_password = secrets.token_urlsafe(16)

    # Hash the password
    hashed_password = generate_password_hash(random_password)

    # Create a new user
    new_user = User(email=email, password=hashed_password, role=role, access=access)
    # Create a new individual with other fields...
   

    try:
        db.session.add(new_user)
      
       
        # Add the individual to the session...
        db.session.commit()
        new_individual = Individual(
        user_id=new_user.id,
        emp_title=emp_title,
        term=term,
        loan_amnt=loan_amnt,
        purpose=purpose,
        home_ownership=home_ownership,
        dti=dti,
        grade=grade,
        annual_inc=annual_inc,
        int_rate=int_rate
        )
        db.session.add(new_individual)
        db.session.commit()
        # Send an email with the generated password
        msg = Message(
            'Welcome to Our App!',
            sender='alikhemakhem01@gmail.com',
            recipients=[email]
        )
        msg.body = f"Your account has been created. Your password is: {random_password}"
        mail.send(msg)

    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "Individual and user created!"}), 201




@app.route("/create_large_medium_enterprise_with_user", methods=["POST"])
def create_large_medium_enterprise_with_user():
    # Extract the data from the request
    email = request.json.get("email")
    role = "LargeMedium"
    access = "Client"
    # Add other fields specific to LargeMediumEnterprises
    actifs_courants = request.json.get("Actifs_courants")
    disponibilites = request.json.get("disponibilites")
    stocks = request.json.get("stocks")
    actifs_a_long_terme = request.json.get("actifsALongTerme")
    passifs_courants = request.json.get("passifsCourants")
    valeur_nette = request.json.get("valeurNette")
    benefice_net = request.json.get("beneficeNet")
    actifs_fixes = request.json.get("actifsFixes")
    ratio_de_liquidite = request.json.get("ratioDeLiquidite")
    ratio_de_benefice_exploitation = request.json.get("ratioDeBeneficeExploitation")
    stockholders_equity_to_fixed_assets_ratio = request.json.get("stockholdersEquityToFixedAssetsRatio")
    current_debt_ratio = request.json.get("currentDebtRatio")

    if not email or not role:
        return jsonify({"message": "You must include an email and role"}), 400

    # Generate a random password and hash it
    random_password = secrets.token_urlsafe(16)
    hashed_password = generate_password_hash(random_password)

    # Create a new user
    new_user = User(email=email, password=hashed_password, role=role, access=access)

    try:
        db.session.add(new_user)
        db.session.commit()

        # Create a new LargeMediumEnterprises instance with the extracted fields
        new_large_medium_enterprise = LargeMediumEntreprises(
            user_id=new_user.id,
            Actifs_courants=actifs_courants,
            Disponibilites=disponibilites,
            Stocks=stocks,
            Actifs_a_long_terme=actifs_a_long_terme,
            Passifs_courants=passifs_courants,
            Valeur_nette=valeur_nette,
            Benefice_net=benefice_net,
            Actifs_fixes=actifs_fixes,
            Ratio_de_liquidite=ratio_de_liquidite,
            Ratio_de_benefice_exploitation=ratio_de_benefice_exploitation,
            Stockholders_equity_to_fixed_assets_ratio=stockholders_equity_to_fixed_assets_ratio,
            Current_debt_ratio=current_debt_ratio
        )
        db.session.add(new_large_medium_enterprise)
        db.session.commit()

        # Send an email with the generated password
        msg = Message(
            'Welcome to Our Enterprise Platform!',
            sender='alikhemakhem01@gmail.com',
            recipients=[email]
        )
        msg.body = f"Your enterprise account has been created. Your password is: {random_password}"
        mail.send(msg)

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "Large medium enterprise and user created!"}), 201

@app.route("/create_small_enterprise_with_user", methods=["POST"])
def create_small_enterprise_with_user():
    # Extract the data from the request
    email = request.json.get("email")
    role = "Small"
    access = "Client"
    # Add other fields specific to SmallEntreprise
    entreprise_name = request.json.get("entrepriseName"),
    term = request.json.get("term"),
    no_emp = request.json.get("noEmp"),
    new_exist = request.json.get("newExist"),
    retained_job = request.json.get("retainedJob"),
    rev_line_cr = request.json.get("revLineCr"),
    low_doc = request.json.get("lowDoc"),
    gr_appv = request.json.get("grAppv"),
    sba_appv = request.json.get("sbaAppv"),
    naics_0 = request.json.get("naics0"),
    naics_31_33 = request.json.get("naics31-33"),
    naics_62 = request.json.get("naics62")

    if not email or not role:
        return jsonify({"message": "You must include an email and role"}), 400

    # Generate a random password and hash it
    random_password = secrets.token_urlsafe(16)
    hashed_password = generate_password_hash(random_password)

    # Create a new user
    new_user = User(email=email, password=hashed_password, role=role, access=access)

    try:
        db.session.add(new_user)
        db.session.commit()

        # Create a new SmallEntreprise instance with the extracted fields
        new_small_enterprise = SmallEntreprise(
            id_User=new_user.id,
            entrepriseName=entreprise_name,
            term=term,
            no_emp=no_emp,
            new_exist=new_exist,
            retained_job=retained_job,
            rev_line_cr=rev_line_cr,
            low_doc=low_doc,
            gr_appv=gr_appv,
            sba_appv=sba_appv,
            naics_0=naics_0,
            naics_31_33=naics_31_33,
            naics_62=naics_62
            
        )
        db.session.add(new_small_enterprise)
        db.session.commit()

        # Send an email with the generated password
        msg = Message(
            'Welcome to Our Small Business Platform!',
            sender='alikhemakhem01@gmail.com',
            recipients=[email]
        )
        msg.body = f"Your small enterprise account has been created. Your password is: {random_password}"
        mail.send(msg)

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "Small enterprise and user created!"}), 201


if __name__ == '__main__':
    app.run(debug=True)


Session(app)

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)
