import "./LoginForm.css";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "./UseAuth";


function SetNewPasswordForm() {
  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  
    // Check if there are no validation errors
    if (Object.keys(formErrors).length === 0 && formValues.newPassword === formValues.confirmPassword) {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/change_password/${user.id}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              new_password: formValues.newPassword,
              confirm_password: formValues.confirmPassword
            })
          }
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data); // Log the response from the server
        alert('Password updated successfully!');
        
        // Navigate to the route based on the user's role
        if (user.role === 'Small') {
          navigate(`/SmallEntreprise/${user.id}`);
        } else if (user.role === 'Individual') {
          navigate(`/Individual/${user.id}`);
        } else {
          navigate("/"); // Redirect to the home page or another default page
        }
      } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
        alert('Failed to update password.');
      }
    } else {
      alert('Passwords do not match.');
    }
  };


  const validate = (values) => {
    const errors = {};
    if (!values.newPassword) {
      errors.newPassword = "New password is required!";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm password is required";
    }
    return errors;
  };

  return (
    <div className="boddy">
    <video autoPlay loop muted playsInline>
     <source src="Video.mp4"  type="video/mp4" className="Background-video"/>
   </video>
      <form className="form-login" onSubmit={handleSubmit}>
        <h3>Set New Password</h3>

        <label htmlFor="newPassword">New Password</label>
        <input 
          type="password" 
          placeholder="New Password" 
          id="newPassword" 
          name="newPassword" 
          value={formValues.newPassword}
          onChange={handleChange} 
          style={{color:"white"}}
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input 
          type="password" 
          placeholder="Confirm Password" 
          id="confirmPassword" 
          name="confirmPassword" 
          value={formValues.confirmPassword}
          onChange={handleChange} 
          style={{color:"white"}}
        />

<button style={{marginLeft:"20%" , marginTop:"30px"}} type="submit" className="btn">
            <svg style={{top:"63.95%" , marginLeft:"100px"}} width="180px" height="60px" viewBox="0 0 180 60" className="border">
              <polyline points="179,1 179,59 1,59 1,1 179,1" className="bg-line" />
              <polyline points="179,1 179,59 1,59 1,1 179,1" className="hl-line" />
            </svg>
            <span style={{top:"50%" , right:"50%"}}>Update Password</span>
            </button>      </form>
    </div>
  );
}

export default SetNewPasswordForm;
