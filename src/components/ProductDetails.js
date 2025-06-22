import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { addToCart } from "../action/action";
import Navbar from "../headers_footer/navbar";
import Header from "../headers_footer/header";
import Zoom from "react-medium-image-zoom";
import Slider from "react-slick";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import "./ProductDetails.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-medium-image-zoom/dist/styles.css";
import axios from "axios";


const ProductDetails = ({ addToCart, cart }) => {

const { category, id } = useParams();
const navigate = useNavigate();
const [arrayStore, setArrayStore] = useState(null);
const [selectedSize, setSelectedSize] = useState(null);
const [priceMultiplier, setPriceMultiplier] = useState(1); 
const [cartCount, setCartCount] = useState(cart.length);
const [mainImage, setMainImage] = useState("");
const [pincode, setPincode] = useState("");
const [message, setMessage] = useState("");


useEffect(() => {

fetch(`http://localhost:3001/products/${id}`)
.then(res => res.json())
.then(data => {
});

}, [id] );


useEffect(() => {
const fetchProduct = async () => {
try {
const response = await axios.get(
"http://localhost:3001/fetchProductslist"
);
const data = response.data;
const product = data.find((product) => product.id === parseInt(id));
setArrayStore(product);
setMainImage(product.file_path);
} catch (error) {
console.log("Error fetching product:", error);
}
};

fetchProduct();
}, [id] );


const handleAddToCart = () => {
if (arrayStore && selectedSize) {
const isProductInCart = cart.some(
(item) => item.id === arrayStore.id && item.size === selectedSize
);


if (isProductInCart) {
alert("This product with the selected size is already in your cart.");
} else {
const productToAdd = {
...arrayStore,
size: selectedSize,
price: arrayStore.price * priceMultiplier,
originalPrice: arrayStore.price,
priceMultiplier: priceMultiplier
};


addToCart(productToAdd, selectedSize);
setCartCount(cartCount + 1);
localStorage.setItem(`cart-added-${id}`, JSON.stringify(true));
alert("Product added to cart!");
}
} else {
alert("Please select a size before adding to cart.");
}
};

const handleGoToCart = () => {
navigate("/ECart");
};

const handleSizeChange = (size, index) => {
setSelectedSize(size);
setPriceMultiplier(index + 1); 
};

const handleThumbnailClick = (imagePath) => {
setMainImage(imagePath);
};


if (!arrayStore) {
return <div>Product not found</div>;
}

const sizes = arrayStore.sizes ? arrayStore.sizes.split(",") : [];

const sliderSettings = {
dots: true,
infinite: true,
speed: 500,
slidesToShow: 1,
slidesToScroll: 1,
arrows: false,
};


const handlePincodeChange = (e) => {
setPincode(e.target.value);
};


const handleCheck = () => {
const pincodePattern = /^[1-9][0-9]{5}$/;
if (!pincodePattern.test(pincode)) {
setMessage("Not Available for Delivery");
return;
}

const randomDays = Math.floor(Math.random() * (4 - 3 + 1)) + 7;
setMessage(`Delivery available in ${randomDays} days`);
};


return (

<div>

<Helmet>
<title>Premium Homemade Pickles - Authentic Taste | Pickle</title>
<meta
name="description"
content="Shop premium homemade pickles made with traditional recipes and fresh ingredients. Pickle brings you authentic Indian achar at your doorstep."
/>
<meta
name="keywords"
content="Pickle, Homemade Pickles, Indian Achar, Organic Pickles, Traditional Pickles, Buy Pickle Online"
/>
<meta property="og:title" content="Buy Premium Homemade Pickles | Pickle" />
<meta
property="og:description"
content="Explore the authentic flavors of India with our range of handmade pickles. No preservatives, just pure taste."
/>
<meta
property="og:image"
content="https://yourdomain.com/images/pickle-default.jpg"
/>
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Pickle" />
</Helmet>


<Navbar cartCount={cartCount} />

<div className="product-details">

<div className="mobile-slider">
<Slider {...sliderSettings}>
<div>

<img
className="product_img"
src={`http://localhost:3001${arrayStore.file_path}`}
alt=''
loading="lazy"
/>
</div>
<div>

<img
className="product_img"
src={`http://localhost:3001${arrayStore.file_path1}`}
alt=''
loading="lazy"
/>
</div>
<div>

<img
className="product_img"
src={`http://localhost:3001${arrayStore.file_path2}`}
alt=''
loading="lazy"
/>
</div>
<div>

<img
className="product_img"
src={`http://localhost:3001${arrayStore.file_path3}`}
alt=''
loading="lazy"
/>
</div>
</Slider>

</div>

{/* Thumbnails for 
desktop view */}


<div className="thumbnails-container">
<img
className="thumbnail"
src={`http://localhost:3001${arrayStore.file_path1}`}
alt="home made pickles"
loading="lazy"
onClick={() => handleThumbnailClick(arrayStore.file_path1)}
/>

<img
className="thumbnail"
src={`http://localhost:3001${arrayStore.file_path2}`}
alt="ingredients used pickles"
loading="lazy"
onClick={() => handleThumbnailClick(arrayStore.file_path2)}
/>

<img
className="thumbnail"
src={`http://localhost:3001${arrayStore.file_path3}`}
alt="customized pickles"
onClick={() => handleThumbnailClick(arrayStore.file_path3)}
loading="lazy"
/>
</div>


<div className="product-img-container">

{/* Main image 
with zoom */}

<Zoom>
<img
className="product_img"
src={`http://localhost:3001${mainImage}`}
alt={arrayStore.name}
loading="lazy"
/>
</Zoom>
</div>


<div className="second_div">
<section>
<h1>{arrayStore.name}</h1>

<h2 className="Scnd_hTg">
INR
<span>
{ } ₹{ }
{selectedSize
? (arrayStore.price * priceMultiplier)
: arrayStore.price
}
</span>
</h2>

<h2 className="stckTg"> In Stock 
{ } <span>{arrayStore.stock}</span> 
</h2>
<p>Select Size</p>

</section>


<div className="size_chart">
{sizes.map((size, index) => (
<button
id="btnsize"
key={size}
onClick={() => handleSizeChange(size, index)}
className={selectedSize === size ? "selected" : ""}
>
{size}
</button>
))}

</div>


<div className="pincode_flex">
<img
src="https://cdn-icons-png.flaticon.com/128/446/446075.png"
alt=""
loading="lazy"
/>

<input
type="text"
value={pincode}
onChange={handlePincodeChange}
placeholder="Enter pin code to check delivery"
className="pincodechecker"
maxLength={6}
/>

<button onClick={handleCheck} className="pinCode_checkerbtn">
Check
</button>
</div>

<p id="delivery_msg">{message}</p>

<div className="flex_btnADD_CART">
<button onClick={handleAddToCart} id="btn" className="add_crt">

<img
className="iconDetails"
src="https://www.flavoursguru.com/catalog/view/theme/default/image/cart-icon.svg"
alt=""
loading="lazy"
></img>
ADD TO CART
</button>


<button className="go-toCart" id="btn" onClick={handleGoToCart}>
<img
className="iconDetails"
src="https://www.flavoursguru.com/catalog/view/theme/default/image/order-now.svg"
loading="lazy"
alt=""
></img>
GO TO CART
</button>
</div>

<br/>
</div>

</div>

<div className="descproduct">

<h2>Description</h2>

<p style={{marginTop : '-1.5em'}} className="prdctDetails">

<br></br>

{arrayStore.description}

</p>

</div>

<Header />

</div>

);
};

const mapStateToProps = (state) => ({
cart: state.cart,
});

export default connect(mapStateToProps, { addToCart })(ProductDetails);

