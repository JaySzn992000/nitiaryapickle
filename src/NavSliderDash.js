import React from "react";
import DashboardNav from "./DashboardNav";
import DashboardSlider from "./DashboardSlider";
import { useState } from "react";

const NavSliderDash = () => {

const [sidebarOpen, setSidebarOpen] = useState(true);
const [navContainer,setnavContainer] = useState(false);

const toggleSidebar = () => {
setSidebarOpen((prevState) => !prevState);
setnavContainer(prevState => !prevState);
};


return (

<div>

<DashboardNav toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen}
navContainer={navContainer}
></DashboardNav>
<DashboardSlider sidebarOpen={sidebarOpen} />
    
</div>

)

}

export default NavSliderDash;