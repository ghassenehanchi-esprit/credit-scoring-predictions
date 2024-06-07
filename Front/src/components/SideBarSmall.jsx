// Interfaceuser.jsx
import React from 'react';
import './SideBarSmall.css';
import scoreGif from '../assets/score.png';

const SideBarSmall = ({ user_id }) => {
  return (
    <>  
    <div className="area"></div>
        <nav className="main-menu" style={{position:'absolute',left:"0px"}}>
            <ul>
                <li>
                    <a style={{color:"white"}} href="https://jbfarrow.com"> 
                        <i className="fa fa-home fa-2x" style={{color:"white"}}></i>
                        <span className="nav-text" style={{color:"gold"}}>
                           Community Dashboard
                        </span>
                    </a>
                  
                </li>
                <li className="has-subnav">
                    <a href="/Improvescore">
                        <i className="fa fa-globe fa-2x"></i>
                        <span className="nav-text">
                          Loan Application
                        </span>
                    </a>
                    
                </li>
                <li className="has-subnav">
                    <a href={`/ApplyForLoan/${user_id}`}>
                       <i className="fa fa-comments fa-2x"></i>
                        <span className="nav-text">
                            Group Hub Forums
                        </span>
                    </a>
                    
                </li>
                <li className="has-subnav">
                    <a href="#">
                       <i className="fa fa-camera-retro fa-2x"></i>
                        <span className="nav-text">
                            Survey Photos
                        </span>
                    </a>
                   
                </li>
                <li>
                    <a href="#">
                        <i className="fa fa-film fa-2x"></i>
                        <span className="nav-text">
                            Surveying Tutorials
                        </span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <i className="fa fa-book fa-2x"></i>
                        <span className="nav-text">
                           Surveying Jobs
                        </span>
                    </a>
                </li>
                <li>
                   <a href="#">
                       <i className="fa fa-cogs fa-2x"></i>
                        <span className="nav-text">
                            Tools & Resources
                        </span>
                    </a>
                </li>
                <li>
                   <a href="#">
                        <i className="fa fa-map-marker fa-2x"></i>
                        <span className="nav-text">
                            Member Map
                        </span>
                    </a>
                </li>
                <li>
                    <a href="#">
                       <i className="fa fa-info fa-2x"></i>
                        <span className="nav-text">
                            Documentation
                        </span>
                    </a>
                </li>
            </ul>

            <ul className="logout">
                <li>
                   <a href="#">
                         <i className="fa fa-power-off fa-2x"></i>
                        <span className="nav-text">
                            Logout
                        </span>
                    </a>
                </li>  
            </ul>
        </nav>
    
    
    
    
    </>
  );
};

export default SideBarSmall;
