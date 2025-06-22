import React from "react";
import { Helmet } from "react-helmet";
import MangoPickl1 from "./Slider/picklevideo1.mp4";
import MangoPickl2 from "./Slider/picklevideo2.mp4";
import MangoPickl3 from "./Slider/picklevideo3.mp4";
import MangoPickl4 from "./Slider/picklevideo4.mp4";
import MangoPickl5 from "./Slider/picklevideo5.mp4";
import "./videoslider.css";

const VideoSliderComponent = () => {

const videos = [
MangoPickl2,
MangoPickl3,
MangoPickl4,
MangoPickl1,
MangoPickl5,
];


return (

<div>

<Helmet>
<title>What Our Fans Say - Video Testimonials</title>
<meta
name="description"
content="Watch video testimonials from our fans and hear about their experiences."
/>
<meta
property="og:title"
content="What Our Fans Say - Video Testimonials"
/>
<meta
property="og:description"
content="Watch video testimonials from our fans and hear about their experiences."
/>
<meta property="og:type" content="video.other" />
<meta
property="og:url"
content="https://yourwebsite.com/what-our-fans-say"
/>
</Helmet>

<div className="video_container">
<h2>Our Varietie's of Pickle's</h2>
<section className="video_section_flex">
{videos.map((video, index) => (
<video key={index} muted loop playsInline autoPlay>
<source src={video} type="video/mp4" />
</video>
))}
</section>
</div>
</div>
);

};

export default VideoSliderComponent;
