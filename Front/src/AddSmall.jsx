import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './form.css'; // Make sure this path is correct
import { Navbar, SideBarAdmin } from './components'; // Assuming Navbar is correctly imported
import React, { useState, useEffect } from 'react';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  entrepriseName: Yup.string().required('Entreprise Name is required'),
  term: Yup.string().required('Term is required'),
  noEmp: Yup.number().required('Number of Employees is required'),
  newExist: Yup.string().required('New or Existing is required'),
  retainedJob: Yup.number().required('Retained Job is required'),
  revLineCr: Yup.string().required('Rev Line Cr is required'),
  lowDoc: Yup.string().required('Low Doc is required'),
  grAppv: Yup.number().required('Gr Appv is required'),
  sbaAppv: Yup.number().required('Sba Appv is required'),
  naics0: Yup.boolean().required(),
  naics62: Yup.boolean().required(),
  'naics31-33': Yup.boolean().required(),
});

const AddSmall = ({ user_id }) => {
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
          const response = await fetch('http://127.0.0.1:5000/create_small_with_user', {
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
            alert('Small Entreprise record created!');
          } else {
            const errorData = await response.json();
            console.error('Error data:', errorData);
            alert(`Failed to create Small Entreprise record. Error: ${errorData.message}`);
          }
        } catch (error) {
          console.error('There was an error creating the Small Entreprise record:', error);
          alert('Failed to create Small Entreprise record.');
        }
        setSubmitting(false);
      };

  return (
    <div className="bg-primary w-full overflow-hidden">
      <Navbar />
      <SideBarAdmin/>
      <div className="card" style={{marginTop:"100px"}}>
        <h1>Add Small Entreprise</h1>
        <Formik
          initialValues={{
            email: "",
            userId: user_id,
            entrepriseName: "",
            term: "",
            noEmp: "",
            newExist: "",
            retainedJob: "",
            revLineCr: "",
            lowDoc: "",
            grAppv: "",
            sbaAppv: "",
            naics0: false,
            naics62: false,
            "naics31-33": false,
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="form">
              <Field name="email" placeholder="Email" />
              <ErrorMessage name="email" component="span" className="errorMessage" />
              <Field type="text" placeholder="Entreprise Name" name="entrepriseName" />
              <ErrorMessage name="entrepriseName" component="span" className="errorMessage" />
              <Field type="text" placeholder="Term" name="term" />
              <ErrorMessage name="term" component="span" className="errorMessage" />
              <Field type="number" placeholder="Number of Employees" name="noEmp" />
              <ErrorMessage name="noEmp" component="span" className="errorMessage" />
              <Field as="select" placeholder="New or Existing" name="newExist">
                <option value="">Select</option>
                <option value="1">New</option>
                <option value="0">Existing</option>
              </Field>
              <ErrorMessage name="newExist" component="span" className="errorMessage" />
              <Field type="number" placeholder="Retained Job" name="retainedJob" />
              <ErrorMessage name="retainedJob" component="span" className="errorMessage" />
              <Field type="text" placeholder="Rev Line Cr" name="revLineCr" />
              <ErrorMessage name="revLineCr" component="span" className="errorMessage" />
              <Field type="text" placeholder="Low Doc" name="lowDoc" />
              <ErrorMessage name="lowDoc" component="span" className="errorMessage" />
              <Field type="number" placeholder="Gr Appv" name="grAppv" />
              <ErrorMessage name="grAppv" component="span" className="errorMessage" />
              <Field type="number" placeholder="Sba Appv" name="sbaAppv" />
              <ErrorMessage name="sbaAppv" component="span" className="errorMessage" />
              <div>
                <label>Naics 0</label>
                <Field type="checkbox" name="naics0" />
                <ErrorMessage name="naics0" component="span" className="errorMessage" />
              </div>
              <div>
                <label>Naics 62</label>
                <Field type="checkbox" name="naics62" />
                <ErrorMessage name="naics62" component="span" className="errorMessage" />
              </div>
              <div>
                <label>Naics 31-33</label>
                <Field type="checkbox" name="naics31-33" />
                <ErrorMessage name="naics31-33" component="span" className="errorMessage" />
              </div>
              <button type="submit" disabled={isSubmitting}>
                Create Small Entreprise
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddSmall;
