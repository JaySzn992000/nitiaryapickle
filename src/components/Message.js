import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./Message.css";

const Message = () => {

const [showForm, setShowForm] = useState(false);

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

<img
className="message_icon"
onClick={() => setShowForm(!showForm)}
src="https://cdn-icons-png.flaticon.com/128/9453/9453982.png"
alt=""
loading="lazy"
></img>

{showForm && (
<form onSubmit={sendEmail} className="chatApp_form">
<div></div>
<div>
<h1>
Hi there! <br /> Contact Us
</h1>
<h4>Name</h4>
<input
type="text"
name="name"
placeholder="Your Name"
value={formData.name}
onChange={handleChange}
required
/>{" "}
<br />

<h4>Email</h4>

<input
type="email"
name="email"
placeholder="Your Email"
value={formData.email}
onChange={handleChange}
required
/>{" "}
<br />

<h4>Message</h4>

<input
type="email"
name="recipientEmail"
placeholder="Recipient's Email"
value={formData.recipientEmail}
onChange={handleChange}
required
className="hideInput_Contact messageboxForm"
/>{" "}
<br />

<textarea
name="message"
placeholder="Your Message"
value={formData.message}
onChange={handleChange}
required
id="textBox"
/>{" "}

<br />
<button type="submit">Send Message</button>
{successMessage && (
<p className="success_message">{successMessage}</p>
)}{" "}
</div>
</form>

)}

</div>

);
};

export default Message;
