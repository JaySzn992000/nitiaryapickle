import React from "react";

const Address = () => {
  const loadRazorpay = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load");
      return;
    }

    const options = {
      key: "rzp_live_Kh5Fut1EpwDwF5", // ✅ Replace with your live/test key
      amount: 100, // ₹1 = 100 paise
      currency: "INR",
      name: "Jsonsoftech Test",
      description: "Test ₹1 Payment without backend",
      image: "https://yourdomain.com/logo.png", // Optional logo
      handler: function (response) {
        alert("✅ Payment successful! Payment ID: " + response.razorpay_payment_id);
        console.log("Full response:", response);
      },
      prefill: {
        name: "Jay",
        email: "jay@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Jsonsoftech, Test",
      },
      theme: {
        color: "#F37254",
      },
      modal: {
        ondismiss: function () {
          alert("❌ Payment cancelled.");
        },
      },
      redirect: false, // Ensures modal stays
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div style={{ textAlign: "center", padding: 50 }}>
      <h2>🧪 Pay ₹1 via Razorpay (Frontend Only with Live Key)</h2>
      <button onClick={handlePayment} style={{ padding: 10, fontSize: 16 }}>
        Pay ₹1 Now
      </button>
    </div>
  );
};

export default Address;
