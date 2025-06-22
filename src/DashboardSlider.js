import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./DashboardSlider.css";


function DashboardSlider({ sidebarOpen }) {

const navigate = useNavigate();
const Productshandler = () => {
sessionStorage.setItem("uiClick", "true");
navigate("/DBProducts");
};

const naviDashi = useNavigate();
const navigateSlider = () => {
naviDashi("/DashboardcomXKPbcadafcddcfadacbPKXproductlistsearchdashboard");
};

const naviOrdersCust = useNavigate();
const orderNavi = () => {
naviOrdersCust("/Custorders");
};

const naviManagmentProduct = useNavigate();

const pdmanagmenthandler = () => {
naviManagmentProduct("/Productmanagment");
};


const naviAdmin = useNavigate()
const adminNavi = () => {
naviAdmin('/AdminUsers')
}


const NaviUsers = useNavigate()
const userNavi = () => {
NaviUsers('/UsersDetails')
}


const adminProfileNavi = useNavigate()
const adminProfile = () => {
adminProfileNavi('/AdminProfile')
}


return (

<div>

<div
className={`slider_Dash ${sidebarOpen ? "slider-in" : "slider-out"}`}
>

<img
className="Img_DashLogo"
alt=""
loading="lazy"
src="https://cdn-icons-png.flaticon.com/128/1828/1828673.png"
></img>


<div>
<li onClick={adminProfile}>APPS</li>
</div>

<section>
<div>
<i className="fa fa-tachometer"></i>
<li onClick={navigateSlider}>Dashboard</li>
<i className="fa fa-angle-down"></i>
</div>

<div>
<i class="fa-brands fa-product-hunt"></i>
<li onClick={Productshandler}>Products</li>
<i className="fa fa-angle-down"></i>
</div>

<div>
<i className="fa fa-list-alt"></i>
<li className="prodctMngmt" onClick={pdmanagmenthandler}>Product Management</li>
<i className="fa fa-angle-down"></i>
</div>

<div>
<i class="fa-solid fa-bag-shopping"></i>
<li onClick={orderNavi}>Orders</li>
<i className="fa fa-angle-down"></i>
</div>


<div style={{lineHeight : '2.1em'}}>
<li onClick={adminProfile}>Profile & Data Protection</li>
</div>


<div>
<i className="fa fa-user"></i>
<li onClick={adminProfile}>My Profile</li>
<i className="fa fa-angle-down"></i>
</div>


<div>
<i class="fas fa-database"></i>
<li onClick={adminNavi}>Admin Data</li>
<i className="fa fa-angle-down"></i>
</div>

<div>
<i class="fas fa-shield"></i>  
<li onClick={userNavi}>User Data</li>
<i className="fa fa-angle-down"></i>
</div>

</section>

{/*  */}

<section></section>

</div>
</div>

);

}

export default DashboardSlider;
