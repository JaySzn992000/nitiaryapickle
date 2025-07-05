import React, { useState, useEffect } from "react";
import CartDeleteItem from "../Images_ToolsSymbols/Delete.jpg";
import EmptyCart from "../Images_ToolsSymbols/Empty-cart.png";
import Navbar from "../headers_footer/navbar";
import Header from "../headers_footer/header";
import axios from "axios";
import "./WishList.css";

const WishList = () => {

const [wishlist, setWishlist] = useState([]);
const [productData, setProductData] = useState([]);

useEffect(() => {
const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
setWishlist(storedWishlist);
}, [] );


const handleRemove = (index) => {
const newWishlist = wishlist.filter((_, i) => i !== index);
setWishlist(newWishlist);
localStorage.setItem("wishlist", JSON.stringify(newWishlist));

window.dispatchEvent(new Event("wishlistUpdated"));
};


// Fetch WishList

useEffect(() => {
const fetchProductData = async () => {
try {
const response = await axios.get(
"https://nitiaryapickle.onrender.com/fetchProductslist"
);
setProductData(response.data);
} catch (error) {
console.log("Error fetching products:", error);
}
};

fetchProductData();
}, [] );

const getProductImagePath = (productId) => {
const product = productData.find((p) => p.id === productId);
return product ? `https://nitiaryapickle.onrender.com${product.file_path}` : "";
};


return (

<div>

<Navbar />

<ul className="wishlist">
{wishlist.length > 0 && (
<div className="flx_Wish_list">
<h2 className="whistlist_h2">My wishlist</h2>

<ul>
<li>IMAGE</li>
<li>PRODUCT NAME</li>
<li>UNIT PRICE</li>
<li>ACTION</li>
</ul>
</div>

)}

{/*  */}

{wishlist && wishlist.length > 0 ? (
<ul>
{wishlist.map((item, index) => (
<li
key={index}
style={{ listStyle: "none" }}
className="wishlist_item"
>

<div className="wishlist_details">

{/*  */}

<div>
<img
src={getProductImagePath(item.id)}
alt={item.name}
className="cart-item-image"
loading="lazy"
/>
</div>

{/*  */}

<div>
<li className="inStock">
In Stock
</li>
<li className="Product-name">{item.name}</li>
</div>

<div>
<li>₹{item.price}</li>
</div>

<div className="li_trash_hrt">
<img
style={{
width: "29px",
marginTop: "0em",
cursor: "pointer",
}}
src={CartDeleteItem}
onClick={() => handleRemove(index)}
loading="lazy"
alt=""
></img>
</div>

<div> {/*  */} </div>

</div>
</li>
))}
</ul>
) : (
<div>
<div className="div_flex_whishlist">
<h1>Oops ! Your WhishList is empty </h1>
<img className="EmptyCartImg" src={EmptyCart}></img>
<p>
{" "}
Your wishlist seems to be empty. <br></br>
Lets find something for you.{" "}
</p>
</div>
</div>
)}
</ul>

<div className="header-ad">
<Header></Header>
</div>

</div>

);

};

export default WishList;
