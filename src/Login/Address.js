import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../headers_footer/navbar";
import Header from "../headers_footer/header";
import axios from "axios";
import "./Address.css";


const Address = () => {

const handleSubmit = async (e) => {
  
  e.preventDefault();

  if (!loggedInUser) {
    alert("Please log in first.");
    return;
  }

  if (!validateForm()) {
    return;
  }

  setIsProcessing(true);

  try {
    const response = await axios.post("https://picklewebsite.onrender.com/create-order", {
      amount: totalAmount,
    });

    const { id: orderId } = response.data;

    const options = {
      key: "rzp_live_Kh5Fut1EpwDwF5",
      amount: totalAmount * 100,
      currency: "INR",
      name: "Your Company Name",
      description: "Test Transaction",
      order_id: orderId,
      handler: async (response) => {
        try {
          const paymentVerificationResponse = await axios.post(
            "https://picklewebsite.onrender.com/verify-payment",
            response
          );

          if (paymentVerificationResponse.data.success) {
            const dataToSend = {
              user: {
                name: loggedInUser.name,
                mob: loggedInUser.mobileno,
                email: loggedInUser.email,
              },
              cartItems: cartProducts.map((product, idx) => ({
                id: product.id,
                productName: product.name,
                price: product.price,
                file_path: product.file_path,
                quantity: quantities[idx] || 1,
              })),
              addressDetails: formData,
              paymentDetails: {
                razorpay_order_id: orderId,
                razorpay_payment_id: response.razorpay_payment_id,
                amount: totalAmount,
                payment_status: "Successful", // स्पेलिंग सही की है
              },
            };

            await axios.post(
              "https://picklewebsite.onrender.com/addcartaddress",
              dataToSend
            );
            
            resetForm();
            alert("Order successfully placed!");
          } else {
            alert("Payment verification failed!");
          }
        } catch (error) {
          console.error("Error in payment handler:", error);
          alert("Error processing payment. Please contact support.");
        }
      },
      prefill: {
        name: loggedInUser?.name || "",
        email: loggedInUser?.email || "",
        contact: loggedInUser?.mobileno || "",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.on("payment.failed", function (response) {
      alert("Payment failed. Please try again.");
      console.error("Payment failed:", response);
    });
    
    paymentObject.open();
  } catch (error) {
    console.error(
      "Error during payment:",
      error.response ? error.response.data : error.message
    );
    alert("Error creating payment order. Please try again.");
  } finally {
    setIsProcessing(false);
  }
};


return (

<div>

<Navbar />

<div className="form_address">
<form onSubmit={handleSubmit}>
<span>

<div className="flex_add flex_saveMyaddress"></div>

<div className="flex_add">
<div className="optionSlct">
<h4>Mr.</h4>
<select
name="gender"
value={formData.gender}
onChange={handleChange}
required
>
<option value="Mr.">Mr.</option>
<option value="Ms.">Ms.</option>
</select>
</div>


<div>
<h4>Name</h4>
<input
className="inputAddress"
type="text"
placeholder="Name"
name="addressname"
value={formData.addressname}
onChange={handleChange}
required
/>
</div>
</div>


<div className="flex_add">
<div>
<h4>Country</h4>
<input
className="inputAddress"
type="text"
placeholder="Country"
name="country"
value={formData.country}
onChange={handleChange}
required
/>
</div>


<div>
<h4>Pincode</h4>
<input
className="inputAddress"
type="text"
placeholder="Pincode/Zipcode"
name="pincode"
value={formData.pincode}
onChange={handleChange}
maxLength="6"
required
/>
</div>
</div>


<div className="flex_add">
<div>
<h4>Address</h4>
<input
className="inputAddress"
type="text"
placeholder="address"
name="address"
value={formData.address}
onChange={handleChange}
required
/>
</div>
<div>

<h4>State</h4>
<input
className="inputAddress"
type="text"
placeholder="State"
name="state"
value={formData.state}
onChange={handleChange}
required
/>
</div>
</div>

<div className="flex_add ContID">
<div>
<h4>Mobile number</h4>
<input
className="inputAddress"
type="text"
placeholder="Mobile number"
name="mobilenumber"
value={formData.mobilenumber}
onChange={handleChange}
maxLength="10"
required
/>
</div>


<div>
<h4>Alternative number</h4>
<input
className="inputAddress"
type="text"
placeholder="Alternative number"
name="alternativenumber"
value={formData.alternativenumber}
onChange={handleChange}
maxLength="10"
/>
</div>


<div>
<h4>Email ID</h4>
<input
className="inputAddress"
type="email"
placeholder="Email ID"
name="emailid"
value={formData.emailid}
onChange={handleChange}
required
/>
</div>
</div>


<button type="submit" className="btn_sve" disabled={isProcessing}>
{isProcessing ? (
<>
<span className="spinner"></span> Processing...
</>
) : (
"Save Address & Proceed"
)}
</button>

</span>
</form>


<img
src="https://img.freepik.com/free-vector/worldmap-background-design_1127-2318.jpg?semt=ais_hybrid"
className="img_form"
loading="lazy"
alt=""
/>
</div>

<Header></Header>
</div>

);
};


export default Address;