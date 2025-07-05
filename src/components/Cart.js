import { useLocation, useNavigate } from "react-router-dom";
import CartDeleteItem from "../Images_ToolsSymbols/Delete.jpg";
import React, { useState, useEffect } from "react";
import { removeFromCart } from "../action/action";
import { connect } from "react-redux";
import Navbar from "../headers_footer/navbar";
import Header from "../headers_footer/header";
import axios from "axios";
import "./Cart.css";


const Cart = ({ cart, removeFromCart }) => {

const [quantities, setQuantities] = useState([]);
const [productData, setProductData] = useState([]);

const location = useLocation();
const navigate = useNavigate();

// .. increment 
// quantities ..

useEffect(() => {
const storedQuantities =
JSON.parse(localStorage.getItem("quantities")) || [];
const initialQuantities = cart.map(
(_, index) => storedQuantities[index] || 1
);
setQuantities(initialQuantities);
}, [cart] );


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


const totalAmount = cart.reduce(
(sum, item, index) => sum + item.price * quantities[index],
0
);
const totalProducts =
cart.length === 0
? 0
: quantities.reduce((sum, quantity) => sum + quantity, 0);

const handleRemove = (index) => {
removeFromCart(index);
const newQuantities = quantities.filter((_, i) => i !== index);
setQuantities(newQuantities);
localStorage.setItem("quantities", JSON.stringify(newQuantities));
};

const handleQuantityChange = (index, change) => {
const newQuantities = [...quantities];
newQuantities[index] = Math.max(1, newQuantities[index] + change);
setQuantities(newQuantities);
localStorage.setItem("quantities", JSON.stringify(newQuantities));
};

const asyncProceed = () => {
navigate("/Address", {
state: { loggedInUser: location.state?.loggedInUser, totalAmount,
quantities,
},
});
};

const getProductImagePath = (productId) => {
const product = productData.find((p) => p.id === productId);
return product ? `https://nitiaryapickle.onrender.com${product.file_path}` : "";
};


return (

<div>

<Navbar />

<main id="cart_container">

{/*  */}

{cart && cart.length > 0 ? (

<>

<h1 className="cart_items_h2">My cart</h1>

<section className="flx_cart" role="list">

<ul className="Cart_heads" aria-label="Cart Column Headers">

<li>IMAGE</li>
<li>PRODUCT NAME</li>
<li>UNIT PRICE</li>
<li>ACTION</li>
<li>SIZE</li>
<li>QTY</li>

</ul>

{/*  */}

{cart.map((item, index) => (
<li
key={index}
style={{ listStyle: "none" }}
className="cart_flex"
>

<article className="flex_about">

<img
loading="lazy"
src={getProductImagePath(item.id)}
alt='Homemade and tangy mango pickle'
className="cart-item-image"
/>

</article>

{/*  */}

<div className="Produt_nCart">
<span>In Stock</span> <br></br>
<span>{item.name}</span>
</div>

<div>
₹ {item.price}
</div>

<div className="remove_bntContainer">

<img 
onClick={() => handleRemove(index)}
aria-label={`Remove ${item.name}`}
loading="lazy"
src={CartDeleteItem}
alt=""
style={{ width: "27px", marginTop: "0em", cursor : 'pointer' }}
></img>

</div>

<span> {item.size || "N/A"}</span>

{/*  */}

<div className="second_contain">
<li>
<span>₹ {item.price * quantities[index]}</span>
</li>

<div className="quantity_update" aria-label="Quantity Selector">
<button onClick={() => handleQuantityChange(index, -1)} aria-label="Decrease quantity">
-
</button>
<span>{quantities[index]}</span>
<button onClick={() => handleQuantityChange(index, 1)} aria-label="Increase quantity">
+
</button>
</div>
</div>
</li>

))}


<section className="flex_amount">

<h2>
Total Products: <span>{totalProducts}</span> | Total Amount:
Rs <span>{totalAmount}</span>
</h2>

<button onClick={asyncProceed}>
<i class="fas fa-shopping-cart" aria-hidden="true"></i>
<h4>PLACE ORDER</h4>
</button>

</section>

</section>

</>

) : (

<section className="div_flex">

<h1>Oops! Your cart is empty</h1>

<img
id="cartItem_Img"
loading="lazy"
src="https://www.flavoursguru.com/catalog/view/theme/default/image/empaty-cart.svg"
alt=""
></img>

<p>
Your wishlist seems to be empty. <br /><br />
Let's find something for you.
</p>

</section>

)}

{/*  */}

</main>

<div className="header-ad">
<Header></Header>
</div>

</div>

);
};

//  Passing From
// Reducers 

const mapStateToProps = (state) => ({
cart: state.cart,
});

const mapDispatchToProps = (dispatch) => ({
removeFromCart: (index) => dispatch(removeFromCart(index)),
}) ;

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
