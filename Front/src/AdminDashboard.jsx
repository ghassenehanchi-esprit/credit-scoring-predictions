import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar, useAuth , SideBarAdmin } from './components'; // Assuming Navbar is correctly imported
 // Assurez-vous que useAuth est correctement implémenté

const AdminDashboard = () => {
  const { user, logout } = useAuth(); // Utilisez user et logout de useAuth

  useEffect(() => {
    // Vous pouvez utiliser user ici pour effectuer des opérations après le chargement du composant
    console.log('Current user:', user);
  }, [user]); // Ajoutez user aux dépendances de useEffect pour suivre ses changements

  return (
    <div className="bg-primary w-full overflow-hidden">
      {/* Pass the currentUser as a prop to the Navbar */}
      <Navbar currentUser={user} logout={logout}/>
      
      <br /><br /><br />
      <center>
        <div>
          
        </div>
        <SideBarAdmin currentUser={user} activeButton={"Dashboard"}/>
        <div style={{ height: '900px' }}>
          <iframe title="exemple1" style={{scale:1}} width="1140" height="541.25" src="https://app.powerbi.com/reportEmbed?reportId=d5170acf-0bb9-4840-a73d-54b83fd38a2d&autoAuth=true&ctid=604f1a96-cbe8-43f8-abbf-f8eaf5d85730" frameBorder="0" allowFullScreen="true"></iframe>
        </div>
      </center>
    </div>
  );
};

export default AdminDashboard;
