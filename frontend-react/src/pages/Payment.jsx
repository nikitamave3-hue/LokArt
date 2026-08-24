import PaymentButton from "../components/PaymentButton";
import "./payment.css";

export default function Payment() {
  const order = {
    product: "Handmade Clay Pot",
    seller: "LokArt Seller",
    amount: 499,
  };

  return (
    <div className="payment-page">
      <div className="payment-card">
        <h1>💳 Secure Payment</h1>

        <div className="payment-details">
          <p><strong>Product:</strong> {order.product}</p>
          <p><strong>Seller:</strong> {order.seller}</p>
          <p><strong>Total Amount:</strong> ₹{order.amount}</p>
        </div>

        <div className="payment-info">
          <h3>Payment Security</h3>
          <ul>
            <li>✅ 100% Secure Payment</li>
            <li>✅ Razorpay Protected</li>
            <li>✅ SSL Encrypted</li>
          </ul>
        </div>

        <PaymentButton amount={order.amount} />
      </div>
    </div>
  );
}





