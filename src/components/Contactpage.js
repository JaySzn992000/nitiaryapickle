import React, { useState } from "react";
import emailjs from "emailjs-com";
import { Helmet } from "react-helmet";
import Navbar from "../headers_footer/navbar";
import Header from "../headers_footer/header";
import ContactPickle from "../Slider/Contact_Achar1.png";
import "./Contact.css";

const Contactpage = () => {

const [formData, setFormData] = useState({
name: "",
email: "",
recipientEmail: "nitiarya655@gmail.com",
message: "",
});

const [successMessage, setSuccessMessage] = useState("");

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value,
});
};

const sendEmail = (e) => {

e.preventDefault();

if (formData.name.trim().length < 3) {
setSuccessMessage("Name must be at least 3 characters long.");
return;
}

const emailData = {
to_email: formData.recipientEmail,
name: formData.name,
email: formData.email,
message: formData.message,
to_name: formData.name,
reply_to: formData.email,
};

emailjs
.send(
process.env.REACT_APP_EMAILJS_SERVICE_ID,
process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
emailData,
process.env.REACT_APP_EMAILJS_USER_ID
)
.then(
(response) => {
console.log(
"Email sent successfully!",
response.status,
response.text
);
setFormData({
name: "",
email: "",
recipientEmail: "nitiarya655@gmail.com",
message: "",
});
setSuccessMessage("Message has been sent successfully!");
},
(err) => {
console.error("Failed to send email. Error:", err);
setSuccessMessage("Failed to send message. Please try again.");
}
);
};


return (

<div>

<Helmet>
<title>Contact Us | Pickles & More</title>
<meta
name="description"
content="Contact Pickles & for More pickles, Get handcrafted, preservative-free Indian pickles delivered to your doorstep!"
/>
<meta name="keywords" content="contact pickles, Indian pickles, achar, homemade pickle support" />
<meta name="robots" content="index, follow" />
<meta property="og:title" content="Contact Us | Pickles & More" />
<meta
property="og:description"
content="Reach out to Pickles & More for queries, support, or to get our flavorful desi pickles delivered to your home."
/>
<meta
property="og:image"
content="https://yourdomain.com/images/contact-share.jpg"
/>
<meta property="og:url" content="https://yourdomain.com/contact" />
<meta property="og:type" content="website" />
</Helmet>

<Navbar></Navbar>

<main>

<form onSubmit={sendEmail} className="form_contact">

<div>
<img src={ContactPickle} alt="Contact Us for Homemade Pickles" loading="lazy"/>
</div>

<div className="form_div">

<h1>
Hi there! <br/>
Contact Us
</h1>

<input
type="text"
name="name"
placeholder="Your Name"
value={formData.name}
onChange={handleChange}
required
/>{" "}
<br />


<input
type="email"
name="email"
placeholder="Your Email"
value={formData.email}
onChange={handleChange}
required
/>{" "}
<br />


<input
className="hideInput_Contact"
type="email"
name="recipientEmail"
placeholder="Recipient's Email"
value={formData.recipientEmail}
onChange={handleChange}
required
/>{" "}


<br />
<textarea
name="message"
placeholder="Your Message"
value={formData.message}
onChange={handleChange}
required
/>{" "}
<br />
<button type="submit">Send Message</button>
{successMessage && (
<p className="success_message">{successMessage}</p>
)}
</div>

</form>

<section className="about_flex_contct">

<div className="out_location">
<h2>Our Location !</h2>
<h3>From Location to your Home</h3>
<p>
{" "}
We bring you traditional Indian pickles made with fresh ingredients bold spices, and zero preservatives.
From tangy mango to spicy chili every jar is handcrafted with love and full of flavor — just like home.
{" "}
</p>
</div>


<iframe className="iframeMap"
src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28029.119391081964!2d77.2225846743164!3d28.5805734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce3fbb7204c77%3A0x8f6a2b5421dba16e!2sPickles%20%26%20More!5e0!3m2!1sen!2sin!4v1744086766174!5m2!1sen!2sin"
></iframe>

</section>

</main>

<div className="header-ad">
<Header></Header>
</div>

</div>

);
};

export default Contactpage;
