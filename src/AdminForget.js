import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminForget.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const AdminForget = () => {

const navigate = useNavigate();

const [formData, setFormData] = useState({
adminuser: "",
newPassword: "",
retypePassword: "",
});

const [showPassword, setShowPassword] = useState(false);
const [showRetypePassword, setShowRetypePassword] = useState(false);

const inputHandler = (e) => {
setFormData({ ...formData, [e.target.name]: e.target.value });

let { name, value } = e.target;
value = value.replace(/\s/g, "");
setFormData({ ...formData, [name]: value });

};

const handleResetPassword = async (e) => {
e.preventDefault();
const { adminuser, newPassword, retypePassword } = formData;

if (!adminuser || !newPassword || !retypePassword) {
alert("All Field are Required");
return;
}

if (newPassword.length < 6) {
alert("Password should be atlease 6 character's long");
return;
}

if (newPassword !== retypePassword) {
alert("Password is not same as last");
return;
}

try {
const response = await fetch("https://nitiaryapickle.onrender.com/resetAdminPassword", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({ adminuser, newPassword }),
});

const data = await response.json();

if (data.success) {
alert("Password has been reset successfully !");
navigate("/Adminlogin");
} else {
alert(data.message || "Something went wrong !");
}
} catch (error) {
console.log("Error:", error);
alert("Something went wrong. Please try again !");
}
};

return (

<div className="admin-forget-container">
<form className="admin-forget-form" onSubmit={handleResetPassword}>
<h2>Reset Password</h2>

<p>Enter your email address 
and password to access admin panel</p>

<div className="form-group">
<h3>Username</h3>
<input
type="text"
placeholder="Enter Username"
name="adminuser"
value={formData.adminuser}
onChange={inputHandler}
className="form-input"
maxLength={30}
/>
</div>

<div className="form-group">
<h3>New Password</h3>
<div className="password-wrapper">

<input
type={showPassword ? "text" : "password"}
placeholder="New Password"
name="newPassword"
value={formData.newPassword}
onChange={(e) => {
if (e.target.value.length <= 15) { 
inputHandler(e);
}
}}
/>


<span
className="eye-icon"
onClick={() => setShowPassword(!showPassword)}
>
{showPassword ? <FaEyeSlash /> : <FaEye />}
</span>
</div>
</div>

<div className="form-group">
<h3>Retype Password</h3>
<div className="password-wrapper">
<input
type={showRetypePassword ? "text" : "password"}
placeholder="Retype Password"
name="retypePassword"
value={formData.retypePassword}

className="form-input"
maxLength={15}

onChange={(e) => {
if (e.target.value.length <= 15) { 
inputHandler(e);
}
}}

/>

<span
className="eye-icon"
onClick={() => setShowRetypePassword(!showRetypePassword)}
>
{showRetypePassword ? <FaEyeSlash /> : <FaEye />}
</span>
</div>
</div>

<button type="submit" className="reset-button">
Reset Password
</button>
<br />
<h4 className="backLogin" onClick={() => navigate("/Adminlogin")}>
Back to Login
</h4>

</form>
</div>

);
};

export default AdminForget;
