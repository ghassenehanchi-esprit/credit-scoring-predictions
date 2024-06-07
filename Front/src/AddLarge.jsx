import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './form.css'; // Make sure this path is correct
import { Navbar, SideBarAdmin } from './components'; // Assuming Navbar is correctly imported
import React, { useState, useEffect } from 'react';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  Actifs_courants: Yup.number().required('Actifs courants is required'),
  Disponibilites: Yup.number().required('Disponibilites is required'),
  Stocks: Yup.number().required('Stocks is required'),
  Actifs_a_long_terme: Yup.number().required('Actifs à long terme is required'),
  Passifs_courants: Yup.number().required('Passifs courants is required'),
  Valeur_nette: Yup.number().required('Valeur nette is required'),
  Benefice_net: Yup.number().required('Benefice net is required'),
  Actifs_fixes: Yup.number().required('Actifs fixes is required'),
  Ratio_de_liquidite: Yup.number().required('Ratio de liquidite is required'),
  Ratio_de_benefice_exploitation: Yup.number().required('Ratio de bénéfice exploitation is required'),
  Stockholders_equity_to_fixed_assets_ratio: Yup.number().required('Stockholders equity to fixed assets ratio is required'),
  Current_debt_ratio: Yup.number().required('Current debt ratio is required'),
});

const AddLarge = ({ user_id }) => {
    const [csrfToken, setCsrfToken] = useState('');
    useEffect(() => {
        // Fetch the CSRF token from the backend when the component mounts
        fetch('http://127.0.0.1:5000/csrf_token')
        .then(response => response.json())
        .then(data => {
            setCsrfToken(data.csrf_token);
        })
        .catch(error => console.error('Error fetching CSRF token:', error));
    }, []);

    const onSubmit = async (values, { setSubmitting }) => {
        try {
          const response = await fetch('http://127.0.0.1:5000/create_large_medium_enterprise_with_user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'X-CSRFToken': csrfToken,
            },
            body: JSON.stringify(values),
            credentials: 'include',
          });
      
          if (response.ok) {
            const data = await response.json();
            alert('Large/Medium Entreprise record created!');
          } else {
            const errorData = await response.json();
            console.error('Error data:', errorData);
            alert(`Failed to create Large/Medium Entreprise record. Error: ${errorData.message}`);
          }
        } catch (error) {
          console.error('There was an error creating the Large/Medium Entreprise record:', error);
          alert('Failed to create Large/Medium Entreprise record.');
        }
        setSubmitting(false);
      };

  return (
    <div className="bg-primary w-full overflow-hidden">
      <Navbar />
      <SideBarAdmin/>
      <div className="card" style={{marginTop:"100px"}}>
        <h1>Add Large/Medium Entreprise</h1>
        <Formik
          initialValues={{
            email: "",
            userId: user_id,
            Actifs_courants: "",
            Disponibilites: "",
            Stocks: "",
            Actifs_a_long_terme: "",
            Passifs_courants: "",
            Valeur_nette: "",
            Benefice_net: "",
            Actifs_fixes: "",
            Ratio_de_liquidite: "",
            Ratio_de_benefice_exploitation: "",
            Stockholders_equity_to_fixed_assets_ratio: "",
            Current_debt_ratio: "",
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="form">
              <Field name="email" placeholder="Email" />
              <ErrorMessage name="email" component="span" className="errorMessage" />
              <Field type="number" placeholder="Actifs courants" name="Actifs_courants" />
              <ErrorMessage name="Actifs_courants" component="span" className="errorMessage" />
              <Field type="number" placeholder="Disponibilites" name="Disponibilites" />
              <ErrorMessage name="Disponibilites" component="span" className="errorMessage" />
              <Field type="number" placeholder="Stocks" name="Stocks" />
              <ErrorMessage name="Stocks" component="span" className="errorMessage" />
              <Field type="number" placeholder="Actifs à long terme" name="Actifs_a_long_terme" />
              <ErrorMessage name="Actifs_a_long_terme" component="span" className="errorMessage" />
              <Field type="number" placeholder="Passifs courants" name="Passifs_courants" />
              <ErrorMessage name="Passifs_courants" component="span" className="errorMessage" />
              <Field type="number" placeholder="Valeur nette" name="Valeur_nette" />
              <ErrorMessage name="Valeur_nette" component="span" className="errorMessage" />
              <Field type="number" placeholder="Benefice net" name="Benefice_net" />
              <ErrorMessage name="Benefice_net" component="span" className="errorMessage" />
              <Field type="number" placeholder="Actifs fixes" name="Actifs_fixes" />
              <ErrorMessage name="Actifs_fixes" component="span" className="errorMessage" />
              <Field type="number" placeholder="Ratio de liquidite" name="Ratio_de_liquidite" />
              <ErrorMessage name="Ratio_de_liquidite" component="span" className="errorMessage" />
              <Field type="number" placeholder="Ratio de bénéfice exploitation" name="Ratio_de_benefice_exploitation" />
              <ErrorMessage name="Ratio_de_benefice_exploitation" component="span" className="errorMessage" />
              <Field type="number" placeholder="Stockholders equity to fixed assets ratio" name="Stockholders_equity_to_fixed_assets_ratio" />
              <ErrorMessage name="Stockholders_equity_to_fixed_assets_ratio" component="span" className="errorMessage" />
              <Field type="number" placeholder="Current debt ratio" name="Current_debt_ratio" />
              <ErrorMessage name="Current_debt_ratio" component="span" className="errorMessage" />
              <button type="submit" disabled={isSubmitting}>
                Create Large/Meduim Entreprise
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddLarge;
