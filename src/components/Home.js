import React, { useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "../headers_footer/navbar";
import Header from "../headers_footer/header";
import BottomFavcomp from "../componentsBoot/bottomFavcomp";
import DeliveryBanner from "../OtherImages/DeliveryBanner.jpeg";
import Contactus from "./Contactus";
import VideoSliderComponent from "../videoslider";
import TestimonialSlider from "./Testimonial";
import Slider from "../slider";
import { Helmet } from "react-helmet";
import Message from "./Message";
import emailjs from "emailjs-com";
import "./ProductListmodule.css";
import "./Home.css";
import Pickles from "../Products/Pickle";
import CategoryMangoes from "../Products/CategoryMangoes";
import CategoryChilli from "../Products/CategoryChilli";
import CategoryMixed from "../Products/CategoryMixed";

const Home = () => {

const [showFilters, setShowFilters] = useState(false);

const [formData, setFormData] = useState({
email: "",
recipientEmail: "nitiarya655@gmail.com",
message: "",
});

const [successMessage, setSuccessMessage] = useState("");

const sendEmail = (e) => {
e.preventDefault();

const emailData = {
to_email: formData.recipientEmail,
name: formData.email,
email: formData.email,
message: formData.message,
to_name: formData.email,
reply_to: formData.email,
};

emailjs
.send(
process.env.REACT_APP_EMAILJS_SERVICE_ID,
process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
emailData,
process.env.REACT_APP_EMAILJS_USER_ID
)
.then(
(response) => {
console.log(
"You have successfully subscribe !",
response.status,
response.text
);
setFormData({
email: "",
recipientEmail: "nitiarya655@gmail.com",
message: "",
});
setSuccessMessage("Message sent successfully!");
},
(err) => {
console.error("Failed to send email. Error:", err);
setSuccessMessage("Failed to send message. Please try again.");
}
);
};

const naviGateProductsAll = useNavigate()
const seeAllProducts = () => {
naviGateProductsAll('/ProductList')
}

return (

<div>

<Helmet>
<title>Buy Best Homemade Pickles Online | Pickles & More</title>
<meta
name="description"
content="Explore 100+ delicious homemade pickles including mango, garlic, carrot & more. Fast delivery across India."
/>
<meta
name="keywords"
content="Pickles, Homemade Achaar, Mango Pickle, Buy Pickles Online, Indian Pickles"
/>
<link rel="canonical" href="https://yourdomain.com" />
<meta property="og:title" content="Pickles & More - Authentic Homemade Pickles" />
<meta property="og:description" content="Discover tasty and hygienically packed pickles. Subscribe for updates and offers." />
<meta property="og:image" content="https://yourdomain.com/assets/og-image.jpg" />
<meta property="og:url" content="https://yourdomain.com" />
<meta name="robots" content="index, follow" />
</Helmet>


<Navbar />

<Slider />

<div className="btn_trending">
<h2>The Achar Shelf</h2>

<section>
<button>Khatta Aam</button>
<button>Teekha Mirchi</button>
<button>Masaledar Gajar</button>
</section>
</div>


<div className="tshirt_Left">
<Pickles showFilters={showFilters} limit={10}></Pickles>
</div>


<div className="Icon_ItemsHome">
<div>
<img src="https://cdn-icons-png.flaticon.com/512/2884/2884902.png" 
loading="lazy"
alt="100+ pickle's"></img>
<section>
<h4>100+ Pickle's</h4>
<p>For Every Meal & Mood</p>
</section>
</div>

<div>
<img src="https://www.flavoursguru.com/catalog/view/theme/default/image/Home/rated-icon.png" 
loading="lazy"
alt="Rated 4.8*"></img>
<section>
<h4>Rated 4.8*</h4>
<p>1000+ Customer's</p>
</section>
</div>

<div>
<img src="https://www.flavoursguru.com/catalog/view/theme/default/image/Home/egg-less.png" 
loading="lazy"
alt="fresh & Desi"></img>
<section>
<h4>100%</h4>
<p>Fresh & Desi</p>
</section>
</div>

<div>
<img src="https://www.flavoursguru.com/catalog/view/theme/default/image/Home/fast-delivery.png" 
loading="lazy"
alt="fast Delivery"></img>
<section>
<h4>Fast Delivery</h4>
<p>Across Multiple Cities</p>
</section>
</div>
</div>

{/*  */}

<p className="p_head">
Limited Time Only - Get 12% Off Your Favorite Pickles !
</p>

<div className="Catelog_Items">
<div>
<img src="https://www.girveda.com/cdn/shop/articles/regular-ghee-vs-butter-vs-gir-cow-desi-ghee-which-is-ideal-for-you-331491.jpg?v=1727869085" 
loading="lazy"
alt="Desi Ghee"></img>
<h4>Desi Ghee</h4>
</div>

<div>
<img src="https://www.vegrecipesofindia.com/wp-content/uploads/2021/04/garlic-pickle.jpg" 
loading="lazy"
alt="Garlic"></img>
<h4>Garlic</h4>
</div>

<div>
<img src="https://vellankifoods.com/cdn/shop/files/allam_mamidi_ginger_mango_pickle_a1459065-18d2-461b-9fc7-f82febc74c5c.jpg?v=1689761372" 
loading="lazy"
alt="Ginger"></img>
<h4>Ginger</h4>
</div>

<div>
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKW8llhABgvbzBKcQU-lSYDTJt0e3J38ht6A&s" 
loading="lazy"
alt="Radish"></img>
<h4>Radish</h4>
</div>

<div>
<img src="https://krushikendra.com/image/cache/catalog/A%20new/Jackfruit-pickle-500x500.png" 
loading="lazy"
alt="Jackfruit"></img>
<h4>Jackfruit</h4>
</div>

<div>
<img src="https://jampanifoods.com/wp-content/uploads/2024/02/Raw-Banana.jpg" 
loading="lazy"
alt="Banana"></img>
<h4>Banana</h4>
</div>

<div>
<img src="https://aahaaramonline.com/wp-content/uploads/2020/02/Kakarakaya_Nilava_Pachadi_1.jpg" 
loading="lazy"
alt="Bitter"></img>
<h4>Bitter</h4>
</div>

<div>
<img src="https://brandwin.in/wp-content/uploads/2024/12/46-2.png" 
loading="lazy"
alt="Sudh Ghee"></img>
<h4>Sudh Ghee</h4>
</div>
</div>

{/*  */}

<button onClick={seeAllProducts} className="seeLLProducts">See All</button>

<div className="Bst_sell">
<h2>Top-Rated Achaar's</h2>
<p>Packed with Love</p>
</div>

<div id="bottomFav_comp">
<BottomFavcomp />
</div>


{/*  */}

<div className="Catelog_Items Catelog_ItemsScnd">

<div>
<img src="https://cinnamonsnail.com/wp-content/uploads/2023/07/Mango-pickle-feature-2.jpg" 
loading="lazy"
alt="mango"></img>
<h4>Mango</h4>
</div>

<div>
<img src="https://cinnamonsnail.com/wp-content/uploads/2023/07/Carrot-pickle-06.jpg" 
loading="lazy"
alt="carrot"></img>
<h4>Carrot</h4>
</div>

<div>
<img src="https://static.toiimg.com/thumb/57645740.cms?imgsize=519869&width=800&height=800" 
loading="lazy"
alt="lemon"></img>
<h4>Lemon</h4>
</div>

<div>
<img src="https://www.vegrecipesofindia.com/wp-content/uploads/2018/04/red-chilli-pickle-recipe-1.jpg"
loading="lazy" 
alt="chilli"></img>
<h4>Chilli</h4>
</div>

<div>
<img src="https://i.ytimg.com/vi/4ja6jpULsqM/hqdefault.jpg" 
loading="lazy"
alt="amla"></img>
<h4>Amla</h4>
</div>

<div>
<img src="https://5.imimg.com/data5/XX/TT/MY-6852104/tamarind-pickle-500x500-500x500.jpg" 
loading="lazy"
alt="ilmi"></img>
<h4>Imli</h4>
</div>

<div>
<img src="https://www.ceepeespices.in/wp-content/uploads/2021/10/Mixed-Pickle.png" 
loading="lazy"
alt="mixed"></img>
<h4>Mixed</h4>
</div>

<div>
<img src="https://i0.wp.com/lovelaughmirch.com/wp-content/uploads/2021/01/Gobi-Gajar-Shalgum-ka-Achar-1.jpg?fit=797%2C996&ssl=1" 
loading="lazy"
alt="cauliflower"></img>
<h4>Cauliflower</h4>
</div>
</div>

{/*  */}

<div className="btn_trending">

<h2>On-Trend Pickle's</h2>
<section>
<button>Chatpata Nimbu</button>
<button>Lasooni Lahsun</button>
<button>Krispy Karela</button>
</section>
</div>

<div className="tshirt_Left">
<Pickles showFilters={showFilters} limit={5}></Pickles>
</div>


<button onClick={seeAllProducts} 
className="seeLLProducts">See All </button>

{/*  */}

<img src={DeliveryBanner}
alt=""
loading="lazy"
className="DlvyImg"
></img>

<VideoSliderComponent></VideoSliderComponent>

{/*  */}

<Contactus></Contactus>

<a
href='https://api.whatsapp.com/send/?phone=919661199811&text&type=phone_number&app_absent=0'>
<img
className="whatsapp_message"
src="https://cdn-icons-png.freepik.com/256/3983/3983877.png?semt=ais_hybrid"
alt=""
loading="lazy"
></img>
</a>

{/*  */}

<div className="Secure_ordering">
<img src="https://www.flavoursguru.com/catalog/view/theme/default/image/Home/new-images/payment-source.png" 
alt=""
loading="lazy"/>
</div>

<img src="https://kapilanandagro.com/wp-content/uploads/2023/04/Pickles.jpg" 
loading="lazy"
alt="Variety of Homemade Pickles" />

<h2 id="what_Cust">What Our Customers Says !</h2>

<TestimonialSlider></TestimonialSlider>

<div className="subscribe_k">
<div className="subscribe_flx">
<img src="https://www.flavoursguru.com/catalog/view/theme/default/image/Home/new-images/email-icon.svg" 
alt="" loading="lazy" />
<div>
<h2>Let's Stay Connected</h2>
<p>Subscribe here</p>
</div>
</div>


<form onSubmit={sendEmail}>

{successMessage && (
<p className="success_message">{successMessage}</p>

)}

<div className="subscribe_flx">

<input
type="email"
name="email"
placeholder="Enter your email here..."
value={formData.email}
onChange={(e) =>
setFormData({
...formData,
email: e.target.value,
message: e.target.value,
})
} required />
<button type="submit">Subscribe</button>
</div>

</form>

</div>

{/*  */}

<Message></Message>

<Header />

</div>

);

};

export default Home;
