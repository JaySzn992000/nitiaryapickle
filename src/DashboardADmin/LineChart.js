import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const LineChart = () => {

const [chartData, setChartData] = useState({

options: {

chart: {
id: "monthly-earnings-line",
toolbar: { show: false },
},
xaxis: {
categories: [],
labels: { rotate: -45 },
},
stroke: {
curve: "smooth",
width: 2,
},
dataLabels: {
enabled: false,
},
colors: ["#00BFFF"],
},
series: [
{
name: "Earnings",
data: [],
},
],

} ) ;

useEffect(() => {
const customerFetch = async () => {
try {
const response = await fetch("http://192.168.1.4:3001/fetchCutomerOrder");
const data = await response.json();

// Month-wise 
// earnings calculate 

const earningsByMonth = data.products.reduce((acc, item) => {

const dateObj = new Date(item.date);
const month = dateObj.toLocaleString("default", { month: "short" });
const year = dateObj.getFullYear();
const monthYear = `${month} ${year}`; 
acc[monthYear] = (acc[monthYear] || 0) + (item.amount || 0);
return acc;

}, {} ) ;

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
tooltip: {
y: {
formatter: (val) => `₹ ${val}`,
},
},
yaxis: {
labels: {
formatter: (val) => `₹ ${val}`,
},
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

customerFetch();

}, [] );


return (

<div>

<div className="linechart-container">

<h3 className="ChartsTg" >Monthly Earnings by LineChart</h3>
<label>Sales/Revenue</label>

<ReactApexChart
options={chartData.options}
series={chartData.series}
type="line"
height={350}
className='PieChart'
/>
</div>

</div>

);

};

export default LineChart;
