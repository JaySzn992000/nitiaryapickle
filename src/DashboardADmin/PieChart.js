import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const PieChart = () => {

const [series, setSeries] = useState([]);
const [labels, setLabels] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
const fetchData = async () => {

try {
const response = await fetch("https://picklewebsite.onrender.com/fetchCutomerOrder");
const data = await response.json();

if (!data.products || !Array.isArray(data.products)) {
throw new Error("Invalid data format");
}

// Group earnings 
// by month

const monthlyEarnings = {};
data.products.forEach(item => {
const dateObj = new Date(item.date);
const month = dateObj.toLocaleString('default', { month: 'short', year: 'numeric' });
monthlyEarnings[month] = (monthlyEarnings[month] || 0) + (item.amount || 0);
});

// Sort months 
// chronologically

const sortedMonths = Object.keys(monthlyEarnings).sort((a, b) => {
return new Date(a) - new Date(b);
});


// Prepare data 
// for the chart

const calculatedSeries = sortedMonths.map(month => monthlyEarnings[month]);
const calculatedLabels = sortedMonths.map(month => {
const earnings = monthlyEarnings[month];
return `${month} (₹${earnings.toLocaleString()})`;
});

setSeries(calculatedSeries);
setLabels(sortedMonths); 
setLoading(false);
} catch (error) {
console.error("Error fetching data:", error);
setLoading(false);
}
};

fetchData();

}, [] );


const options = {
chart: {
type: 'pie',
},
labels: labels,
tooltip: {
y: {
formatter: function(value) {
return `₹ ${value.toLocaleString()}`;
}
}
},
legend: {
position: 'right',
formatter: function(seriesName, opts) {
return `${seriesName}: ₹ ${opts.w.globals.series[opts.seriesIndex].toLocaleString()}`;
}
},
responsive: [{
breakpoint: 480,
options: {
chart: {
width: 300
},
legend: {
position: 'bottom'
}
}
}]
};

if (loading) {
return <div>Loading chart data...</div>;
}

if (series.length === 0) {
return <div>No data available for the chart.</div>;
}


return (


<div className="PieChart-container">

<h3 className="ChartsTg" >Monthly Earnings by PieChart</h3>
<label>Sales/Revenue</label>

<ReactApexChart 
options={options}
series={series}
type="pie"
className='PieChart'
id='PieChrt'
height={320}
/>

</div>

);

};

export default PieChart;