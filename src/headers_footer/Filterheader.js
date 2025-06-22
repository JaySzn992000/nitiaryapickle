import React from "react";
import { useNavigate } from "react-router";
import LogoNitiArya from "../Logo/LogoNitiArya.png";
import "./Filterheader.css";

const Filterheader = () => {

const naviHome = useNavigate();

const navigateHome = () => {
naviHome("/");
};

const NavitoProductlist = useNavigate()

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

<header className="headerFilter">

{/*  */}

<div className="flex_Container_Filter">
<div className="header_dv">

<img className="header_dvLogo"
onClick={navigateHome}
src={LogoNitiArya}
loading="lazy"
alt="logo">
</img>

</div>

{/*  */}

<section className="div_header_Filter">

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

</section>

{/*  */}

</div>
</header>
</div>

);

};

export default Filterheader;
