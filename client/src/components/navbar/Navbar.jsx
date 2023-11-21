import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../../context/darkModeContext";
import { AuthContext } from "../../context/authContext";
import Logo from "../../assets/logo.png";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const { currentUser, logout } = useContext(AuthContext);
  
  const navigate = useNavigate(); 

  const handleLogout = () => {
    logout(); 
    navigate("/login"); // Redireciona para a página de login
  };



  return (
    <div className="navbar">
      <div className="left">
      <img src={Logo} alt="Uni4Life Logo" className="logo" />
        <Link to="/" style={{ textDecoration: "none" }}>
        <span className="home-icon-wrapper">   
          <HomeOutlinedIcon />
          </span>
        </Link>
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" placeholder="O que você está procurando?" />
        </div>
      </div>
      <div className="right">
         {currentUser && (
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
