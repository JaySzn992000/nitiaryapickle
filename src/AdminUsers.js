import React, { useEffect, useState } from "react";
import DashboardNav from "./DashboardNav";
import DashboardSlider from "./DashboardSlider";
import { useNavigate } from "react-router";
import "./DBProducts.css";

function AdminUsers () {

const [storeDB, setstoreDB] = useState([]);
const [totalProducts, setTotalProducts] = useState(0);

useEffect(() => {
const DbFetch = async () => {

try {

const response = await fetch("https://picklewebsite.onrender.com/adminusersDeatils");

const data = await response.json();

setstoreDB(data.products);
setTotalProducts(data.total);
} catch (error) {
console.error("Error message:", error);
}
};

DbFetch();
}, []);

const [RelativeDB_PRQuery, setRelativeDB_PRQuery] = useState(false);

const [sidebarOpen, setSidebarOpen] = useState(true);
const [navContainer, setnavContainer] = useState(false);
const [DB_products_PRQuery, setDB_products_PRQuery] = useState(false);

const toggleSidebar = () => {
setSidebarOpen((prevState) => !prevState);
setnavContainer((prevState) => !prevState);
setRelativeDB_PRQuery((prevState) => !prevState);
setDB_products_PRQuery((prevState) => !prevState);
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
<DashboardNav
toggleSidebar={toggleSidebar}
sidebarOpen={sidebarOpen}
navContainer={navContainer}
>
{" "}
</DashboardNav>

<DashboardSlider sidebarOpen={sidebarOpen} />

<div
className={`RelativeDB_product ${
RelativeDB_PRQuery ? "RelativeDB_PRQuery-inside" : ""
}`}
>
<div
className={`DB_products_ ${
DB_products_PRQuery ? "DB_products_PRQuery-inside" : ""
}`}
>

<div className="Flx_DBProducts">
<h2>Admin Active : {totalProducts}</h2>
</div>

<div className="table-wrapper">
<table className="product-table">
<thead>
<tr>
<th># Name</th>
<th>Passwords</th>
</tr>
</thead>
<tbody>

{storeDB.map((DisDb, index) => {

const colors = ['#FFB6C1', '#87CEFA', '#98FB98'];
const bgColor = colors[index % colors.length];

return (
<tr key={index}>
<td>{DisDb.adminuser}</td>
<td>
<span
style={{
backgroundColor: bgColor,
color: "#000",
borderRadius: "5px",
paddingLeft : '10px',
paddingRight : '10px',
paddingTop : '1.5px',
minWidth: "77px",
height : '28px',
display: "inline-block",
textAlign: "center"
}}
>
{DisDb.adminpass}
</span>
</td>
</tr>
)
})}

</tbody>
</table>
</div>

</div>
</div>
</div>

);

}

export default AdminUsers;
