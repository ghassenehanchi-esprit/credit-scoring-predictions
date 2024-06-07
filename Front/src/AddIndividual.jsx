// AddIndividual.jsx
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './form.css'; // Make sure this path is correct
import { Navbar ,SideBarAdmin} from './components'; // Assuming Navbar is correctly imported
import React, { useState, useEffect } from 'react';

// Validation schema using Yup
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  empTitle: Yup.number(),
  term: Yup.number(),
  loanAmnt: Yup.number(),
  purpose: Yup.number(),
  homeOwnership: Yup.number(),
  dti: Yup.number(),
  grade: Yup.string(),
  annualInc: Yup.number(),
  intRate: Yup.number(),
});

const AddIndividual = () => {
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
      const response = await fetch('http://127.0.0.1:5000/create_individual_with_user', {
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
        alert('Individual record created!');
      } else {
        const errorData = await response.json();
        console.error('Error data:', errorData);
        alert(`Failed to create individual record. Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error('There was an error creating the individual record:', error);
      alert('Failed to create individual record.');
    }
    setSubmitting(false);
  };
  
  
  return (
    <div className="bg-primary w-full overflow-hidden">
    <Navbar />
      <SideBarAdmin/>
      <div className="card" style={{marginTop:"100px"}}>
          <h1>Add Individual</h1>
        
        <Formik 
          initialValues={{
            email: '',
            empTitle: '',
            term: '',
            loanAmnt: '',
            purpose: '',
            homeOwnership: '',
            dti: '',
            grade: '',
            annualInc: '',
            intRate: '',
          }}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="form">
              <Field name="email" placeholder="Email" />
              <ErrorMessage name="email" component="span" className="errorMessage" />
              <Field name="empTitle" placeholder="Employment Title" type="number" />
              <Field name="term" placeholder="Term" type="number"/>
              <Field name="loanAmnt" placeholder="Loan Amount" type="number" />
              <Field name="purpose" placeholder="Purpose"type="number" />
              <Field name="homeOwnership" placeholder="Home Ownership" type="number"/>
              <Field name="dti" placeholder="DTI" type="number" />
              <Field name="grade" placeholder="Grade" type="number"/>
              <Field name="annualInc" placeholder="Annual Income" type="number" />
              <Field name="intRate" placeholder="Interest Rate" type="number" />
              <button type="submit" disabled={isSubmitting}>
                Create Individual
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddIndividual;
