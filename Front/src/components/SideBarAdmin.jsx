import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import './Interfaceuser.css';
import logo from '../assets/logo.png';

const SideBarAdmin = ({Dashboard}) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [activeButton, setActiveButton] = useState(false);
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleButtonClick = (button) => {
    setActiveButton(button);
    if (activeButton === "add-indiv"){
      navigate("/Admin/Individual/Add")
    }else if (activeButton === "Dashboard"){
      navigate("/Admin")
    }else if (activeButton === "add-small"){
      navigate("/Admin/Small/Add")
    }else if (activeButton === "add-large"){
      navigate("/Admin/Large/Add")
    }
  };

  return (
    <>
      <aside id="sidebar" style={{zIndex:"9999"}} className={`sidebar ${sidebarVisible ? 'visible' : ''}`}>
        <ul className="sidebar-nav" id="sidebar-nav">

        </ul>

        <div className="logo-container">
          <img
            src={logo}
            alt="Logo"
            className="logo-image"
          />
        </div>

        <div className="button-wrapper">
          <button
            className={`dropbox-chooser button ${activeButton === "Dashboard" ? 'active' : ''}`}
            onClick={() => handleButtonClick("Dashboard")}
            
          >
            <span className="icon">📊</span> Dashboard
          </button>
        </div>

        <div className="button-wrapper">
          <button
            className={`dropbox-chooser button ${activeButton === "add-indiv" ? 'active' : ''}`}
            onClick={() => handleButtonClick("add-indiv")}
          >
            <span className="icon">🙋‍♂️</span> Add Individual
          </button>
        </div>

        <div className="button-wrapper">
          <button
            className={`dropbox-chooser button ${activeButton === "add-small" ? 'active' : ''}`}
            onClick={() => handleButtonClick("add-small")}
          >
            <span className="icon">🏢</span> Add Small Entreprise
          </button>
        </div>

        <div className="button-wrapper">
          <button
            className={`dropbox-chooser button logout-button ${activeButton === "add-large" ? 'active' : ''}`}
            onClick={() => handleButtonClick("add-large")}
          >
            <span className="icon">🏙</span> Add Large/Medium Entreprise
          </button>
        </div>

        <div className="spacer mt-4"></div>
      </aside>

      <div style={{zIndex:"9999"}} className={`toggle-button ${sidebarVisible ? 'moved' : ''}`} onClick={toggleSidebar}></div>

    </>
  );
};

export default SideBarAdmin;
