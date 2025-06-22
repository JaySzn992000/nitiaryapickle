import React, { useState, useEffect } from "react";
import Navbar from "./headers_footer/navbar";
import Header from "./headers_footer/header";
import ProfileBG from "./Logo/ProfileBG.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import "./Editform.css";


const EditProfile = () => {

const [loggedInUser, setLoggedInUser] = useState(null);
const [showPassword, setShowPassword] = useState(false); 
const [formdata, setFormdata] = useState({

name: "",
email: "",
password: "",
mobileno: "",
id: "",

});

useEffect(() => {
const storedUser = localStorage.getItem("loggedInUser");
if (storedUser) {
const user = JSON.parse(storedUser);
setLoggedInUser(user);
setFormdata({
name: user.name || "",
email: user.email || "",
password: user.password || "",
mobileno: user.mobileno || "",
id: user.id || "",
});
}

if (location.state && location.state.loggedInUser) {
const user = location.state.loggedInUser;
setLoggedInUser(user);
setFormdata({
name: user.name || "",
email: user.email || "",
password: user.password || "",
mobileno: user.mobileno || "",
id: user.id || "",
});
localStorage.setItem("loggedInUser", JSON.stringify(user));
}
}, [location.state]);


const handleInputChange = (e) => {
const { name, value } = e.target;
setFormdata((prevFormdata) => ({
...prevFormdata,
[name]: value,
}));
};


{/*  */}


const handleSubmitUpdate = async (e) => {

e.preventDefault();

if (!formdata.name.trim()) {
alert("Please enter your full name.");
return;
} else if (!/^[a-zA-Z\s]+$/.test(formdata.name)) {
alert("Name should only contain letters and spaces.");
return;
}

// EMAIL 
// VALIDATION

if (!formdata.email.trim()) {
alert("Please enter your email address.");
return;
} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formdata.email)) {
alert("Please enter a valid email address (example@domain.com).");
return;
}

// PASSWORD 
// VALIDATION

if (!formdata.password.trim()) {
alert("Please enter a password.");
return;
} else if (formdata.password.length < 6) {
alert("Password must be at least 6 characters long.");
return;
} else if (
!/[A-Z]/.test(formdata.password) ||
!/[a-z]/.test(formdata.password) ||
!/[0-9]/.test(formdata.password)
) {
alert("Password must contain uppercase, lowercase, and a number.");
return;
}

// MOBILE
//  VALIDATION

if (!formdata.mobileno.trim()) {
alert("Please enter your mobile number.");
return;
} else if (!/^\d+$/.test(formdata.mobileno)) {
alert("Mobile number must contain only digits.");
return;
} else if (formdata.mobileno.length !== 10) {
alert("Mobile number must be exactly 10 digits.");
return;
}

try {
const response = await fetch("http://localhost:3001/updateform", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify(formdata),
});

if (!response.ok) {
throw new Error("Failed to update user data");
}

const data = await response.json();
alert('Update successfully');
localStorage.setItem("loggedInUser", JSON.stringify(formdata));
} catch (error) {
console.log("Error occurred:", error);
}

};

const togglePasswordVisibility = () => {
setShowPassword(!showPassword);
};


return (

<div>
  
<Navbar></Navbar>

<img className="bgProfile" src={ProfileBG}
alt="Profile Background"
></img>

{/*  */}

<form onSubmit={handleSubmitUpdate} className="Frm_edit">

<h1 className="hOp_edit">{formdata.name.charAt(0)}</h1>

{/*  */}

<div className="flex_containerForm">
<section>
<div>
<h4>FULL NAME</h4>
<input
type="text"
name="name"
value={formdata.name}
onChange={handleInputChange}
maxLength={30}
/>
</div>

<div>
<h4>EMAIL</h4>
<input
type="email"
name="email"
value={formdata.email}
onChange={handleInputChange}
maxLength={50}
/>
</div>
</section>

{/*  */}

<section>

{/*  */}

<div className="password-container">

<h4>PASSWORD</h4>

<div className="password-input-wrapper">

<input
type={showPassword ? "text" : "password"}
name="password"
value={formdata.password}
onChange={handleInputChange}
maxLength={15}
/>

<span 
className="password-toggle"
onClick={togglePasswordVisibility}
>

{showPassword ? <FaEyeSlash /> : <FaEye />}
</span>
</div>

</div>


<div>
<h4>MOB</h4>
<input
type="text"
name="mobileno"
value={formdata.mobileno}
maxLength={10}
onChange={handleInputChange}
/>
</div>
</section>

{/*  */}

</div>

<h4>ID</h4>
<div>
<input type="text" name="id" value={formdata.id} readOnly />
<br></br>
<button type="submit">SAVE</button>
</div>

{/*  */}

</form>

{/*  */}

<div className="header-ad">
<Header></Header>
</div>
</div>

);

};

export default EditProfile;
