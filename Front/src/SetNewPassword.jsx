import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Footer } from './components'; // Assuming Footer is correctly imported
import { Navbar } from './components'; // Assuming Navbar is correctly imported
import { SetNewPasswordForm } from './components';

const SetNewPassword = () => {
  const navigate = useNavigate();
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);

 

  return (
    <div className="bg-primary w-full overflow-hidden">
      {isPasswordUpdated ? (
        <div className="password-update-success-message">
          Password updated successfully!
        </div>
      ) : (
        <SetNewPasswordForm  />
      )}
      <Footer />
    </div>
  );
};

export default SetNewPassword;
