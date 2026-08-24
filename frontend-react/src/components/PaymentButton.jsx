import axios from "axios";

export default function PaymentButton({ amount = 499 }) {
  const handlePayment = async () => {
    try {
      // Backend se order create karo
      const { data } = await axios.post(
        "http://localhost:5000/api/payment/create-order",
        { amount }
      );

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // .env se key
        amount: data.amount,
        currency: data.currency,
        name: "LokArt",
        description: "LokArt Marketplace Payment",
        order_id: data.id,

        handler: async function (response) {
          alert("✅ Payment Successful!");

          console.log(response);

          // Yaha baad me payment verify API call karenge
        },

        prefill: {
          name: "LokArt User",
          email: "user@example.com",
          contact: "9999999999",
        },

        theme: {
          color: "#A0522D",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (err) {
      console.error(err);
      alert("❌ Payment Failed");
    }
  };

  return (
    <button className="pay-btn" onClick={handlePayment}>
      💳 Pay Now
    </button>
  );
}