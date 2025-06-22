import React, { useState } from "react";
import emailjs from "emailjs-com";
import ContactPickle from '../Slider/Contact_Achar.jpeg';
import "./Contact.css";

const Contactus = () => {

const [formData, setFormData] = useState({
name: '',
email: '',
recipientEmail: 'nitiarya655@gmail.com', 
message: '',
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

emailjs.send(
process.env.REACT_APP_EMAILJS_SERVICE_ID,
process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
emailData,
process.env.REACT_APP_EMAILJS_USER_ID
)
.then((response) => {
console.log('Email sent successfully!', response.status, response.text);
setFormData({
name: '',
email: '',
recipientEmail: 'nitiarya655@gmail.com',
message: '',
});
setSuccessMessage("Message has been sent successfully!");
}, (err) => {
console.error('Failed to send email. Error:', err);
setSuccessMessage("Failed to send message. Please try again.");
});
};

return (

<div>

<form onSubmit={sendEmail} className="form_contact">

<figure>          

<img
loading="lazy"
src={ContactPickle} alt="" />

</figure>

<div>

<h1>
Hi there! <br />
Contact Us 
</h1>

<input
type="text"
name="name"
placeholder="Your Name"
value={formData.name}
onChange={handleChange}
required
/> <br />

<input
type="email"
name="email"
placeholder="Your Email"
value={formData.email}
onChange={handleChange}
required
/> <br />

<input
className="hideInput_Contact"
type="email"
name="recipientEmail"
placeholder="Recipient's Email"
value={formData.recipientEmail}
onChange={handleChange}
required
/> <br />

<textarea
name="message"
placeholder="Your Message"
value={formData.message}
onChange={handleChange}
required
/> <br /> 

<button type="submit">Send Message</button>

{successMessage && (
<p className="success_message">{successMessage}</p>
)}

</div>
</form>

</div>

);
};

export default Contactus;
