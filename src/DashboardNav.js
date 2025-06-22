import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import DashboarUserIcon from "./Images_ToolsSymbols/dashboarduser.png";
import "./DashboardNav.css";

function DashboardNav({ toggleSidebar, navContainer }) {

const naviDashboard = useNavigate();
const Dashboardnav = () => {
naviDashboard("/DashboardcomXKPbcadafcddcfadacbPKXproductlistsearchdashboard");
};

const AdminProfileNavi = useNavigate()
const AdminProfile = () => {
AdminProfileNavi('/AdminProfile')
}


return (

<div>

{/*  */}

<nav className="dashboard-nav">

<div
className={`nav_insidenav ${
navContainer ? "navContainer-inside" : ""
}`}
>

<section className="dashboard_firstContainer">
<div>
<img
className="fa fa-bars"
onClick={toggleSidebar}
src="https://cdn-icons-png.flaticon.com/128/5259/5259008.png"
alt=""
loading="lazy"
></img>
<img src="https://cdn-icons-png.flaticon.com/128/4675/4675164.png"
alt=""
loading="lazy"
></img>
<li className="liDashboard" onClick={Dashboardnav}>
Dashboard
</li>
</div>
</section>

{/*  */}

<section>

<div onClick={AdminProfile} >
<img
style={{ width: "47px"}}
src={DashboarUserIcon}
alt=""
loading="lazy"
></img>
<li className="liDashboard">Users</li>
</div>
</section>
</div>

</nav>

</div>

);

}

export default DashboardNav;
