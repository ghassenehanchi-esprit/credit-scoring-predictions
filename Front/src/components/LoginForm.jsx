import "./LoginForm.css";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from "./UseAuth";

function LoginForm() {
  const initialValues = {
    emailOrUsername: "",
    password: "",
  };
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const { login } = useAuth(); // get the login function from useAuth

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  
    // Check if there are no validation errors
    if (Object.keys(formErrors).length === 0) {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/login`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email: formValues.emailOrUsername,
              password: formValues.password
            })
          }
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data); // Log the response from the server
        setUserData(data); // Update state with user data
        // Check if users is defined
        if (data['user']) {
          console.log(data['user']);
          login(data['user']); // Call the login function from useAuth with user data
        } else {
          console.error('Users is undefined or empty');
        }
      } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
      }
    }
  };
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors, formValues, isSubmit]);

  const validate = (values) => {
    const errors = {};
    if (!values.emailOrUsername) {
      errors.emailOrUsername = "Email or Username is required!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

    return (
      <>
        <div className="boddy">
         <video autoPlay loop muted playsInline>
          <source src="Video.mp4"  type="video/mp4" className="Background-video"/>
        </video>
        <form className="form-login" onSubmit={handleSubmit}>
            <h3>Login Here</h3>

            <label htmlFor="username">Username</label>
            <input 
                type="text" 
                placeholder="Email or Phone" 
                id="username" 
                name="emailOrUsername" 
                value={formValues.emailOrUsername}
                onChange={handleChange} 
                style={{color:"white"}}
            />

            <label htmlFor="password">Password</label>
            <input 
                type="password" 
                placeholder="Password" 
                id="password" 
                name="password" 
                value={formValues.password}
                onChange={handleChange} 
                style={{color:"white"}}
            />

            <button style={{marginLeft:"20%" , marginTop:"30px"}} type="submit" className="btn">
            <svg style={{top:"63.95%" , marginLeft:"100px"}} width="180px" height="60px" viewBox="0 0 180 60" className="border">
              <polyline points="179,1 179,59 1,59 1,1 179,1" className="bg-line" />
              <polyline points="179,1 179,59 1,59 1,1 179,1" className="hl-line" />
            </svg>
            <span style={{top:"50%" , right:"50%"}}>Login</span>
            </button>
            <div className="social">
                <center>
                <div style={{marginLeft:"80px"}} className="fb"><i className="fab fa-facebook"></i>
                    <Link to={`/`} className="hover:text-gray-300">
                      Home
                    </Link>
                </div>
                </center>
                
            </div>
        </form>
        </div>
      </>
    );
}

export default LoginForm;
