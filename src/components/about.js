import React from "react";
import Navbar from "../headers_footer/navbar";
import Header from "../headers_footer/header";
import AboutPickle from "../Slider/AboutPickle.png";
import { Helmet } from "react-helmet";
import "./about.css";

const Aboutus = () => {

return (

<div>

<Helmet>
<title>About Us | Pickle - Authentic Handcrafted Pickles</title>
<meta
name="description"
content="Discover the story behind Pickle - your go-to destination for handcrafted, traditional Indian pickles made with fresh ingredients and no preservatives."
/>
<meta
name="keywords"
content="Handmade Pickles, Traditional Indian Pickles, Desi Achar, Homemade Pickle, Authentic Pickles, Mango Pickle, Lemon Pickle"
/>
</Helmet>

{/*  */}

<Navbar></Navbar>

<main className="about_flex_">

<img 
loading="lazy"
className="imgAbout" 
alt="Traditional Indian pickle jar with spices"
src={AboutPickle}></img>

<section>

<h1>About !</h1>
<h2> Handcrafted Pickles & Delightful Flavors </h2>
<p>
{" "}
We've turned our passion for pickles into a flavorful journey.
Specializing in authentic, homemade-style pickles, we bring a burst
of tradition and taste to your table. As a small, independently-run
brand, we focus on quality, freshness, and a personal touch in every
jar. Each batch is made with care, using handpicked ingredients and
time-honored recipes — perfect for those who crave real, desi
flavors with every bite. {" "}
</p>
</section>

</main>


<section className="about_flex_tw">

<p className="about_para">
Celebrating the Taste of Tradition! We specialize in authentic,
handcrafted pickles made using traditional recipes passed down through
generations. What started as a passion for preserving real, desi
flavors has now grown into a trusted brand loved by food lovers across
the country. Each jar of our pickle is a tribute to the rich culinary
heritage of India — made with locally sourced ingredients, home-style
techniques, and no added preservatives. From fiery mango pickles to
tangy lemon blends and everything in between, we bring you the kind of
flavor that feels like home. Whether you're enjoying it with piping
hot parathas, adding a zing to your dal-chawal, or just indulging in a
spoonful straight from the jar, our pickles are sure to bring a smile
to your face.
</p>

<h2>Our Promises</h2>

<article>

<h3>Authentic Taste</h3>
<p>
Every pickle is crafted to preserve the original flavors and aroma of
traditional Indian kitchens.
</p>

<h3>Fresh Ingredients</h3>
<p>
We use sun-ripened fruits, handpicked spices, and cold-pressed oils to
ensure freshness and taste.
</p>

<h3>Homemade Feel, Hygienic Process</h3>
<p>
Our pickles are made in small batches, combining the warmth of
home-style cooking with modern hygiene standards.
</p>

<h3>No Preservatives</h3>
<p>
We believe in keeping it clean — our pickles are 100% natural, with no
artificial preservatives or additives.
</p>

<h3>Pan India Delivery</h3>
<p>
Packed with care and shipped with love — we deliver across India so
you can enjoy your favorite pickle, wherever you are.
</p>

</article>

</section>

{/*  */}

<div className="header-ad">
<Header></Header>
</div>

</div>

);

};

export default Aboutus;
