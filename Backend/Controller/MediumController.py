from flask import request, jsonify
from config import app, db
from models import User, LargeMediumEntreprises

@app.route("/create_large_medium_entreprise", methods=["POST"])
def create_large_medium_entreprise():
    email = request.json.get("email")
    actifs_courants = request.json.get("actifsCourants")
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

    # Check for missing fields
    # ...
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"message": "User not found"}), 404
    
    new_entreprise = LargeMediumEntreprises(
        email=email,
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

    

 

    try:
        db.session.add(new_entreprise)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
    return jsonify({"message": "LargeMediumEntreprise record created!"}), 201

@app.route("/large_medium_entreprises", methods=["GET"])
def get_large_medium_entreprises():
    entreprises = LargeMediumEntreprises.query.all()
    json_entreprises = [
        {
            "id": entreprise.id,
            "email": entreprise.email,
            # Add other fields here
        }
        for entreprise in entreprises
    ]
    return jsonify({"large_medium_entreprises": json_entreprises})

@app.route("/large_medium_entreprise/<int:entreprise_id>", methods=["GET"])
def get_large_medium_entreprise(entreprise_id):
    entreprise = LargeMediumEntreprises.query.get(entreprise_id)

    if not entreprise:
        return jsonify({"message": "LargeMediumEntreprise record not found"}), 404

    json_entreprise = {
        "id": entreprise.id,
        "email": entreprise.email,
        # Add other fields here
    }

    return jsonify({"large_medium_entreprise": json_entreprise})

@app.route("/update_large_medium_entreprise/<int:entreprise_id>", methods=["PUT"])
def update_large_medium_entreprise(entreprise_id):
    entreprise = LargeMediumEntreprises.query.get(entreprise_id)

    if not entreprise:
        return jsonify({"message": "LargeMediumEntreprise record not found"}), 404

    data = request.json
    entreprise.Actifs_courants = data.get("actifsCourants", entreprise.Actifs_courants)
    # Update other fields here

    db.session.commit()

    return jsonify({"message": "LargeMediumEntreprise record updated."}), 200

@app.route("/delete_large_medium_entreprise/<int:entreprise_id>", methods=["DELETE"])
def delete_large_medium_entreprise(entreprise_id):
    entreprise = LargeMediumEntreprises.query.get(entreprise_id)

    if not entreprise:
        return jsonify({"message": "LargeMediumEntreprise record not found"}), 404

    db.session.delete(entreprise)
    db.session.commit()

    return jsonify({"message": "LargeMediumEntreprise record deleted!"}), 200
@app.route('/update_large_medium_enterprise_loan_amount/<int:user_id>', methods=['POST'])
def update_large_medium_enterprise_loan_amount(user_id):
    data = request.get_json()
    loan_amount = data.get('loan_amount')

    # Find the large or medium enterprise related to the user
    large_medium_enterprise = LargeMediumEntreprises.query.filter_by(user_id=user_id).first()

    if not large_medium_enterprise:
        return jsonify({'message': 'Large or Medium Enterprise not found'}), 404

    # Update the large or medium enterprise's loan amount
    large_medium_enterprise.Passifs_courants = loan_amount
    db.session.commit()

    return jsonify({'message': 'Large or Medium Enterprise loan amount updated successfully'})