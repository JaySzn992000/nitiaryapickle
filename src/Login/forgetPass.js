import React, { useState } from "react";
import Navbar from "../headers_footer/navbar";
import Header from "../headers_footer/header";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router";
import "./forgetPass.css"; 
import "./Login.css";


const ForgetPass = () => {

const [formdata, setformdata] = useState({
email: "",
password: "",
retypePassword: "",
});

const [message, setMessage] = useState("");
const [emailVerified, setEmailVerified] = useState(false);

const [showPassword, setShowPassword] = useState(false);
const [showRetypePassword, setShowRetypePassword] = useState(false);


const inputgetHandler = (e) => {
setformdata({ ...formdata, [e.target.name]: e.target.value });

let { name, value } = e.target;
value = value.replace(/\s/g, "");
setformdata(prev => ({ ...prev, [name]: value }));

};

const verifyEmail = async () => {

if (!formdata.email.trim()) {
setMessage("Email is required.");
return;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (!emailRegex.test(formdata.email)) {
setMessage("Please enter a valid email address.");
return;
}


try {
const response = await fetch("https://nitiaryapickle.onrender.com/verifyemail", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({
email: formdata.email,
}),
});

const text = await response.text();
console.log("Response:", text);

let data;
try {
data = JSON.parse(text);
} catch (error) {
console.error("Failed to parse JSON:", error);
setMessage("Invalid response from server");
return;
}

if (response.status === 200) {
setEmailVerified(true);
setMessage("Email verified ! Please reset your password.");
} else {
setMessage(data.message);
}
} catch (error) {
setMessage("An error occurred");
console.error(error);
}
};

const resetPasswordHandler = async (e) => {

e.preventDefault();

const password = formdata.password;
const retypePassword = formdata.retypePassword;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;


if (!password.trim()) {
setMessage("Please enter your password.");
return;
}

if (!passwordRegex.test(password)) {
setMessage (
"Password must be at least 6 characters and include uppercase, lowercase, and a number."
);
return;
}

if (!retypePassword.trim()) {
setMessage("Please retype your password.");
return;
}


if (formdata.password !== formdata.retypePassword) {
setMessage("Passwords do not match");
return;
}


try {
const response = await fetch("https://nitiaryapickle.onrender.com/resetpassword", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({
email: formdata.email,
password: formdata.password,
}),
});

const text = await response.text();
console.log("Response:", text);

let data;
try {
data = JSON.parse(text);
} catch (error) {
console.error("Failed to parse JSON:", error);
setMessage("Invalid response from server");
return;
}

if (response.status === 200) {
setMessage(data.message);
} else {
setMessage(data.message || "An error occurred");
}
} catch (error) {
setMessage("An error occurred");
console.error(error);
}
};

return (

<div>

<Navbar />

<form onSubmit={resetPasswordHandler} id="logged_form">

<h2>Forget Password</h2>

<h4>Email</h4>
<input
placeholder="Email"
name="email"
onChange={inputgetHandler}
value={formdata.email}
maxLength={50}
/>

<button id="very_btn" type="button" onClick={verifyEmail}>
Verify Email
</button>

{emailVerified && (
<>

<h4>Create Password</h4>

<div className="password-field">

<input
placeholder="Password"
name="password"
onChange={inputgetHandler}
value={formdata.password}
type={showPassword ? "text" : "password"}
maxLength={15}
/>

<span
className="eye-icon"
onClick={() => setShowPassword(!showPassword)}
>

{showPassword ? <FaEyeSlash /> : <FaEye />}

</span>

</div>

<br />

<h4>Retype Password</h4>

<div className="password-field">

<input
required
placeholder="Retype Password"
name="retypePassword"
onChange={inputgetHandler}
value={formdata.retypePassword}
type={showRetypePassword ? "text" : "password"}
maxLength={15}
/>

<span
className="eye-icon"
onClick={() => setShowRetypePassword(!showRetypePassword)}
>

{showRetypePassword ? <FaEyeSlash /> : <FaEye />}

</span>

</div>

<br />

<button id="rstBtn"
type="submit">Reset Password</button>
</>

)}

</form>

{message && (
<div className="message_forget">
<p>{message}</p>
</div>
)}

<Header />

</div>

);
};

export default ForgetPass;
