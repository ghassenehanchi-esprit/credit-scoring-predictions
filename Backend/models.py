from enum import Enum
from config import db
from flask_login import LoginManager, UserMixin


class Role(Enum):
    Individual = "Individual"
    Small = "Small"
    Medium = "Medium"
    Large = "Large"

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)  # Specify a length for VARCHAR
    role = db.Column(db.Enum(Role), nullable=False)
    access = db.Column(db.String(40), nullable=False)
    loan_amount = db.Column(db.Integer)
    is_authenticated = db.Column(db.Boolean, default=False)
    is_verified = db.Column(db.Boolean, default=False)


    def is_active(self):
        """True, as all users are active."""
        return True

    def get_id(self):
        return (self.id)

    def is_anonymous(self):
        """False, as anonymous users aren't supported."""
        return False    

class SmallEntreprise(db.Model):
    id_ME = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_User = db.Column(db.Integer, db.ForeignKey('user.id'))
    entrepriseName = db.Column(db.String(255), nullable=False)
    term = db.Column(db.Integer, nullable=False)
    no_emp = db.Column(db.Integer, nullable=False)
    new_exist = db.Column(db.Integer, nullable=False)  # boolean
    retained_job = db.Column(db.Integer, nullable=False)
    rev_line_cr = db.Column(db.String(1), nullable=False)  # Y/N
    low_doc = db.Column(db.String(1), nullable=False)  # Y/N
    gr_appv = db.Column(db.Float, nullable=False)
    sba_appv = db.Column(db.Float, nullable=False)
    naics_0 = db.Column(db.Boolean, nullable=False)
    naics_31_33 = db.Column(db.Boolean, nullable=False)
    naics_62 = db.Column(db.Boolean, nullable=False)

    user = db.relationship('User', backref=db.backref('small_enterprises', lazy=True))

    def __repr__(self):
        return f"<SmallEntreprise {self.id_ME}>"
class LargeMediumEntreprises(db.Model):
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    Actifs_courants = db.Column(db.Float, nullable=False)
    Disponibilites = db.Column(db.Float, nullable=False)
    Stocks = db.Column(db.Float, nullable=False)
    Actifs_a_long_terme = db.Column(db.Float, nullable=False)
    Passifs_courants = db.Column(db.Float, nullable=False)
    Valeur_nette = db.Column(db.Float, nullable=False)
    Benefice_net = db.Column(db.Float, nullable=False)
    Actifs_fixes = db.Column(db.Float, nullable=False)
    Ratio_de_liquidite = db.Column(db.Float, nullable=False)
    Ratio_de_benefice_exploitation = db.Column(db.Float, nullable=False)
    Stockholders_equity_to_fixed_assets_ratio = db.Column(db.Float, nullable=False)
    Current_debt_ratio = db.Column(db.Float, nullable=False)
    
    user = db.relationship('User', backref=db.backref('large_medium_enterprises', lazy=True))
    
    def __repr__(self):
        return f"<LargeMediumEnterprises {self.id_ME}>"
    
class Individual(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    emp_title = db.Column(db.Float, nullable=False)
    term = db.Column(db.Float, nullable=False)
    loan_amnt = db.Column(db.Float, nullable=False)
    purpose = db.Column(db.Float, nullable=False)
    home_ownership = db.Column(db.Float, nullable=False)
    dti = db.Column(db.Float, nullable=False)
    grade = db.Column(db.Float, nullable=False)
    annual_inc = db.Column(db.Float, nullable=False)
    int_rate = db.Column(db.Float, nullable=False)

    user = db.relationship('User', backref=db.backref('individual', lazy=True))

    def __repr__(self):
        return f"<Individual {self.id_ME}>"
class Deposit(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    loan_amount = db.Column(db.Float, nullable=False)
    decision = db.Column(db.Boolean, nullable=True)  # Changed to Boolean
    score = db.Column(db.Integer, nullable=True)

    user = db.relationship('User', backref=db.backref('deposits', lazy=True))

    def __repr__(self):
        return f"<Deposit {self.id}>"

    
