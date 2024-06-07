from flask import request, jsonify
from models import Deposit,Individual,User,SmallEntreprise,Role,LargeMediumEntreprises
from config import app, db
import joblib
import numpy as np




model_indiv = joblib.load('individual_model.joblib')
model_small = joblib.load('SmallEntrepriseModel.joblib')
scoring_model=joblib.load('logistic_model_selected_features.pkl')
@app.route('/predict_loan/<int:user_id>', methods=['GET'])
def predict_loan(user_id):
    # Retrieve the user and check their role
    user = User.query.get(user_id)
    print(user.role)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    if user.role == Role.Individual:
        individual = Individual.query.filter_by(user_id=user_id).first()
        if not individual:
            return jsonify({'message': 'Individual not found'}), 404

        # Prepare the data for prediction
        features = [
            individual.emp_title,
            individual.term,
            individual.loan_amnt,
            individual.purpose,
            individual.home_ownership,
            individual.dti,
            individual.grade,
            individual.annual_inc,
            individual.int_rate
        ]

        # Predict the decision (0 or 1)
        prediction = model_indiv.predict([features])[0]

    elif user.role == Role.Small:
        small_entreprise = SmallEntreprise.query.filter_by(id_User=user_id).first()
        if not small_entreprise:
            return jsonify({'message': 'Small enterprise not found'}), 404

        # Prepare the data for prediction
        features = [
            small_entreprise.entrepriseName,
            small_entreprise.term,
            small_entreprise.no_emp,
            small_entreprise.new_exist,
            small_entreprise.retained_job,
            small_entreprise.rev_line_cr,
            small_entreprise.low_doc,
            small_entreprise.gr_appv,
            small_entreprise.sba_appv,
            small_entreprise.naics_0,
            small_entreprise.naics_31_33,
            small_entreprise.naics_62
        ]

        # Predict the decision (0 or 1)
        prediction = model_small.predict([features])[0]
    elif user.role == Role.Large:
        large = LargeMediumEntreprises.query.filter_by(user_id=user_id).first()
        if not large:
            return jsonify({'message': 'Large Enterprise not found'}), 404
        features = [
            large.Actifs_courants,
            large.Disponibilites,
            large.Stocks,
            large.Actifs_a_long_terme,
            large.Passifs_courants,
            large.Valeur_nette,
            large.Benefice_net,
            large.Actifs_fixes,
            large.Ratio_de_liquidite,
            large.Ratio_de_benefice_exploitation,
            large.Stockholders_equity_to_fixed_assets_ratio,
            large.Current_debt_ratio
        ]
        # Ensure features are in numpy array format
        features = np.array(features).reshape(1, -1)  # Reshape to 2D array

            # Calculate probability of default using sigmoid function
        prediction = scoring_model.predict(features)[0][1]
    else:
        return jsonify({'message': 'User role not supported for prediction'}), 400

    # Return the prediction result
    return jsonify({'decision': int(prediction)})


@app.route('/create_deposit', methods=['POST'])
def create_deposit():
    data = request.get_json()
    user_id = data.get('user_id')
    loan_amount = data.get('loan_amount')
    decision = data.get('decision')
    score = data.get('score')

    # Validate the input
    if not user_id or not loan_amount:
        return jsonify({'message': 'Missing required fields'}), 400

    # Create a new Deposit instance
    new_deposit = Deposit(
        user_id=user_id,
        loan_amount=loan_amount,
        decision=decision,
        score=score
    )

    # Add to the session and commit to the database
    try:
        db.session.add(new_deposit)
        db.session.commit()
        return jsonify({'message': 'New deposit created', 'deposit_id': new_deposit.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': str(e)}), 500
    
@app.route('/rejection_cause/<int:user_id>', methods=['GET'])
def rejection_cause(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'User not found'}), 404

    if user.role == Role.Individual:
        individual = Individual.query.filter_by(user_id=user_id).first()
        if not individual:
            return jsonify({'message': 'Individual not found'}), 404

        features = [
            individual.emp_title,
            individual.term,
            individual.loan_amnt,
            individual.purpose,
            individual.home_ownership,
            individual.dti,
            individual.grade,
            individual.annual_inc,
            individual.int_rate
        ]
        feature_names = [
            'emp_title',
            'term',
            'loan_amnt',
            'purpose',
            'home_ownership',
            'dti',
            'grade',
            'annual_inc',
            'int_rate'
        ]
        prediction = model_indiv.predict([features])[0]

        # Check if the loan was rejected
        if prediction == 0:
            coefficients = model_indiv.coef_[0]
            # Find the index of the feature with the largest absolute coefficient value
            most_influential_feature_index = abs(coefficients).argmax()
            rejection_cause = feature_names[most_influential_feature_index]
            return jsonify({'rejection_cause': rejection_cause})

    # Repeat similar blocks for Role.Small and Role.Large with their respective models and features

    return jsonify({'message': 'Loan was approved or user role not supported for this operation'})
    
