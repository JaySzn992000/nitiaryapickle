import React from "react";
import AddProducts from "./AddProducts";
import UpdateProduct from "./UpdateProduct";
import Deleteproduct from "./Deleteproduct";
import DashboardNav from "./DashboardNav";
import DashboardSlider from "./DashboardSlider";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

function Productmanagment () {


const [sidebarOpen, setSidebarOpen] = useState(true);
const [navContainer,setnavContainer] = useState(false);


const [Product_relativeCon, setProduct_relativeCon] = useState(false);
const [dashboard_containerCon, setdashboard_containerCon] = useState(false);


const [Update_relativeCon, setUpdate_relativeCon] = useState(false);
const [update_containerCon, setupdate_containerCon] = useState(false);


const [Delete_relativeCon, setDelete_relativeCon] = useState(false);
const [Delete_formCon, setDelete_formCon] = useState(false);


const toggleSidebar = () => {

setSidebarOpen((prevState) => !prevState);
setnavContainer(prevState => !prevState);

setProduct_relativeCon(prevState => !prevState);
setdashboard_containerCon(prevState => !prevState);

setUpdate_relativeCon(prevState => !prevState);
setupdate_containerCon(prevState => !prevState);

setDelete_relativeCon(prevState => !prevState);
setDelete_formCon(prevState => !prevState);

};


const navigate = useNavigate();

useEffect(() => {
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

if (!isLoggedIn) {
navigate("/adminlogin");
}
}, [navigate] );


return (

<div>

<DashboardNav toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen}
navContainer={navContainer}
></DashboardNav>
<DashboardSlider sidebarOpen={sidebarOpen} />


<AddProducts
Product_relativeCon={Product_relativeCon}
dashboard_containerCon={dashboard_containerCon}
/>


<UpdateProduct Update_relativeCon={Update_relativeCon} 
update_containerCon={update_containerCon}
></UpdateProduct>

<Deleteproduct Delete_relativeCon={Delete_relativeCon}
Delete_formCon={Delete_formCon}
></Deleteproduct>


</div>

)

}

export default Productmanagment;