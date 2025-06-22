import React from "react";
import "./Topnav.css";

const Topnav = () => {

  return (
    <div className="Top_nav">
      <div className="Top_nav-right">
        <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
          <img src="https://cdn-icons-png.flaticon.com/128/15707/15707749.png"></img>
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
          <img src="https://cdn-icons-png.flaticon.com/128/5968/5968764.png"></img>
        </a>
        <a href="https://wa.me/917903964881" target="_blank" rel="noreferrer">
          <img src="https://cdn-icons-png.flaticon.com/128/174/174879.png"></img>
        </a>
      </div>
    </div>

  );
};

export default Topnav;
