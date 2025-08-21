import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import NavigationClose from "../Logo/CloseTag.png";
import LogoNitiArya from "../Logo/LogoNitiArya.png";

import Heart from "../Images_ToolsSymbols/Heart.jpg";
import Cart from "../Images_ToolsSymbols/Cart.jpg";

import { Helmet } from "react-helmet";
import "./navbar.css";

const Navbar = () => {

// Login user 

const [loggedInUser, setLoggedInUser] = useState(null);
const navigate = useNavigate();
const location = useLocation();

// Login_system 
// Locally storage 

useEffect(() => {
const storedUser = localStorage.getItem("loggedInUser");
if (storedUser) {
setLoggedInUser(JSON.parse(storedUser));
}
}, []);

// .. It's Saves LoggedIn 
// User Details in
// Local Storage of the broswer
// to save users to Login Again 

useEffect(() => {
if (location.state && location.state.loggedInUser) {
const user = location.state.loggedInUser;
setLoggedInUser(user);
localStorage.setItem("loggedInUser", JSON.stringify(user));
}
}, [location.state]);

// Wihslist Count

// Fetch wishlist 
// count from localStorage

useEffect(() => {
const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
setWishlistCount(storedWishlist.length); // Update wishlist count
}, [location] );

// Cart Count

// <NaviGate's>

const navigateEcart = () => {
navigate("/Ecart");
};

const logout = () => {
setLoggedInUser(null);
localStorage.removeItem("loggedInUser");
navigate("/ProductList");
};

const navi = useNavigate();

const naviProductPage = () => {
navi("/ProductList");
};

const profileNavi = useNavigate();

const naviReg = useNavigate();
const naviRegist = () => {
if (!loggedInUser) {
naviReg("/Registeration");
} else if (loggedInUser) {
profileNavi("/Profile");
}
};


const naviorderhistory = useNavigate();

const naviHome = useNavigate();
const navigateHome = () => {
naviHome("/");
};

const orderhistory = () => {
naviorderhistory("/ItemHistory");
};

const naviheartNavi = useNavigate();
const heartNavi = () => {
naviheartNavi("/WishList");
};

const handleWishlist = () => {
naviheartNavi("/WishList");
};


const naviTshirt = useNavigate();
const naviGateTshirt = () => {
naviTshirt("/AloeVeraGel");
};

const naviShirt = useNavigate();
const naviGateShirt = () => {
naviShirt("/BananaPowder");
};

const naviJeans = useNavigate();
const naviGateJeans = () => {
naviJeans("/BeetrootPowder");
};

const naviPants = useNavigate();
const naviGatePants = () => {
naviPants("/KasturiHaldi");
};

const naviSweaters = useNavigate();
const naviGateSweaters = () => {
naviSweaters("/LicoricePowder");
};

const naviTrouser = useNavigate();
const naviGateTrousers = () => {
naviTrouser("/SandalwoodPowder");
};

const naviHoodies = useNavigate();
const naviGateHoodies = () => {
naviHoodies("/HairGrowth");
};

const naviGate = useNavigate();
const naviGateBlazer = () => {
naviGate("/CategoryAavla");
};

const naviShorts = useNavigate();
const naviGateShorts = () => {
naviShorts("/CategoryGhee");
};

const naviProfile = useNavigate();
const navitoAccount = () => {
naviProfile('/Profile')
}

const naviCart = useNavigate();
const naviToCartAccount = () => {
naviCart('/Ecart')
}


const naviContact = useNavigate();
const naviToContactus = () => {
naviContact('/Contactpage')
}

const naviAbout = useNavigate()
const naviToAboutus = () => {
naviAbout('/Aboutus')
}


const NavitoProductlist = useNavigate()

const naviToCollection = () => {
NavitoProductlist('/Productlist')
}

const privacyNavi = useNavigate();
const privacyNavigate = () => {
privacyNavi('/PrivacyPolicy')
}

const navitoLoginPage = useNavigate()
const naviToLogin = () => {
navitoLoginPage('/Registeration')
}

// Open SlideBar 
// In Media Query 

// Function to 
// open the slider

const clickOpen = () => {
const slider = document.querySelector(".navProduct_Slider");

if (slider.classList.contains("close")) {
slider.classList.remove("close");
}

slider.classList.add("active");
};

// Function to 
// close the slider

const CloseTag = () => {
const slider = document.querySelector(".navProduct_Slider");


if (slider.classList.contains("active")) {
slider.classList.remove("active");
}

slider.classList.add("close");
};

// .. Scroll Effect 
// , Navbar ... .

const [scrolled, setScrolled] = useState(false);

useEffect(() => {
const handleScroll = () => {
if (window.scrollY > 0) {
setScrolled(true);
} else {
setScrolled(false);
}
};

window.addEventListener("scroll", handleScroll);
return () => {
window.removeEventListener("scroll", handleScroll);
};
}, [] );

const [afterSearch_prodct, setafterSearch_prodct] = useState(false);
const searchProducts = () => {
setafterSearch_prodct((prevState) => !prevState);
};

const [searchQuery, setSearchQuery] = useState("");

const handleKeyDown = (e) => {
if (e.key === "Enter") {
navigate(`/ProductList?search=${encodeURIComponent(searchQuery)}`);
}
};


const [wishlistCount, setWishlistCount] = useState(0);

useEffect(() => {

const updateWishlistCount = () => {
const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
setWishlistCount(storedWishlist.length);
};

const updateCartCount = () => {
const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
};

updateWishlistCount();
updateCartCount();

window.addEventListener("storage", updateWishlistCount);
window.addEventListener("storage", updateCartCount);

return () => {
window.removeEventListener("storage", updateWishlistCount);
window.addEventListener("wishlistUpdated", updateWishlistCount);
window.removeEventListener("storage", updateCartCount);
};
}, [] );


const cart = useSelector((state) => state.cart);
const cartCount = cart.length;

const naviGateProductsAll = useNavigate()
const seeAllProducts = () => {
naviGateProductsAll('/ProductList')
}


return (

<div>

<Helmet>
<title>Niti Arya - Pickles & More</title>
<meta
name="description"
content="Niti Arya offers a variety of pickles including mango, carrot, garlic, and more. Shop now for fresh and delicious pickles."
/>
<meta name="keywords" content="Pickles, Mango Pickles, Garlic Pickles, Carrot Pickles, Best Pickles, Niti Arya Pickles" />
<meta name="robots" content="index, follow" />
<link rel="canonical" href="http://www.nitiarya.com" />
</Helmet>

<nav className={`Product_navbar ${scrolled ? "scrolled" : ""}`}>

<div className="fa_barsLogo_Container">

<img className="fa fa-bars fa_bars_nav"
onClick={clickOpen}
src="https://cdn-icons-png.flaticon.com/128/5259/5259008.png" ></img>

<img onClick={navigateHome}
className="logo_img" src={LogoNitiArya}
loading="lazy"
alt=""
></img>

<ul className="nav_ul">

{/*  */}

<div className="div_ul">

<li className="hover_products">
<a onClick={naviToCollection}  href="">CATEGORIES</a>

<div className="listing_Products">
<ul>
<li onClick={naviProductPage}>
<a href="">All Products</a>
</li>
<li onClick={naviGateTshirt}>
<a href="">Aloe Vera Gel</a>
</li>
<li onClick={naviGateShirt}>
<a href="">Banana Powder</a>
</li>
<li onClick={naviGateJeans}>
<a href="">Beetroot Powder</a>
</li>
<li onClick={naviGatePants}>
<a href="">Kasturi Haldi</a>
</li>
<li onClick={naviGateSweaters}>
<a href="">Licorice Powder</a>
</li>
<li onClick={naviGateTrousers}>
<a href="">Sandalwood Powder</a>
</li>
<li onClick={naviGateHoodies}>
<a href="">Hair Growth</a>
</li>

{/* <li onClick={naviGateBlazer}>
<a href="">Aavla</a>
</li>

<li onClick={naviGateShorts}>
<a href="">Ghee</a>
</li> */}

</ul>
</div>
</li>
</div>

{/*  */}

<ul className="div_ul">
<li onClick={naviToAboutus}>
<a href="">ABOUT US</a>
</li>
</ul>

{/*  */}

<ul className="div_ul">
<li onClick={naviToContactus}>
<a href="">CONTACT</a>
</li>
</ul>

{/*  */}

</ul>
</div>

{/*  */}

<div className="flex_nav_ProfileSection">

<ul className="nav_profileSection">

<img
onClick={heartNavi}
className="navProfile_img fa fa-heart"
loading="lazy"
alt=""
src={Heart}
></img>

{wishlistCount > 0 && (
<span className="wishlist-count">{wishlistCount}</span>
)}

{/* <i
onClick={naviRegist}
className="navProfile_img user_right fa fa-user"></i> */}

<ul>
<li onClick={naviRegist}>
<a href="">MY ACCOUNT</a>
</li>
</ul>

</ul>


<img 
loading="lazy"
alt=""
onClick={navigateEcart}
src={Cart}
className="fa fa-shopping-cart navProfile_img"
></img>


{cartCount > 0 && <span className="cart-count">{cartCount}</span>}

<ul>
<li className="navProfile_">
<a href="">MY CART</a>
</li>
</ul>

<input
type="text"
value={searchQuery}
onChange={(e) => setSearchQuery(e.target.value)}
onKeyDown={handleKeyDown}
className={`search_products ${
afterSearch_prodct ? "afterSearch_prodct" : ""
}`}
placeholder="Search Our Product"
>
</input>

<i onClick={searchProducts} className="fa fa-search"></i>

<div>

<ul className="navProduct_Slider">
{loggedInUser ? (
<div>
<div className="flex_div_prfle">

{/*  */}

<img
src={NavigationClose}
onClick={CloseTag}
id="CloseTag"
alt=""
loading="lazy"
></img>

{/*  */}

<div className="flex_icon_">

<img
style={{ marginLeft: ".4em" }}
src="https://cdn-icons-png.flaticon.com/128/456/456283.png"
alt=""
loading="lazy"
/>

<li onClick={navitoAccount} style={{ marginLeft: "-.5em" }}>
<a href="">My Account</a>
</li>
</div>
</div>

<div className="navSlider_flex">

<img
src="https://cdn-icons-png.flaticon.com/128/3059/3059486.png"
alt=""
loading="lazy"
/>

<div className="loggedDiv_nameEmail">
<li>
<a href="#">Hi {loggedInUser.name}</a>
</li>
<li>
<a href="#">{loggedInUser.email}</a>
</li>
</div>
</div>


<div className="flex_div_prfle">
<div className="flex_icon_">
<img
src="https://cdn-icons-png.flaticon.com/128/1170/1170678.png"
className="img_pf"
alt=""
loading="lazy"
/>

<li onClick={naviToCartAccount}>
<a href="">SHOP</a>
</li>
</div>


<div className="flex_icon_">
<img style={{width : '27px'}}
src="https://cdn-icons-png.flaticon.com/128/7278/7278792.png"
className="img_pf"
alt=""
loading="lazy"
/>


<li onClick={seeAllProducts}>
<a href="">See All Pickles</a>
</li>

</div>

{/*  */}

<div className="flex_icon_">
<img
src="https://cdn-icons-png.flaticon.com/128/2822/2822682.png"
className="img_pf"
alt=""
loading="lazy"
/>

<li onClick={orderhistory}>
<a href="">ORDER HISTORY</a>
</li>
</div>

{/*  */}

<div className="flex_icon_">

<img
src="https://cdn-icons-png.flaticon.com/128/1077/1077035.png"
className="img_pf"
alt=""
loading="lazy"
/>

<li onClick={handleWishlist}>
<a href="">WISHLIST</a>
</li>

</div>

{/*  */}

<div className="flex_icon_ contact-us">
<img
src="https://cdn-icons-png.flaticon.com/128/11980/11980549.png"
className="img_pf"
alt=""
loading="lazy"
/>

<li onClick={naviToContactus}>
<a href="">CONTACT US</a>
</li>
</div>

{/*  */}

<div className="flex_icon_">
<img
src="https://cdn-icons-png.flaticon.com/128/10348/10348976.png"
className="img_pf"
alt=""
loading="lazy"
/>
<li onClick={privacyNavigate}>
<a href="">PRIVACY POLICY</a>
</li>
</div>

{/*  */}

<div className="sign_out flex_icon_">
<img
src="https://cdn-icons-png.flaticon.com/128/4034/4034329.png"
className="img_pf"
alt=""
loading="lazy"
/>
<li onClick={logout}>
<a href="#">SIGN OUT</a>
</li>
</div>
</div>
</div>
) : (
<p onClick={naviToLogin} className="login_please">Please Login</p>
)}
</ul>
</div>
</div>

</nav>

</div>

);

};

export default Navbar;
