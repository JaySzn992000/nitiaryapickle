import React, { useEffect, useState } from "react";
import DashboardNav from "./DashboardNav";
import DashboardSlider from "./DashboardSlider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./AdminProfile.css"; 
import { useNavigate } from "react-router";


function AdminProfile() {

const [loggedInAdmin, setLoggedInAdmin] = useState(null);
const [showPassword, setShowPassword] = useState(false);
const [sidebarOpen, setSidebarOpen] = useState(true);
const [navContainer, setNavContainer] = useState(false);
const [relativeClass, setRelativeClass] = useState(false);
const [productClass, setProductClass] = useState(false);
const navigate = useNavigate();

useEffect(() => {
try {
const storedAdmin = localStorage.getItem("loggedInAdmin");
if (storedAdmin && storedAdmin !== "undefined") {
setLoggedInAdmin(JSON.parse(storedAdmin));
}
} catch (error) {
console.error("Error parsing admin data:", error);
setLoggedInAdmin(null);
}
}, [] );

const logoutHandler = () => {
localStorage.removeItem("loggedInAdmin");
localStorage.removeItem("isLoggedIn");
setLoggedInAdmin(null);
navigate("/Adminlogin");
};

const toggleSidebar = () => {
setSidebarOpen(!sidebarOpen);
setNavContainer(!navContainer);
setRelativeClass(!relativeClass);
setProductClass(!productClass);
};


const naviupdateProfile = useNavigate()
const updateProfile = () => {
naviupdateProfile('/Adminupdate')
}

useEffect(() => {
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

if (!isLoggedIn) {
navigate("/adminlogin");
}
}, [navigate] );


return (

<div>

<DashboardNav
toggleSidebar={toggleSidebar}
sidebarOpen={sidebarOpen}
navContainer={navContainer}
/>

<DashboardSlider sidebarOpen={sidebarOpen} />

<div className={`RelativeDB_product ${relativeClass ? "RelativeDB_PRQuery-inside" : ""}`}>
<div className={`DB_products_ ${productClass ? "DB_products_PRQuery-inside" : ""}`}>
<div className="admin-profile-container">
<div className="admin-avatar">
{loggedInAdmin && loggedInAdmin.adminuser && (

<div className="circle-avatar">
<h1>{loggedInAdmin.adminuser.charAt(0).toUpperCase()}</h1>
</div>
)}
</div>
</div>

<div className="admin-info-box">

<h2>{loggedInAdmin?.adminuser}</h2>

<div className="password-section">

<i className="fa fa-password"></i>

<p>
{showPassword
? loggedInAdmin?.adminpass
: "•".repeat(loggedInAdmin?.adminpass?.length || 8)}
</p>

<span onClick={() => setShowPassword(!showPassword)}>
{showPassword ? <FaEyeSlash /> : <FaEye />}
</span>

</div>

{/*  */}

<div className="flx_adminPr">
<i onClick={logoutHandler}
className="fa fa-edit"></i> 
<li style={{cursor : 'pointer'}} onClick={updateProfile}>Edit Profile</li>
</div>

<div onClick={logoutHandler}
className="flx_adminPr">
<i
className="fa fa-sign-out"></i> 
<li>Sign Out</li>
</div>

{/*  */}

</div>

{/*  */}

</div>
</div>

</div>

);
}

export default AdminProfile;
