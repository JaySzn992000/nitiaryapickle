import React, { useEffect, useState } from "react";
import DashboardNav from "./DashboardNav";
import DashboardSlider from "./DashboardSlider";
import { useNavigate } from "react-router-dom";
import "./DBProducts.css";

function DBProducts() {


const [storeDB, setstoreDB] = useState([]);
const [totalProducts, setTotalProducts] = useState(0);

useEffect(() => {
const DbFetch = async () => {

try {

const response = await fetch("https://picklewebsite.onrender.com/fetchDB");

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
<h2>Total Items : {totalProducts}</h2>
</div>

<div className="table-wrapper">

<table className="product-table">

<thead>
<tr>
<th># ID</th>
<th># Product</th>
<th className="tdData">Category</th>
<th className="tdData">Name</th>
<th>Sizes</th>
<th>Price</th>
</tr>
</thead>


<tbody>
{storeDB.map((DisDb, index) => (
<tr key={index}>
<td># {DisDb.id}</td>
<td>
{DisDb.file_path && (
<img
src={`https://picklewebsite.onrender.com${DisDb.file_path}`}
alt={DisDb.name}
className="product-img"
/>
)}
</td>
<td>{DisDb.img}</td>
<td>{DisDb.name}</td>

<td>
{DisDb.sizes &&
DisDb.sizes.split(',').map((size, i) => {
const colors = ['#FFB6C1', '#87CEFA', '#98FB98'];
const bgColor = colors[i % colors.length];

return (

<span
key={i}
style={{
backgroundColor: bgColor,
color: "#000",
padding: "4px 8px",
borderRadius: "4px",
marginRight: "5px",
display: "inline-block",
minWidth: "30px",
textAlign: "center",
margin : '5px'
}}
>
{size.trim()}
</span>
);
})}
</td>

<td>₹ {DisDb.price}</td>
</tr>
))}
</tbody>
</table>
</div>

</div>
</div>
</div>

);

}

export default DBProducts;
