import React from "react";
import { useNavigate } from "react-router";
import LogoNitiArya from "../Logo/LogoNitiArya.png";
import { Helmet } from "react-helmet";
import "./header.css";

const Header = () => {
    
const naviHome = useNavigate();

const navigateHome = () => {
naviHome("/");
};


const NavitoProductlist = useNavigate();

const naviToCollection = () => {
NavitoProductlist('/Productlist')
}

const naviAbout = useNavigate()
const naviToAboutus = () => {
naviAbout('/Aboutus')
}

const naviContact = useNavigate();
const naviToContactus = () => {
naviContact('/Contactpage')
}

const cartNavi = useNavigate();
const cartNavigate = () => {
cartNavi('/ECart')
}

const wishlistNavi = useNavigate();
const wishlistNaviGate = () => {
wishlistNavi('/WishList')
}

const privacyNavi = useNavigate();
const privacyNavigate = () => {
privacyNavi('/PrivacyPolicy')
}

const returnPolicy = useNavigate();
const returnPolicyNavi = () => {
returnPolicy('/returnPolicy')
}

const termsAndCOndition = useNavigate();
const termsAndCOnditionNavi = () => {
termsAndCOndition('/TermsCondition')
}

const MyaccountNavi = useNavigate();
const MyaccountNavigate = () => {
MyaccountNavi('/Profile')
}

const ShipptNaviGate = useNavigate();

const ShippNaviM = () => {
ShipptNaviGate('/shipping')
}


return (

<div>

<Helmet>
<title>Niti Arya - Header</title>
<meta
name="description"
content="Explore the best quality pickles at Niti Arya. Shop now for a variety of delicious pickles with fast delivery."
/>
<meta name="keywords" content="pickles, Niti Arya, buy pickles, best quality pickles" />
<meta name="robots" content="index, follow" />
<link rel="canonical" href="http://www.yoursite.com/" />
</Helmet>

<header className="normal_header">

<div className="div_header">

<div className="header_dv">

<img className="nMheader_dvLogo"
onClick={navigateHome}
loading="lazy"
src={LogoNitiArya} alt="logo"></img>

</div>

{/*  */}

<ul>
<h3>Quick Links</h3>
<li onClick={naviToCollection}><a>Shop our Pickles</a></li>
<li onClick={naviToAboutus}><a>About us</a></li>
<li onClick={naviToContactus}><a>Contact us</a></li>
</ul>

{/*  */}

<ul>
<h3>Terms & Info</h3>
<li onClick={privacyNavigate}><a>Privacy Policy</a></li>
<li onClick={returnPolicyNavi}><a>Return Policy</a></li>
<li onClick={termsAndCOnditionNavi}><a>Terms & Conditions</a></li>
</ul>

{/*  */}

<ul>
<h3>Shop Basket</h3>
<li onClick={cartNavigate}><a>Cart</a></li>
<li onClick={wishlistNaviGate}><a>wishList</a></li>
<li onClick={ShippNaviM}><a>Shipping</a></li>
</ul>

{/*  */}

<ul>
<h3><a></a>Account Settings</h3>
<li onClick={MyaccountNavigate}><a>My Account Info</a></li>

<section className="socialMedia">

<a href='https://www.instagram.com/niti.aryapickle655/'>
<img src="https://cdn-icons-png.flaticon.com/128/15707/15707749.png"
alt="instagram"
loading="lazy"
></img>
</a>

<a href="https://www.facebook.com/checkpoint/disabled/?next">
<img src="https://cdn-icons-png.flaticon.com/128/5968/5968764.png"
alt="facebook"
loading="lazy"
></img>
</a>

<a href='https://api.whatsapp.com/send/?phone=919661199811&text&type=phone_number&app_absent=0'>
<img src="https://cdn-icons-png.flaticon.com/128/174/174879.png"
alt="whatsapp"
loading="lazy"
></img>
</a>

</section>

</ul>

{/*  */}

</div>
</header>
</div>

);

};

export default Header;
