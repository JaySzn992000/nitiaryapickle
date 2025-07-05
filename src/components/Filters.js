import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import NavigationClose from "../Logo/CloseTag.png";
import "./Filters.css";


const Filters = ({ allProducts, onFilterUpdate }) => {

const [selectedNames, setSelectedNames] = useState([]);
const [selectedSizes, setSelectedSizes] = useState({
general: [],
jeansPantsShorts: [],
}) ;


const [minPrice, setMinPrice] = useState(0);
const [maxPrice, setMaxPrice] = useState(2000);
const [isPriceChanged, setIsPriceChanged] = useState(false);

const [filters_div, setfilters_div] = useState(false);

const navigate = useNavigate();
const location = useLocation();

const query = new URLSearchParams(location.search).get("search");

useEffect(() => {

let filtered = allProducts;

if (isPriceChanged) {
filtered = filtered.filter(
(product) => product.price >= minPrice && product.price <= maxPrice
);
}

if (selectedSizes.general.length > 0) {
filtered = filtered.filter((product) =>
selectedSizes.general.some((size) => product.sizes.includes(size))
);
}

if (selectedSizes.jeansPantsShorts.length > 0) {
filtered = filtered.filter((product) =>
selectedSizes.jeansPantsShorts.some((size) =>
product.sizes.includes(size)
)
);
}

onFilterUpdate(filtered);
}, [minPrice, maxPrice, isPriceChanged, selectedSizes, allProducts, query]);

const handlePriceChange = () => {
setIsPriceChanged(true);
};

const handleSizeChange = (size, type) => {
setSelectedSizes((prevSizes) => {
const newSizes = { ...prevSizes };
if (newSizes[type].includes(size)) {
newSizes[type] = newSizes[type].filter((s) => s !== size);
} else {
newSizes[type] = [...newSizes[type], size];
}
return newSizes;
});

};

const handleNameChange = (name) => {
setSelectedNames((prevNames) => {
let newNames;
if (prevNames.includes(name)) {
newNames = prevNames.filter((n) => n !== name);
} else {
newNames = [...prevNames, name];
}

const newQuery =
newNames.length > 0
? `?search=${encodeURIComponent(newNames.join(","))}`
: "";
navigate(`${newQuery}`);
return newNames;
});
};

const ClickFilter = () => {
setfilters_div(true);
};

const FilterClose = () => {
setfilters_div(false);
};


return (


<div>

<div id="div_filter">

<img
loading="lazy"
onClick={ClickFilter}
className="filter_"
src="https://cdn-icons-png.flaticon.com/128/10609/10609382.png"
alt=""
></img>


</div>

<div className={`filters ${filters_div ? "filters_AfContainer" : ""}`}>

<img
loading="lazy"
alt=""
src={NavigationClose}
id="Product_CloseTag"
onClick={FilterClose}
></img>

{/* Product 
Type Filter */}

<div>

<div className="priceContainer">

<h4 id="priceRange">Price Range :</h4>

<li className="maxMin">
{" "}
₹ {minPrice} - ₹{maxPrice}
</li>

<input
type="range"
min="0"
max="1000"
step="10"
value={minPrice}
onChange={(e) => {
setMinPrice(Number(e.target.value));
handlePriceChange();
}}
style={{ width: "90%" }}
/>

<input
type="range"
min="0"
max="1000"
step="10"
value={maxPrice}
onChange={(e) => {
setMaxPrice(Number(e.target.value));
handlePriceChange();
}}
style={{ width: "90%" }}
/>

</div>

<h4>Collections :</h4>

<div>
{[
"Mango Pickle",
"Lemon Pickle",
"Chilli Pickle",
"Mixed Pickle",
"Garlic Pickle",
"Gajar Pickle",
"Jackfruit Pickle",
].map((name) => (
<label key={name}>
<input
id="chck_box"
type="checkbox"
value={name}
checked={selectedNames.includes(name)}
onChange={() => handleNameChange(name)}
/>

<div
style={{
display: "flex",
alignItems: "center",
justifyContent: "space-between",
width: "85%",
cursor: "pointer",
}}
>
{name}
</div>
</label>
))}
</div>
</div>

{/* Price 
Filter */}

<div>
<div></div>
</div>

<div>
<div></div>
</div>
</div>
</div>

);

};

export default Filters;