import React from "react";
import Navbar from "../headers_footer/navbar";
import Header from "../headers_footer/header";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {

return (

<div>

<Navbar></Navbar>

<div className="privacy_flex_">
<div>
<h1>Privacy Policy</h1>

<h2> Handcrafted Pickles & Delightful Flavors </h2>
<p>
{" "}
Welcome to Pickles! We value your trust and are committed to
protecting your privacy. This Privacy Policy outlines how we
collect, use, store, share, and safeguard your personal information
when you visit or interact with our website www.pickles.com
("Website"). By using our Website, you agree to the terms of this
Policy.{" "}
</p>
</div>
</div>

<div className="privacy_flex_tw">
<p>
Celebrating the Taste of Tradition! We specialize in authentic,
handcrafted pickles made using traditional recipes passed down through
generations. What started as a passion for preserving real, desi
flavors has now grown into a trusted brand loved by food lovers across
the country. Each jar of our pickle is a tribute to the rich culinary
heritage of India — made with locally sourced ingredients, home-style
techniques, and no added preservatives. From fiery mango pickles to
tangy lemon blends and everything in between, we bring you the kind of
flavor that feels like home. Whether you're enjoying it with piping
hot parathas, adding a zing to your dal-chawal, or just indulging in a
spoonful straight from the jar, our pickles are sure to bring a smile
to your face.
</p>

<h2>What Information We Collect</h2>

<section className="section_dvifrst">
<div className="section_div">
<ul>
<li>
Personal Info: Name, contact number, email address,
delivery/billing addresses, etc.
</li>
<li>Transaction Info: Order details, purchase history, etc.</li>
<li>
Communication: Emails, chats, and WhatsApp messages with Pickles.
</li>
</ul>
</div>

<div>
<h4>How We Use Your Information</h4>
<ul>
<li>Process and deliver your orders</li>
<li>Provide customer support</li>
<li>Improve our services and website</li>
<li>Send updates, offers, and product info</li>
<li>Prevent fraud and ensure safe transactions</li>
<li>Comply with legal obligations</li>
</ul>
</div>
</section>

<div>
<h4>Third Party Links & Ads</h4>
<p>
Our website may contain links, ads, or services from third parties
that we don't control. We're not responsible for their privacy
practices, content, or actions. You access them at your own risk,
and we're not liable for any loss or damage caused.
</p>
</div>
</div>

{/*  */}

<Header></Header>

</div>

);

};

export default PrivacyPolicy;
