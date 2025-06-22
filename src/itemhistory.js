import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Navbar from "./headers_footer/navbar";
import Header from "./headers_footer/header";
import "./ItemHistory.css";

function ItemHistory() {

const [loggedInUser, setLoggedInUser] = useState(null);
const location = useLocation();
const [quantities, setQuantities] = useState([]);


useEffect(() => {
const storedUser = localStorage.getItem("loggedInUser");
if (storedUser) {
setLoggedInUser(JSON.parse(storedUser));
}

if (location.state && location.state.loggedInUser) {
const user = location.state.loggedInUser;
setLoggedInUser(user);
localStorage.setItem("loggedInUser", JSON.stringify(user));
}
}, [location.state] );

useEffect(() => {
const customerFetch = async () => {
try {
const response = await fetch(
"http://localhost:3001/historyfetchcustomer"
);
const data = await response.json();
if (loggedInUser) {
const userProducts = data.filter(
(item) => item.mob === loggedInUser.mobileno
);
setQuantities(userProducts);
}
} catch (error) {
console.error("Error message:", error);
}
};

customerFetch();
}, [loggedInUser] );



const getStatusColor = (index) => {
const colors = ["#FFB6C1", "#87CEFA", "#98FB98", "#FFD700", "#FFA07A"];
return colors[index % colors.length]; // Ensure it cycles 
// through the colors
};


return (


<div>

<Navbar />

<div className="Parent_relativeCustItem">
<div className="relative_CustordersItem">
<div className="custorders-containerItem">
<h3 className="custorders-headerItem">
Purchase History ({quantities.length})
</h3>

{quantities.length > 0 ? (
<table className="custorders-tableItem">
<thead>
<tr>
<th># ID</th>
<th># Product</th>
<th>Product Name</th>
<th>Name</th>
<th>Mobile</th>
<th>Email</th>
<th>Quantity</th>
<th>Amount</th>
<th>Payment Status</th>
<th>Order Date</th>
<th>Estimate Delivery Date</th>
<th>Gender</th>
<th>Address</th>
<th>Country</th>
<th>Pincode</th>
<th>State</th>
<th>Alt. Mobile</th>
<th>Order ID</th>
<th>Payment ID</th>
<th>Order Status</th>
</tr>


</thead>
<tbody>
{quantities.map((item, index) => (
<tr key={index}>
<td># {item.id}</td>
<td>
{item.file_path && (
<img
src={`http://localhost:3001${item.file_path}`}
alt={item.productname}
className="custorders-imageItem"
/>
)}
</td>

<td className="name_tdItem">{item.productname}</td>
<td className="name_tdItem">{item.name}</td>
<td>{item.mob}</td>

<td 
className="OrderhistoryTd name_tdItem">{item.emailid}</td>

<td>{item.quantity}</td>
<td>₹ {item.amount}</td>

<td>

<span
style={{
backgroundColor: getStatusColor(index), 
color: "#000",
borderRadius: "4px",
display: "inline-block",
minWidth: "80px",
textAlign: "center",
}} >

{item.payment_status}

</span>
</td>

<td className="name_tdItem">
{new Date(item.created_at).toLocaleDateString("en-GB", {
day: 'numeric',
month: 'short',
year: 'numeric',
timeZone: 'Asia/Kolkata'
})}
</td>

<td className="name_tdItem">
{new Date(item.estimated_delivery_date).toLocaleDateString("en-GB", {
day: 'numeric',
month: 'short',
year: 'numeric',
timeZone: 'Asia/Kolkata'
})}
</td>

<td>{item.gender}</td>
<td className="name_tdItem"
>{item.address}</td>
<td>{item.country}</td>
<td>{item.pincode}</td>
<td>{item.state}</td>
<td>{item.alternativenumber}</td>
<td>{item.razorpay_order_id}</td>
<td>{item.razorpay_payment_id}</td>
<td>{item.status_order}</td>
</tr>
))}
</tbody>
</table>
) : (
<p className="no_history">
No product history available for the logged-in user.
</p>
)}
</div>
</div>
</div>

<div className="header-ad">
<Header />
</div>
</div>

);

}

export default ItemHistory;
