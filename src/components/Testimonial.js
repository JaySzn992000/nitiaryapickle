import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './Testimonial.css'; 


const testimonials = [

{
text: "Maine aam ka achaar order kiya tha aur taste bilkul ghar jaisa tha! Packaging bhi tight thi, bilkul leak nahi hua.",
name: "Suman Verma",
profession: "Homemaker",
img: "https://img.freepik.com/free-photo/young-woman-foreground_23-2147653634.jpg?ga=GA1.1.558633422.1741516213&w=740"},
{
text: "Bahut din baad itna tasty nimbu ka achaar khaya. Mummy ke haathon jaise swaad. Definitely firse order karunga.",
name: "Rohit Mehra",
profession: "Software Engineer",
img: "https://img.freepik.com/free-photo/worldface-pakistani-guy-white-background_53876-14466.jpg?ga=GA1.1.558633422.1741516213&semt=ais_hybrid&w=740"
},
{
text: "Maine gift ke liye pickle mangwaya tha aur sabko bahut pasand aaya. Delivery bhi time pe ho gayi. Great experience!",
name: "Neha Rajput",
profession: "Teacher",
img: "https://img.freepik.com/free-photo/indian-woman-posing-cute-stylish-outfit-camera-smiling_482257-122351.jpg?ga=GA1.1.558633422.1741516213&w=740"
},
{
text: "Main regular customer hoon inka. Chilli pickle sabse best hai! Thoda spicy hai but full taste wala.",
name: "Ajay Chauhan",
profession: "Restaurant Owner",
img: "https://img.freepik.com/free-photo/front-view-smiley-man-seaside_23-2149737022.jpg?ga=GA1.1.558633422.1741516213&semt=ais_hybrid&w=740"
},
{
text: "Organic mango pickle liya tha — no preservatives aur taste bhi authentic. Health conscious log ke liye perfect!",
name: "Dr. Mohit Sharma",
profession: "Nutritionist",
img: "https://img.freepik.com/free-photo/portrait-handsome-young-man-looking-camera_23-2148130371.jpg?ga=GA1.1.558633422.1741516213&w=740"
}
];

const TestimonialSlider = () => {

const settings = {
dots: true,
infinite: true,
speed: 800,
autoplay: true,
autoplaySpeed: 2000,
slidesToShow: 4,
slidesToScroll: 4,
responsive: [
{ breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 3 } },
{ breakpoint: 600, settings: { slidesToShow: 2, slidesToScroll: 2 } },
{ breakpoint: 480, settings: { slidesToShow: 2, slidesToScroll: 2 } }
]
};

return (

<div>

<div className="items">

<Slider {...settings}>
{testimonials.map((item, index) => (

<div className="card" key={index}>
<div className="card-body">
<h4 className="card-title">
<img src="https://cdn-icons-png.flaticon.com/128/9928/9928425.png" alt="quote" />
</h4>
<div className="template-demo">
<p>{item.text}</p>
</div>

<div className="row">

<div className="col-sm-2">
<img className="profile-pic" src={item.img} alt={item.name} />
</div>

<div className="col-sm-10 profile">
<h4 className="cust-name">{item.name}</h4>
<p className="cust-profession">{item.profession}</p>
</div>

</div>
</div>
</div>
))}

</Slider>
</div>

</div>

);
};

export default TestimonialSlider;
