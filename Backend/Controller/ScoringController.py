from flask import request, jsonify
import joblib
import numpy as np
from config import app

from models import LargeMediumEntreprises  

# Load the logistic regression model
scoring_model = joblib.load('logistic_model_selected_features.pkl')

# Define the feature names
feature_names = [
    'Actifs_courants',
    'Disponibilites',
    'Stocks',
    'Actifs_a_long_terme',
    'Passifs_courants',
    'Valeur_nette',
    'Benefice_net',
    'Actifs_fixes',
    'Ratio_de_liquidite',
    'Ratio_de_benefice_exploitation',
    'Stockholders_equity_to_fixed_assets_ratio',
    'Current_debt_ratio'
]



@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        email = data.get('email')
        user = LargeMediumEntreprises.query.filter_by(email=email).first()
        print(user)
        if user:
            # Extract features from the user
            features = [
                user.Actifs_courants,
                user.Disponibilites,
                user.Stocks,
                user.Actifs_a_long_terme,
                user.Passifs_courants,
                user.Valeur_nette,
                user.Benefice_net,
                user.Actifs_fixes,
                user.Ratio_de_liquidite,
                user.Ratio_de_benefice_exploitation,
                user.Stockholders_equity_to_fixed_assets_ratio,
                user.Current_debt_ratio
            ]

            # Ensure features are in numpy array format
            features = np.array(features).reshape(1, -1)  # Reshape to 2D array

            # Calculate probability of default using sigmoid function
            probability_of_default = scoring_model.predict_proba(features)[0][1]

            # Classify risk level based on probability
            score = round(300 + (850-300)*(probability_of_default))

            # Return response
            return jsonify({'score': score}), 200
        else:
            return jsonify({'error': 'User not found'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 400
