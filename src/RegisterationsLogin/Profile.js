import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../headers_footer/navbar";
import Header from "../headers_footer/header";
import ProfileBG from "../Logo/ProfileBG.jpg";
import "./Profile.css";

const Profile = () => {

const [loggedInUser, setLoggedInUser] = useState(null);

useEffect(() => {
const storedUser = localStorage.getItem("loggedInUser");
if (storedUser) {
setLoggedInUser(JSON.parse(storedUser));
}
}, [] );


const naviGateEdit = useNavigate();

const EditProfile = () => {
naviGateEdit("/EditProfile");
};

const logout = () => {
setLoggedInUser(null);
localStorage.removeItem("loggedInUser");
navigate("/ProductList");
};

const navigate = useNavigate();

const navigateToItemHistory = () => {
navigate("/ItemHistory");
};

const navigateToWishlist = () => {
navigate("/WishList");
};

return (

<div>

<Navbar />

<img className="bgProfile" src={ProfileBG}></img>

<section className="flex_Profile_">

<div>

<div className="flex_lfo">
<div className="n_profile">

{loggedInUser && loggedInUser.name && (

<>

<div className="circle_pr">
<h1 className="prname">{loggedInUser.name.charAt(0)}</h1>
</div>

<div className="edit_flex">

<div>

<h1 className="af_name_user">{loggedInUser.name}</h1>

<div className="flex_prf_">
<i className="fa fa-envelope"></i>
<p>{loggedInUser.email}</p>
</div>

</div>
</div>
</>

)}

</div>
</div>

<div className="profile_navi">
<ul>
<li onClick={navigateToItemHistory}>
<i className="fa fa-history"></i>
Item History
</li>
<li onClick={navigateToWishlist}>
<i className="fa fa-heart"></i>
Wish List
</li>
</ul>
</div>
</div>
</section>

<div className="Sign_out">

<div>
<i class="fas fa-edit"></i>
<p onClick={EditProfile}>Edit</p>
</div>

<div>
<i class="fa fa-sign-out"></i>
<p onClick={logout}>Sign out</p>
</div>
</div>

<div className="header-ad">
<Header></Header>

</div>
</div>

);
};

export default Profile;
