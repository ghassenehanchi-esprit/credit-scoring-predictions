import React, { useState, useEffect } from 'react';
import { close, logo, menu } from '../assets';
import { navLinks } from '../constants';
import { Link, useNavigate } from 'react-router-dom';
import "./NavBar.css";
import { useAuth } from './UseAuth'; // Make sure useAuth is correctly implemented

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const {logout } = useAuth(); // Use user and logout from useAuth
  const {user}=useAuth();
  const navigate = useNavigate(); // Use navigate for redirecting after logout
  const handleLogout = () => {
    logout(); // Call the logout function from useAuth
    navigate('/'); // Redirect to home page after logout
  };
  const handleDashboard = () => {

    if (user.access == 'Admin') {
      console.log(user);


      navigate('/Admin');
    } 
    else{ 
      if (user.role == 'Individual') {
      navigate(`/Individual/${user.id}`);
    } else if (user.role == 'Small') {
      navigate(`/SmallEntreprise/${user.id}`);
    } else {
      // Handle other cases or default navigation
      navigate('/'); // Navigate to the home page or another default page
    }
  }
  };

  // No need to get the user from local storage if using useAuth
  // const currentUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="navbar w-full flex py-6 justify-between items-center navbar text-black" style={scrolled ? { height: '20px', transition: "2s" } : {}}>
      <img src={logo} alt="Carthago credit scoring" className="image w-[100px] h-[40px] flex" style={scrolled ? { scale: '0.8', transition:"2s" } : {}}  />

      {/* Desktop navigation */}
      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((el, index) => (
          <li key={el.id} className={`List ${index === navLinks.length - 1 ? 'mr-0' : 'mr-10'}`}>
            <a href={`${el.href}`}>
              {el.title}
            </a>
          </li>          
        ))}
       {user ? (
         <><li key="Dashboard" className={`Login`}>
            <a href="" onClick={handleDashboard}>
              Dashboard
            </a>
          </li>
          <li key="Logout" className={`Login`}>
              <Link to="#" onClick={handleLogout}>
                Logout
              </Link>
            </li></>
        ) : (
          <li key="Login" className={`Login`}>
            <Link to={`Login`}>
              Login
            </Link>
          </li>
        )}
      </ul>

      {/* Mobile navigation */}
      {/* ... Rest of the component */}
    </nav>
  );
};

export default Navbar;
