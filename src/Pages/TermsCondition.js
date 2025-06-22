import React from "react";
import "./TermsCondition.css";
import Navbar from "../headers_footer/navbar";
import Header from "../headers_footer/header";

const TermsCondition = () => {

return (

<div>

<Navbar></Navbar>

<div className="TermsCondition_flx">

<div>
<h1>Terms & Conditions</h1>

<h2> User Eligibility </h2>
<p>
{" "}
By using the Pickle website, app, or any of our services, 
you confirm that you agree to these Terms & Conditions. If you 
do not agree, please do not use our services.{" "}
</p>
</div>
</div>

<div className="TermsCondition_tw">
<h2 id="accTrm">Account Registration & Responsibilities</h2>
<ul>
<li>
You are responsible for maintaining the confidentiality of your login
credentials.
</li>
<li>
All information provided by you must be accurate, complete, and
updated.
</li>
<li>
Pickle reserves the right to suspend or terminate your access if any
information is found to be misleading or false.
</li>
</ul>

<h2>What Information We Collect</h2>

<ul>
<li>
All payments on Pickle shall be made in Indian Rupees (INR) only.
</li>
<li>
Pickle uses third-party payment gateways and is not liable for any
payment failures, delays, or technical issues.
</li>
<li>
Refunds or cancellations, if applicable, will be processed in
accordance with our Refund Policy.
</li>
</ul>

<h2>Changes to Terms</h2>

<p>
Pickle reserves the right to update or modify these Terms at any time.
Continued use of the platform after such changes constitutes your
acceptance of the new Terms.
</p>

<h2 id="hFourTag" >Limitation of Liability</h2>

<p>
Pickle is provided on an “as-is” and “as-available” basis. We do not
guarantee that the platform will be uninterrupted or error-free. In no
event shall Pickle or its affiliates be liable for any indirect,
incidental, or consequential damages.
</p>

<h2 id="hFourTag">Third-Party Links</h2>

<p>
Pickle may contain links to third-party websites or services. We are
not responsible for the content, privacy policies, or practices of
such third parties.
</p>
</div>

<Header></Header>

</div>

);

};

export default TermsCondition;
