import React, { useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "../headers_footer/navbar";
import Header from "../headers_footer/header";
import "./Registeration.css";

const Registeration = () => {

const [formdata, setformdata] = useState({
name: "",
email: "",
password: "",
mobileno: "",
});


const onsubmit = () => {
    
if (!formdata.name.trim()) {
alert("Please enter your full name.");
return false;
} else if (formdata.name.length < 3) {
alert("Name must be at least 3 characters long.");
}
else if (!/^[a-zA-Z\s]+$/.test(formdata.name)) {
alert("Name should only contain letters and spaces.");
return false;
}

if (!formdata.email.trim()) {
alert("Please enter your email address.");
return false;
} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formdata.email)) {
alert("Please enter a valid email address (example@domain.com).");
return false;
}

if (!formdata.password.trim()) {
alert("Please enter a password.");
return false;
} else if (formdata.password.length < 6) {
alert("Password must be at least 6 characters long.");
return false;
} else if (
!/[A-Z]/.test(formdata.password) ||
!/[a-z]/.test(formdata.password) ||
!/[0-9]/.test(formdata.password)
) {
alert("Password must contain uppercase, lowercase, and a number.");
return false;
}

if (!formdata.mobileno.trim()) {
alert("Please enter your mobile number.");
return false;
} else if (!/^\d+$/.test(formdata.mobileno)) {
alert("Mobile number must contain only digits.");
return false;
} else if (formdata.mobileno.length !== 10) {
alert("Mobile number must be exactly 10 digits.");
return false;
}

return true; 

};


const registerhanlder = (e) => {

setformdata({ ...formdata, [e.target.name]: e.target.value });

let { name, value } = e.target;
if (name === "email" || name === "password") {
value = value.replace(/\s/g, "");
} else {
value = value.replace(/^\s+/, "");
}
setformdata(prev => ({ ...prev, [name]: value }));
}; 

const registeration = async (e) => {
e.preventDefault();

const isValid = onsubmit(); 
if (!isValid) return; 

try {
const response = await fetch("https://nitiaryapickle.onrender.com/registerationPost", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify(formdata),
});

const data = await response.json();

alert(data.message); 

if (data.success) {
setformdata({
name: '',
email: '',
password: '',
mobileno: ''
});
}

} catch (error) {
console.error("Error:", error);
alert("Network error. Please try again.");
}

};

const navigate = useNavigate();
const Signin = () => {
navigate("/Login");
};


return (

<div>

<Navbar></Navbar>

<div className="flex_regis_Container">

<form onSubmit={registeration} className="register_form">
    
<h1>Sign up</h1>

<h3>
Already have an account ? <span onClick={Signin}>Sign in</span>
</h3>

<section className="flex_form">

{/*  */}

<div>
<div>
<h3>Full name*</h3>
<input required
placeholder="Full name"
name="name"
value={formdata.name}
onChange={registerhanlder}
maxLength={30}
></input>
</div>

<div>
<h3>Email*</h3>
<input required
placeholder="Email"
name="email"
value={formdata.email}
onChange={registerhanlder}
maxLength={50}
></input>
</div>
</div>

{/*  */}

<div>
<div>
<h3>Password*</h3>
<input required
placeholder="Password"
name="password"
value={formdata.password}
onChange={registerhanlder}
maxLength={15}
></input>
</div>
<div>
<h3>Mobile*</h3>

<input required
placeholder="Mobile no"
name="mobileno"
value={formdata.mobileno}
onChange={registerhanlder}
maxLength={10}
></input>
</div>
</div>

{/*  */}

</section>

<button onClick={onsubmit} type="submit">SING UP</button>

</form>

</div>

<Header></Header>

</div>

);

};

export default Registeration;
