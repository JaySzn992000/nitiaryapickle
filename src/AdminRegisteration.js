import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import './AdminRegisteration.css';

const AdminRegistration = () => {

const navigate = useNavigate();

const [formData, setFormData] = useState({
adminuser: "",
adminpass: "",
});

const [showPassword, setShowPassword] = useState(false);

const inputHandler = (e) => {
setFormData({ ...formData, [e.target.name]: e.target.value });

let { name, value } = e.target;
value = value.replace(/\s/g, "");
setFormData({ ...formData, [name]: value });

};

const handleRegistration = async (e) => {
e.preventDefault();

const { adminuser, adminpass } = formData;
const usernamePattern = /^(?=.*[0-9_.]).{3,}$/;


if (!adminuser.trim() || !adminpass.trim()) {
alert("All fields are required!");
return;
}


if (!usernamePattern.test(adminuser.trim())) {
alert("Username must be at least 3 characters and include at least one number or special character (_ or .)");
return;
}


if (adminuser.trim().length < 3) {
alert("Username must be at least 3 characters long.");
return;
}

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;

if (!passwordRegex.test(adminpass)) {
alert(
"Password must be at least 6 characters long and include uppercase, lowercase, number, and special character."
);
return;
}

try {
const response = await fetch("https://picklewebsite.onrender.com/registerAdmin", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({
adminuser: adminuser.trim(),
adminpass: adminpass.trim(),
}),
});

const data = await response.json();

if (data.success) {
alert("Admin registered successfully!");
navigate("/Adminlogin");
} else {
alert(data.message || "Something went wrong!");
}
} catch (error) {
console.log("Error:", error);
alert("Something went wrong. Please try again.");
}
};

return (


<div className="admin-registration-container">

<form className="admin-registration-form" onSubmit={handleRegistration}>
<h2>Admin Registration</h2>
<p>Enter your email address and password to access admin
panel
</p>
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
<h3>Password</h3>
<div className="password-wrapper">
<input
type={showPassword ? "text" : "password"}
placeholder="Enter Password"
name="adminpass"
value={formData.adminpass}
onChange={inputHandler}
className="form-input"
maxLength={15}
/>
<span
className="eye-icon"
onClick={() => setShowPassword(!showPassword)}
>
{showPassword ? <FaEyeSlash /> : <FaEye />}
</span>
</div>
</div>

<button type="submit" className="register-button">
Register
</button>
<br />
<h4 className="backLogin" onClick={() => navigate("/Adminlogin")}>
Back to Login
</h4>
</form>
</div>

);
};

export default AdminRegistration;
