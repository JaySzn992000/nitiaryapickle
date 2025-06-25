import React, { useEffect, useState } from "react";
import DashboardNav from "../DashboardNav";
import DashboardSlider from "../DashboardSlider";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router";
import "./Custorders.css";

function Custorders() {

const [customerOrder, setcustomerOrder] = useState([]);
const [totalcustProducts, settotalcustProducts] = useState(0);
const [selectedDate, setSelectedDate] = useState('');

const [allCustomerOrders, setAllCustomerOrders] = useState([]);


useEffect(() => {
const customerFetch = async () => {
try {
    // http://192.168.1.4:3000
    // http://localhost:3001/fetchCutomerOrder
const response = await fetch("https://picklewebsite.onrender.com/fetchCutomerOrder");
const data = await response.json();
setAllCustomerOrders(data.products);
setcustomerOrder(data.products);
settotalcustProducts(data.total);
} catch (error) {
console.error("Error message:", error);
}
};

customerFetch();
}, [] );


const [sidebarOpen, setSidebarOpen] = useState(true);
const [navContainer, setnavContainer] = useState(false);

const [relative_CustordersCon, setrelative_CustordersCon] = useState(false);

const toggleSidebar = () => {
setSidebarOpen((prevState) => !prevState);
setnavContainer((prevState) => !prevState);
setrelative_CustordersCon((prevState) => !prevState);
};


const navigate = useNavigate();

useEffect(() => {
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

if (!isLoggedIn) {
navigate("/adminlogin");
}
}, [navigate] );


const customerFetch = async () => {

try {

const response = await fetch("https://picklewebsite.onrender.com/fetchCutomerOrder");
const data = await response.json();
setcustomerOrder(data.products);
settotalcustProducts(data.total);
} catch (error) {
console.error("Error message:", error);
}
};

useEffect(() => {
customerFetch();

}, [] );
  

const handleFilterSubmit = () => {

if (!selectedDate) {
customerFetch();
return;
}


const filteredOrders = allCustomerOrders.filter((order) => {
const orderDate = new Date(order.date);
const filterDate = new Date(selectedDate);

return (
orderDate.getFullYear() === filterDate.getFullYear() &&
orderDate.getMonth() === filterDate.getMonth() &&
orderDate.getDate() === filterDate.getDate()
);
});

setcustomerOrder(filteredOrders);
settotalcustProducts(filteredOrders.length);
};


const formatDate = (isoDate) => {
const date = new Date(isoDate);
const month = date.getMonth() + 1; 
const day = date.getDate();
const year = date.getFullYear();
return `${month}-${day}-${year}`;
};



// Order Successfull Button

const updateStatus = async (orderId) => {

try {
const response = await fetch("https://picklewebsite.onrender.com/updateOrderStatus", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({ razorpay_order_id: orderId }),
});

const result = await response.json();

if (result.success) {
setcustomerOrder((prevOrders) =>
prevOrders.map((order) =>
order.razorpay_order_id === orderId
? { ...order, status_order: "Delivered" }
: order
)
);
}
} catch (error) {
console.error("Update error:", error);
}

};


return (


<div>

<Helmet>
<title>Customer Orders Dashboard | Pickle Admin</title>
<meta
name="description"
content="View all customer orders placed on Pickle. Monitor customer details, order status, amount, and product information."
/>
<meta
name="keywords"
content="Customer orders, admin dashboard, Pickle orders, order management, ecommerce admin"
/>
<meta name="robots" content="noindex, nofollow" />
</Helmet>

<DashboardNav
toggleSidebar={toggleSidebar}
sidebarOpen={sidebarOpen}
navContainer={navContainer}
></DashboardNav>
<DashboardSlider sidebarOpen={sidebarOpen} />


<div
className={`Parent_relativeCust ${
relative_CustordersCon ? "relative_Custorders_inside" : ""
}`}
>

<h3 className="custorders-header">
Orders Placed : {totalcustProducts}
</h3>

<div className="filter-container">

<label htmlFor="date-filter">Filter by Date:</label>
<input
id="date-filter"
type="date"
value={selectedDate}
onChange={(e) => setSelectedDate(e.target.value)}
/>
<button onClick={handleFilterSubmit}>Apply Filter</button>

</div>


<div className="relative_Custorders">
<div className="custorders-container">
<table className="custorders-table">
<thead>

<tr>
<th># ID</th>
<th># Product</th>
<th>Product Name</th>
<th>Name</th>
<th>Mobile</th>
<th>Email</th>
<th>Payment Status</th>
<th>Order Date</th>
<th>Gender</th>
<th>Address</th>
<th>Country</th>
<th>Pincode</th>
<th>State</th>
<th>Amount</th>
<th>Quantity</th>
<th>Order Status</th>
<th>Order Button</th>
</tr>
</thead>

<tbody>

{customerOrder.map((CusDB, index) => {

const colors = ['#FFB6C1', '#87CEFA', '#98FB98', '#FFD700', '#FFA07A', '#DDA0DD'];
const bgColor = colors[index % colors.length];

return (

<tr key={index}>

<td className="id_td"># {CusDB.id}</td>

<td colSpan="1">
{CusDB.file_path && (
<img
src={`https://picklewebsite.onrender.com${CusDB.file_path}`}
alt={CusDB.name}
className="custorders-image"
style={{
width: "50px",
height: "50px",
borderRadius: "6px",
objectFit: "cover"
}}
/>
)}
</td>


<td className="name_td">
{CusDB.productname}
</td>

<td className="name_tdItem">{CusDB.name}</td>
<td>{CusDB.mob}</td>
<td className="name_td">{CusDB.email}</td>

<td>
<span
style={{
backgroundColor: bgColor,
color: "#000",
borderRadius: "5px",
display: "inline-block",
minWidth: "79px",
textAlign: "center"
}}
>
{CusDB.payment_status}
</span>
</td>

<td style={{minWidth : '143px'}}
>{formatDate(CusDB.date)}</td>
<td>{CusDB.gender}</td>

<td className="name_td">{CusDB.address}</td>

<td>{CusDB.country}</td>
<td>{CusDB.pincode}</td>
<td>{CusDB.state}</td>
<td>₹ {CusDB.amount}</td>
<td>{CusDB.quantity}</td>
<td>{CusDB.status_order}</td>

<td>
<button
className="custOrderBtn"
onClick={() => updateStatus(CusDB.razorpay_order_id)}
disabled={CusDB.status_order === "Delivered"}
>
{CusDB.status_order === "Delivered" ? "Delivered" : "Mark as Delivered"}
</button>
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

export default Custorders;
