import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const BarChart = () => {

const [chartData, setChartData] = useState({

options: {
chart: {
id: "monthly-earnings",
toolbar: { show: false },
},
xaxis: {
categories: [],
labels: { rotate: -45 },
},
plotOptions: {
bar: {
horizontal: false,
columnWidth: '55%',
borderRadius: 5,
borderRadiusApplication: 'end',
},
},
dataLabels: {
enabled: false,
},
stroke: {
show: true,
width: 2,
colors: ['transparent'],
},
fill: {
opacity: 1,
},
tooltip: {
y: {
formatter: function (val) {
return "₹ " + val + "";
},
},
},
colors: ["#00BFFF"],
},
series: [
{
name: "Earnings",
data: [],
},
],
});

useEffect(() => {
const fetchCustomerOrders = async () => {

try {

const response = await fetch("https://nitiaryapickle.onrender.com/fetchCutomerOrder");
const data = await response.json();

// Month-wise 
//  grouping

const earningsByMonth = data.products.reduce((acc, item) => {
const dateObj = new Date(item.date);
const month = dateObj.toLocaleString('default', { month: 'short' });
const year = dateObj.getFullYear();
const monthYear = `${month} ${year}`;
acc[monthYear] = (acc[monthYear] || 0) + (item.amount || 0);
return acc;
}, {});

const formattedData = Object.entries(earningsByMonth).map(([monthYear, total]) => ({
monthYear,
total,
}));

setChartData((prevState) => ({
...prevState,
options: {
...prevState.options,
xaxis: {
...prevState.options.xaxis,
categories: formattedData.map((item) => item.monthYear),
},
},
series: [
{
name: "Earnings",
data: formattedData.map((item) => item.total),
},
],
}));
} catch (error) {
console.error("Error fetching data:", error);
}
};

fetchCustomerOrders();
}, [] );

return (


<div>

<div className="chart-container">
<h3 className="ChartsTg">Monthly Earnings by BarChart</h3>
<label>Sales/Revenue</label>
<ReactApexChart
options={chartData.options}
series={chartData.series}
type="bar"
className='PieChart'
height={300}
/>

</div>

</div>

);

};

export default BarChart;
