import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import Filters from "../components/Filters";
import Navbar from "../headers_footer/navbar";
import Filterheader from "../headers_footer/Filterheader";
import { Helmet } from "react-helmet";
import axios from "axios";
import "./Pickle.css";

const Pickle = ({ showFilters = true, limit }) => {

const [allProducts, setAllProducts] = useState([]);
const [filteredProducts, setFilteredProducts] = useState([]);
const location = useLocation();
const query = new URLSearchParams(location.search).get("search");

useEffect(() => {
axios
.get("https://picklewebsite.onrender.com/fetchProductslist")
.then((response) => {
setAllProducts(response.data);
setFilteredProducts(limit ? response.data.slice(0, limit) : response.data);
})
.catch((error) => {
console.error("Error fetching products:", error);
});
}, []);

useEffect(() => {
if (query) {
axios
.get("https://picklewebsite.onrender.com/fetchProductslist", {
params: { search: query },
})
.then((response) => {
setAllProducts(response.data);
setFilteredProducts(limit ? response.data.slice(0, limit) : response.data);
})
.catch((error) => {
console.error("Error with search query:", error);
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

const updatedWishlistStatus = {
...wishlistStatus,
[product.id]: !wishlistStatus[product.id],
};
setWishlistStatus(updatedWishlistStatus);
localStorage.setItem("wishlistStatus", JSON.stringify(updatedWishlistStatus));
setWishlistCount(wishlist.length);
};

return (

<div>
<Helmet>
<title>Fresh Mangoes | Premium Quality Mango Pickles for Sale</title>
<meta
name="description"
content="Taste the tangy and spicy flavor of our homemade mango pickles. Made with fresh ingredients and traditional recipes"
/>
<meta
name="keywords"
content="Mango Pickle, Homemade Pickle, Spicy Mango Pickle, Buy Mango Pickle, Traditional Mango Pickle"
/>
<link rel="canonical" href="https://www.pickles.com/mangoes" />
</Helmet>

{showFilters && <Navbar />}
{showFilters && (
<Filters allProducts={allProducts} onFilterUpdate={handleFilterUpdate} />
)}

<div id="products_grid_wrapper">
<section>
<div className="product_grid_container">
<div className="filter_spacing_div"></div>
<div className="product_cards_wrapper">
{limitedProducts.map((product, index) => (
<div key={index} className="single_product_card">

<i
onClick={() => sendToWishlist(product)}
className={`fa fa-heart wishlist_icon ${
wishlistStatus[product.id] ? "active_wishlist" : ""
}`}
/>

<Link to={`/product/${product.id}`}>
<img
src={`https://picklewebsite.onrender.com${product.file_path}`}
alt={product.name}
className="product_image"
/>
</Link>

<div className="product_info_container">
<div className="info_inner">
<Link to={`/product/${product.id}`}>
<li className="product_title">{product.name}</li>
</Link>

<div className="review_section">
<img
src="https://cdn-icons-png.flaticon.com/128/15853/15853959.png"
loading="lazy"
alt="review"
className="review_icon"
/>
<li className="review_separator">|</li>
<li className="review_text">{product.review}</li>
</div>

<div className="price_section">
<li className="fa fa-inr price_icon"></li>
<li className="product_price">{product.price}</li>
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
{showFilters && <Filterheader />}
</div>
</div>

);
};

export default Pickle;
