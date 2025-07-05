import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import Filters from "../components/Filters";
import Navbar from "../headers_footer/navbar";
import Filterheader from "../headers_footer/Filterheader";
import { Helmet } from "react-helmet";
import axios from "axios";
import "./Categoriesfruits.css";

const CategoryJackfruit = ({ showFilters = true, limit }) => {

const [allProducts, setAllProducts] = useState([]); 
const [filteredProducts, setFilteredProducts] = useState([]); 
const location = useLocation();
const query = new URLSearchParams(location.search).get("search"); 

useEffect(() => {
axios
.get("https://nitiaryapickle.onrender.com/fetchProductslistBlazers")
.then((response) => {
console.log("Fetched Amla Pickles products:", response.data); 
setAllProducts(response.data); 
setFilteredProducts(
limit ? response.data.slice(0, limit) : response.data
);
})
.catch((error) => {
console.error("Error fetching Amla Pickles products:", error);
});
}, []); 


useEffect(() => {
if (query) {
axios
.get("https://nitiaryapickle.onrender.com/fetchProductslist", {
params: { search: query },
})
.then((response) => {
console.log("Fetched search results:", response.data); 
setAllProducts(response.data); 
setFilteredProducts(
limit ? response.data.slice(0, limit) : response.data
);
})
.catch((error) => {
console.error("Error fetching products with search query:", error);
});
} else {
setFilteredProducts(allProducts);
}
}, [query, allProducts]);

const handleFilterUpdate = (filteredData) => {
setFilteredProducts(filteredData);
};

const limitedProducts = filteredProducts.slice(0, limit);

const [wishlistStatus, setWishlistStatus] = useState({});
const [wishlistCount, setWishlistCount] = useState(0);

const sendToWishlist = (product) => {
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
const productIndex = wishlist.findIndex((item) => item.id === product.id);

if (productIndex === -1) {
wishlist.push(product);
} else {
wishlist.splice(productIndex, 1);
}

localStorage.setItem("wishlist", JSON.stringify(wishlist));

window.dispatchEvent(new Event("storage"));

setWishlistStatus({
...wishlistStatus,
[product.id]: !wishlistStatus[product.id],
});

setWishlistCount(wishlist.length);

const updatedWishlistStatus = {
...wishlistStatus,
[product.id]: !wishlistStatus[product.id],
};
localStorage.setItem(
"wishlistStatus",
JSON.stringify(updatedWishlistStatus)
);
setWishlistStatus(updatedWishlistStatus);
};


return (

<div>

<Helmet>
<title>Amla Pickles | Tangy & Healthy Homemade Achaar - Pickle</title>
<meta
name="description"
content="Discover our handcrafted Amla Pickles made with traditional recipes and zero preservatives. Perfect with every Indian meal!"
/>
<meta
name="keywords"
content="Amla Pickles, Indian Pickles, Homemade Amla Achaar, Healthy Pickles, Tangy Pickles"
/>
<link rel="canonical" href="https://www.pickles.com/amla-pickles" />
</Helmet>

{showFilters && <Navbar />}
{showFilters && (
<Filters
allProducts={allProducts}
onFilterUpdate={handleFilterUpdate}
/>
)}

<div id="flex_filter_product">
<section>
<div className="relative_ProductContainer">
<div className="Filteration_ProductDiv"></div>
<div className="flex_productlist tshirt_LeftAd">
{limitedProducts.map((product, index) => (
<div key={index} className="produclist_divContainer">

<i
onClick={() => sendToWishlist(product)}
className={`fa fa-heart fa-heart_products ${
wishlistStatus[product.id] ? "wishlist-active" : ""
}`}
/>

{/* Link to 
product details */}

<Link to={`/product/${product.id}`}>
<img
src={`https://nitiaryapickle.onrender.com${product.file_path}`}
alt={product.name}
/>
</Link>
<div className="padding_contain">
<div className="flex_inr">

<Link to={`/product/${product.id}`}>
<li>{product.name}</li>
</Link>

<div className="review_Cntnr">
<img id="Review_Img"
loading="lazy"
alt=""
src="https://cdn-icons-png.flaticon.com/128/15853/15853959.png"></img>
<li style={{marginTop : '.5em', marginLeft : '-.2em'}}>|</li>
<li className="fa_Review">{product.review}</li>
</div>

<div className="price_div">
<li className="fa fa-inr"></li>
<li>{product.price}</li>
</div>
</div>
</div>
</div>
))}
</div>
</div>
</section>
</div>

<div className="header_Filter">
{" "}
{showFilters && <Filterheader></Filterheader>}{" "}
</div>

</div>

);
};

export default CategoryJackfruit;
