import React, { useEffect, useState } from "react";
import OrdersDashImg from "../Images_ToolsSymbols/OrdersDash.png";
import OrdersDashEarn from "../Images_ToolsSymbols/wallet.png";
import OrdersDashOrdr from "../Images_ToolsSymbols/orders.png";
import OrdersDashUsr from "../Images_ToolsSymbols/user.png";
import DashboardNav from "../DashboardNav";
import DashboardSlider from "../DashboardSlider";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import "./TlPrdctOrdrearn.css";


function TlPrdctOrdrearn() {

const [totalcustProducts, setTotalcustProducts] = useState(0);
const [totalAmount, setTotalAmount] = useState(0);
const [totalProducts, setTotalProducts] = useState(0);
const [totalUsers, setTotalUsers] = useState(0);
const [storeDB, setStoreDB] = useState([]);
const [customerOrder, setCustomerOrder] = useState([]);

useEffect(() => {
const DbFetch = async () => {
try {
// http://localhost:3001    
const response = await fetch("http://192.168.1.4:3001/fetchDB");
const data = await response.json();
setStoreDB(data.products);
setTotalProducts(data.total);
} catch (error) {
console.error("Error message:", error);
}

};

DbFetch();
}, [] );


useEffect(() => {
const customerFetch = async () => {
try {
const response = await fetch("http://192.168.1.4:3001/fetchCutomerOrder");
const data = await response.json();
setCustomerOrder(data.products);
setTotalcustProducts(data.total);
const amount = data.products.reduce(
(acc, item) => acc + (item.amount || 0),
0
);
setTotalAmount(amount);
} catch (error) {
console.error("Error message:", error);
}
};

customerFetch();
}, [] );


useEffect(() => {
const fetchTotalUsers = async () => {
try {
const response = await fetch("http://192.168.1.4:3001/usertotalnofo");
const data = await response.json();
setTotalUsers(data.total);
} catch (error) {
console.error("Error message:", error);
}
};

fetchTotalUsers();
}, [] );


const [sidebarOpen, setSidebarOpen] = useState(true);
const [navContainer, setnavContainer] = useState(false);
const [DashParentContainer, setDashParentContainer] = useState(false);
const [Dashcontainer, setDashcontainer] = useState(false);

// 

const [ChartParentContainer, setChartParentContainer] = useState(false);
const [ChartContainer, setChartContainer] = useState(false);


const toggleSidebar = () => {

setSidebarOpen((prevState) => !prevState);
setnavContainer((prevState) => !prevState);
setDashParentContainer((prevState) => !prevState);
setDashcontainer((prevState) => !prevState);
setChartParentContainer((prevState) => !prevState); 
setChartContainer((prevState) => !prevState);

};




const [selectedDate, setSelectedDate] = useState("");

const handleFilterSubmit = async () => {

try {
const response = await fetch("http://localhost:3001/fetchCutomerOrder", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({ date: selectedDate }),
});
const data = await response.json();
setCustomerOrder(data.products);
setTotalcustProducts(data.total);
const amount = data.products.reduce((acc, item) => acc + (item.amount || 0), 0);
setTotalAmount(amount);
} catch (error) {
console.error("Error fetching filtered data:", error);
}

};


return (

<div>

<DashboardNav
toggleSidebar={toggleSidebar}
sidebarOpen={sidebarOpen}
navContainer={navContainer}
></DashboardNav>
<DashboardSlider sidebarOpen={sidebarOpen} />

{/* for Date 
Filter */}


<div
className={`Parent_relativeChart ${
ChartParentContainer ? "ChartParentContainer-inside" : ""
}`}
>

<div
className={`div_total_customerChart all_divChart ${
ChartContainer ? "ChartContainer-inside" : ""
}`}
>

<section className="Dashboard_continer">
<h2>Dashboard</h2>
<div className="filter-container">
<label>Date Filter : </label>
<input type="date" onChange={(e) => setSelectedDate(e.target.value)} />
<button onClick={handleFilterSubmit}>Apply Filter</button>
</div>
</section>

</div>

</div>

{/* for Date 
Filter */}


{/*  */}

<div
className={`Parent_relative ${
DashParentContainer ? "DashParentContainer-inside" : ""
}`}
>

<div
className={`div_total_customer all_div ${
Dashcontainer ? "DashContainer-inside" : ""
}`}
>

<img 
src={OrdersDashImg} loading="lazy" alt=""/>
<div>
<h4>Total Orders:</h4>
<h2> {totalcustProducts}</h2>
</div>
</div>

<div
className={`div_earning all_div ${
Dashcontainer ? "DashContainer-inside" : ""
}`}
>

<img src={OrdersDashEarn} loading="lazy" alt="Orders Dashboard" />
<div>
<h4>Total Earning:</h4>
<h2> ₹ {''} {totalAmount}</h2>
</div>
</div>

<div
className={`div_amounts all_div ${
Dashcontainer ? "DashContainer-inside" : ""
}`}
>

<img src={OrdersDashOrdr} loading="lazy" alt="Orders Dashboard" />
<div>
<h4>Total Products:</h4>
<h2>{totalProducts}</h2>
</div>
</div>

<div
className={`div_users all_div ${
Dashcontainer ? "DashContainer-inside" : ""
}`}
>

<img src={OrdersDashUsr} loading="lazy" alt="Orders Dashboard" />
<div>
<h4>Total Users:</h4>
<h2>{totalUsers}</h2>
</div>

</div>
</div>

{/* Duplicate 
Container */}

<div
className={`Parent_relativeChart ${
ChartParentContainer ? "ChartParentContainer-inside" : ""
}`}
>

<div
className={`div_total_customerChart all_divChart ${
ChartContainer ? "ChartContainer-inside" : ""
}`}
>

<LineChart width="100%"></LineChart>
<BarChart></BarChart>
<PieChart></PieChart>

</div>

</div>

</div>

);

}

export default TlPrdctOrdrearn;

