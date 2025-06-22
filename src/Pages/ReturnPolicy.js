import React from "react";
import Navbar from "../headers_footer/navbar";
import Header from "../headers_footer/header";
import './ReturnPolicy.css';

const ReturnPolicy = () => {

return (

<div>

<Navbar></Navbar>

<div className="return_flex_">

<div>

<h1>Acceptance of Terms</h1>

<p>By accessing or using the Website, App, or any of our services, you agree to be bound by these Terms & Conditions. If you do not agree to these terms, you must not use or access our services.</p>

<h2>User Account & Security</h2>

<p>
{" "}
To use certain features of the platform, you may need to register and create an account. You are solely responsible for maintaining the confidentiality of your login credentials and for all activities that occur under your account.
{" "}
</p>

</div>

</div>

<div className="return_flex_tw">

<h4>No Return, No Exchange Policy</h4>

<p>
All purchases made through Pickle are final. We do not offer returns, exchanges, or refunds under any circumstances unless otherwise required by applicable law.
Please make sure you review all product details before completing a purchase.
</p>

<h2>What Information We Collect</h2>

<h4> Payment Terms</h4>

<p>All transactions must be made in Indian Rupees (INR). We use third-party payment gateways to process payments. Pickle is not responsible for any error, failure, or issue arising from these third-party services.</p>

<h4>Intellectual Property</h4>

<p>All content available on the Website and App, including but not limited to text, graphics, logos, images, software, and trademarks, is the intellectual property of Pickle and is protected by applicable intellectual property laws.</p>


<h4>Contact Information</h4>
<li>For any queries or concerns, you may contact us at:</li>
<li>📧 Email: support@pickle.com</li>
<li>📞 Phone: +91-XXXXXXXXXX</li>

</div>

{/*  */}

<Header></Header>

</div>

)


}

export default ReturnPolicy;