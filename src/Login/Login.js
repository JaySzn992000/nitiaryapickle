import React, { useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "../headers_footer/navbar";
import Header from "../headers_footer/header";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import "./Login.css";

const Login = () => {

const [formdata, setformdata] = useState({
email: "",
password: "",
});

const [showPassword, setShowPassword] = useState(false); 
const [loggedInUser, setLoggedInUser] = useState(null);

const inputgetHanlder = (e) => {
setformdata({ ...formdata, [e.target.name]: e.target.value });

let { name, value } = e.target;
if (name === "email" || name === "password") {
value = value.replace(/\s/g, "");
} else {
value = value.replace(/^\s+/, "");
}
setformdata(prev => ({ ...prev, [name]: value }));

};

const naviGate = useNavigate();

const loginHanlder = async (e) => {
e.preventDefault();

if (!formdata.email.trim()) {
alert("Please enter your email.");
return;
} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formdata.email)) {
alert("Please enter a valid email address.");
return;
}

if (!formdata.password.trim()) {
alert("Please enter your password.");
return;
} else if (formdata.password.length < 6) {
alert("Password must be at least 6 characters long.");
return;
}

try {
const response = await fetch("https://picklewebsite.onrender.com/fetchlogin", {
method: "POST",
headers: {
"Content-type": "application/json",
},
body: JSON.stringify(formdata),
});

const data = await response.json();

const user = data.find(
(user) =>
user.email === formdata.email && user.password === formdata.password
);

if (user) {
setLoggedInUser(user);
naviGate("/ProductList", { state: { loggedInUser: user } });
} else {
alert("Invalid email or password.");
}
} catch (error) {
console.log("Error", error);
alert("Something went wrong. Please try again later.");
}
};

const naviForgt = useNavigate();
const clickHandler = () => {
naviForgt("/ForgetPass");
};


return (

<div>
<Navbar />

<form onSubmit={loginHanlder} id="logged_form">
<h2>Customer Login</h2>

<h4>Email Address</h4>
<input
placeholder="Email Address"
name="email"
onChange={inputgetHanlder}
value={formdata.email}
maxLength={50}
required
/>

<h4>Password</h4>
<div className="password-wrapper">
<input
placeholder="Password"
name="password"
onChange={inputgetHanlder}
value={formdata.password}
type={showPassword ? "text" : "password"}
required
maxLength={15}
/>
<span
className="eye-icon"
onClick={() => setShowPassword(!showPassword)}
>
{showPassword ? <FaEyeSlash /> : <FaEye />}
</span>
</div>

<h4 id="fg_pass" onClick={clickHandler}>
Forgot Password ?
</h4>
<button type="submit">Login</button>
</form>

{loggedInUser && (
<div>
<h2>Your Account</h2>
<p>Email: {loggedInUser.email}</p>
<p>Name: {loggedInUser.name}</p>
<p>Mobile no: {loggedInUser.mobileno}</p>
</div>
)}

<Header />
</div>

);
};

export default Login;
