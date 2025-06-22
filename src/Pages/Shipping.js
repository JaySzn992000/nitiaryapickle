import React from "react";
import './Shipping.css';
import ShippImg from "../OtherImages//CustomersShipping.jpg";
import Navbar from "../headers_footer/navbar";
import Header from "../headers_footer/header";

const Shipping = () => {

return (

<div>

<Navbar></Navbar>

<div className="shipp_cs">

<img className="ImgShip" src={ShippImg}></img>

<h1>Shipping Policy</h1>

<p>We know how excited you are 
to receive your favorite pickles, 
and we do our best to deliver them 
fresh and on time!</p>

<h1>Delivery Timeline</h1>

<li>We usually ship within 2-5 working days, depending on your location.</li>
<li>Metro & Tier 1 cities: Delivery in 2-4 working days.</li>
<li>Tier 2, Tier 3 & Rural areas: Delivery in 4-7 working days.</li>

<h1>Shipping Charges</h1>
<li>Free Shipping across India on all orders!</li>
<li>If your order is lost, damaged, or 
undelivered, we'll issue a full refund
or send a replacement.</li>

<h1>Damaged Packages</h1>

<p>If your parcel looks tampered with or damaged, 
please do not accept it. Contact us immediately at
📞 08046163052 or 📧 support@koskii.com with your 
order number, and we'll take care of it. </p>

<h1>Cancellation Policy</h1>

<p>We understand that sometimes you may change your mind.</p>
<h1>How to Cancel:</h1>
<li>You can cancel your order within 24 hours of placing it.</li>
<li>Cancellations after 24 hours are subject to approval 
and may be refunded as a credit voucher only.</li>

<h1>Sale Items</h1>
<li>Discount codes do not apply on sale items.</li>
<li>Items bought on sale are not eligible for 
return or refund.</li>

<h1>Customized Orders</h1>
<p>If you've requested any customizations, 
those orders cannot be canceled, returned, or exchanged, 
unless there's a manufacturing issue.</p>

<h1>Refunds</h1>

<p>Refunds (if eligible) will be processed within 
7 working days to your original payment method. 
During festive seasons or sales, there may be slight 
delays in processing.</p>

</div>

<Header></Header>

</div>

)

}

export default Shipping;