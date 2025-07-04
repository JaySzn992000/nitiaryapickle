import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import Filterheader from "../headers_footer/Filterheader";
import Navbar from "../headers_footer/navbar";
import Filters from "./Filters";
import axios from "axios";
import { Helmet } from "react-helmet";
import "./ProductListmodule.css";

const ProductList = ({ products }) => {

const [filteredProducts, setFilteredProducts] = useState([]);
const [allProducts, setAllProducts] = useState([]);
const [wishlistCount, setWishlistCount] = useState(0);
const [wishlistStatus, setWishlistStatus] = useState({});
const [cartCount, setCartCount] = useState(0);
const [arrayStore, setArrayStore] = useState([]);

useEffect(() => {
const storedWishlistStatus =
JSON.parse(localStorage.getItem("wishlistStatus")) || {};
setWishlistStatus(storedWishlistStatus);

axios
.get("https://nitiaryapickle.onrender.com/fetchProductslist")
.then((response) => {
setArrayStore(response.data);
setFilteredProducts(response.data);
})

.catch((error) => {
console.error("Error fetching data:", error);
});
}, [] );


const location = useLocation();
const query = new URLSearchParams(location.search).get("search");
useEffect(() => {
if (query) {
axios
.get("https://nitiaryapickle.onrender.com/fetchProductslist", {
params: { search: query },
})
.then((response) => {
setAllProducts(response.data);
setFilteredProducts(response.data);
})
.catch((error) => {
console.error("Error fetching products:", error);
});
} else {
axios
.get("https://nitiaryapickle.onrender.com/fetchProductslist")
.then((response) => {
setAllProducts(response.data);
setFilteredProducts(response.data);
})
.catch((error) => {
console.error("Error fetching all products:", error);
});
}
}, [query] );


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
} );

// Update 
// wishlist count

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

const handleFilterUpdate = (filtered) => {
setFilteredProducts(filtered);
};

const slugify = (text) => {
return text
.toLowerCase()
.replace(/[^a-z0-9]+/g, '-')   
.replace(/(^-|-$)/g, '');      
};


return (

<div>

<Helmet>
<title>Explore Pickle Products | Authentic & Delicious Pickles Online</title>
<meta
name="description"
content="Discover a wide variety of hand-crafted, delicious pickles made with traditional recipes. Buy the best pickles online at Pickle."
/>
<meta
name="keywords"
content="buy pickles online, handmade pickles, Indian pickles, organic achar, pickle products"
/>
<meta property="og:title" content="Authentic Pickles Collection | Pickle" />
<meta
property="og:description"
content="Taste the tradition with our authentic pickle range. Shop online for spicy, sweet, and sour pickles delivered to your door."
/>
</Helmet>

<Navbar wishlistCount={wishlistCount} cartCount={cartCount} />

<Filters allProducts={allProducts} onFilterUpdate={handleFilterUpdate} />

<div id="flex_filter_product">

<section>
<div className="realative_ProductContainer">
<div className="Filteration_ProductDiv"></div>
<div className="flex_productlist">
{filteredProducts.map((productlist) => (
<div key={productlist.id} className="produclist_divContainer">
<i
onClick={() => sendToWishlist(productlist)}
className={`fa fa-heart fa-heart_products ${
wishlistStatus[productlist.id] ? "wishlist-active" : ""
}`}
>

{" "}

</i>

{/*  */}

<Link to={`/products/${slugify(productlist.name)}/${productlist.id}`}>

<img
src={`https://nitiaryapickle.onrender.com${productlist.file_path}`}
alt={productlist.name}
loading="lazy"
/>

</Link>

{/*  */}

<div className="padding_contain">
<div className="flex_inr">

{/*  */}

<Link to={`/products/${slugify(productlist.name)}/${productlist.id}`}>
<li>{productlist.name}</li>
</Link>

{/*  */}

<div className="review_Cntnr">
<img id="Review_Img"
src="https://cdn-icons-png.flaticon.com/128/15853/15853959.png"></img>
<li style={{marginTop : '.5em', marginLeft : '-.2em'}}>|</li>
<li className="fa_Review">{productlist.review}</li>
</div>


<div className="price_div">
<li className="fa fa-inr"></li>
<li className="fa_Price">{productlist.price}</li>
</div>

</div>
</div>
</div>
))}

</div>
</div>
</section>
</div>

<Filterheader></Filterheader>

</div>

);

};

export default ProductList;