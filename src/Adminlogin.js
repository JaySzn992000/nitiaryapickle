import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Adminlogin.css";

const Adminlogin = ({ setIsLoggedIn }) => {

const [formdata, setFormdata] = useState({
adminuser: "",
adminpass: "",
});


const registerhanlder = (e) => {
setFormdata({ ...formdata, [e.target.name]: e.target.value });

let { name, value } = e.target;
value = value.replace(/\s/g, "");
setFormdata(prev => ({ ...prev, [name]: value }));

}


const [showPassword, setShowPassword] = useState(false);
const navigate = useNavigate();

const submitAdmin = async (e) => {
e.preventDefault();

const { adminuser, adminpass } = formdata;

console.log("Login input:", { adminuser, adminpass });


if (!adminuser.trim() || !adminpass.trim()) {
alert("All fields are required!");
return;
}

if (adminuser.trim().length < 3) {
alert("Username must be at least 3 characters.");
return;
}

if (adminpass.length < 6) {
alert("Password must be at least 6 characters.");
return;
}


try {

// http://localhost:3001/fetchAdmin

const response = await fetch("https://nitiaryapickle.onrender.com/fetchAdmin", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({
adminuser: adminuser.trim(),
adminpass: adminpass.trim(), 
}),

});

const data = await response.json();
console.log("Server response:", data);

if (data.success) {
setIsLoggedIn(true);
localStorage.setItem("isLoggedIn", "true");
localStorage.setItem("loggedInAdmin", JSON.stringify(formdata));
navigate("/DashboardcomXKPbcadafcddcfadacbPKXproductlistsearchdashboard");
} else {
alert(data.message || "Invalid username or password.");
}
} catch (error) {
console.error("Login error:", error);
alert("Server error. Please try again later.");
}
};

const createAccount = () => navigate("/AdminRegisteration");
const AdminForget = () => navigate("/AdminForget");

return (


<div className="admin-login-container">

<form className="admin-login-form" onSubmit={submitAdmin}>

<h3>Sign In</h3>
<p>Enter your email address and password to access admin panel</p>

<div className="form-group">
<h4>Username</h4>
<input
requiredplaceholder="Username"
name="adminuser"
value={formdata.adminuser} className="form-input"
onChange={registerhanlder}
placeholder="Username"
/>
</div>

<div className="form-group">
<h4>Password</h4>
<div className="password-wrapper">
<input
required
placeholder="Password"
value={formdata.adminpass}
name="adminpass"
onChange={registerhanlder}
type={showPassword ? "text" : "password"}
className="form-input"
/>
<span
className="eye-icon"
onClick={() => setShowPassword(!showPassword)}
>
{showPassword ? <FaEyeSlash /> : <FaEye />}
</span>
</div>
</div>

<section>
<h4 onClick={createAccount}>Create Account</h4>
<h4 onClick={AdminForget}>Forget Password</h4>
</section>

<button type="submit" className="login-button">
Login
</button>
</form>

</div>

);
};

export default Adminlogin;
