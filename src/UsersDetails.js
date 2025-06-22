import React, { useEffect, useState } from "react";
import DashboardNav from "./DashboardNav";
import DashboardSlider from "./DashboardSlider";
import { useNavigate } from "react-router";
import "./UsersDetails.css";
import "./DBProducts.css";

function UsersDetails () {


const [storeDB, setstoreDB] = useState([]);
const [totalProducts, setTotalProducts] = useState(0);

useEffect(() => {
const DbFetch = async () => {
try {
const response = await fetch("http://192.168.1.4:3001/usersDetails");

const data = await response.json();

setstoreDB(data.products);
setTotalProducts(data.total);
} catch (error) {
console.error("Error message:", error);
}
};

DbFetch();
}, [] );

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
<h2>Registered Users : {totalProducts}
</h2>
</div>

<div className="table-wrapper">
<table className="product-table">
<thead>
<tr>
<th># ID</th>
<th>Name</th>
<th>Email</th>
<th>Password</th>
<th>Mobile no</th>
</tr>
</thead><tbody>
{storeDB.map((DisDb, index) => {

const colors = ['#FFB6C1', '#87CEFA', '#98FB98'];
const bgColor = colors[index % colors.length];

return (

<tr key={index}>

<td>
# {DisDb.id}
</td>

<td className="username"
style={{color : 'black'}}>
{DisDb.name}
</td>

<td className="usertd">
# {DisDb.email}
</td>

<td
style={{
backgroundColor: bgColor,
color: "#000",
borderRadius: "5px",
paddingLeft : '17px',
paddingTop : '7px',
display: "inline-block",
textAlign: "start"
}}
 className="Userpass">
{DisDb.password}
</td>

<td>
{DisDb.mobileno}
</td>
</tr>
);
})}

</tbody>
</table>
</div>
</div>
</div>

</div>

);

}

export default UsersDetails;
