import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom";
import './AdminUpdate.css';

const AdminUpdate = () => {

const [formdata, setFormdata] = useState({
adminuser: "",
adminpass: "",
});

const [errors, setErrors] = useState({});
const [showPassword, setShowPassword] = useState(false);
const [loggedInAdmin, setLoggedInAdmin] = useState(null);

useEffect(() => {
const storedAdmin = localStorage.getItem("loggedInAdmin");
if (storedAdmin) {
const admin = JSON.parse(storedAdmin);
setLoggedInAdmin(admin);
setFormdata({
adminuser: admin.adminuser || "",
adminpass: admin.adminpass || "",
});
}
}, []);

const handleInputChange = (e) => {
const { name, value } = e.target;
setFormdata((prevFormdata) => ({
...prevFormdata,
[name]: value,
}));
setErrors({ ...errors, [name]: "" });

const cleanedValue = value.replace(/\s/g, "");

setFormdata((prevFormdata) => ({
...prevFormdata,
[name]: cleanedValue,
}));

};

const validateForm = () => {
const newErrors = {};
if (formdata.adminuser.trim().length < 3) {
newErrors.adminuser = "Username must be at least 3 characters";
}
if (formdata.adminpass.trim().length < 6) {
newErrors.adminpass = "Password must be at least 6 characters";
}
setErrors(newErrors);
return Object.keys(newErrors).length === 0;
};

const handleSubmitUpdate = async (e) => {
e.preventDefault();
if (!validateForm()) return;

try {
const response = await fetch("https://picklewebsite.onrender.com/updateAdminSimple", {
method: "POST",
headers: {
"Content-Type": "application/json",
},
body: JSON.stringify({
olduser: loggedInAdmin.adminuser,
adminuser: formdata.adminuser,
adminpass: formdata.adminpass,
}),
});

const data = await response.json();

if (!response.ok || !data.success) {
throw new Error(data.message || "Failed to update admin");
}

localStorage.setItem(
"loggedInAdmin",
JSON.stringify({
adminuser: formdata.adminuser,
adminpass: formdata.adminpass,
})
);

alert("Admin profile updated successfully!");

} catch (error) {
console.error("Error:", error);
alert(error.message || "Update failed.");
}
};

const togglePasswordVisibility = () => {
setShowPassword(!showPassword);
};


const navigate = useNavigate();

useEffect(() => {
const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

if (!isLoggedIn) {
navigate("/adminlogin");
}
}, [navigate] );


return (

<div>

{loggedInAdmin ? (

<form className="admin-adminUpdate-form" onSubmit={handleSubmitUpdate}>

<h2>Update Profile</h2>
<p id="adminupdatePTg">Enter your email address and 
password to access admin panel
</p>

<div className="form-group">
<label>Username</label>
<input
type="text"
name="adminuser"
value={formdata.adminuser}
onChange={handleInputChange}
required
className={`form-input ${errors.adminuser ? "input-error" : ""}`}
placeholder="Enter new username"
maxLength={30}
/>
{errors.adminuser && (
<p className="error-text">{errors.adminuser}</p>
)}
</div>

<div className="form-group password-group">
<label>Password</label>
<div className="password-input-wrapper">
<input
type={showPassword ? "text" : "password"}
name="adminpass"
value={formdata.adminpass}
onChange={handleInputChange}
required
className={`form-input ${errors.adminpass ? "input-error" : ""}`}
placeholder="Enter new password"
maxLength={15}
/>
<span className="eye-icon" onClick={togglePasswordVisibility}>
{showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
</span>
</div>
{errors.adminpass && (
<p className="error-text">{errors.adminpass}</p>
)}
</div>

<button type="submit" className="register-button">
Update
</button>
</form>
) : (
<p>Please login !</p>
) }
</div>
);

};

export default AdminUpdate;
