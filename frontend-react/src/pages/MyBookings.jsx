import { useEffect, useState } from "react";
import API from "../api/api";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const { data } = await API.get("/bookings/my");
        setBookings(data?.bookings || []);
      } catch (err) {
        console.error("MY BOOKINGS ERROR:", err);
        setError(
          err?.response?.data?.message ||
          "Unable to load your bookings."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>📅 My Bookings</h2>

      {loading && <p>Loading bookings...</p>}

      {!loading && error && <p>{error}</p>}

      {!loading && !error && bookings.length === 0 && (
        <p>No bookings yet.</p>
      )}

      {!loading && !error && bookings.length > 0 && (
        <div>
          {bookings.map((booking) => (
            <div
              key={booking._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "18px",
                marginTop: "15px",
              }}
            >
              <h3>{booking.serviceName}</h3>

              <p>
                👨‍🎨 Artisan:{" "}
                {booking.artist?.name || "Artisan"}
              </p>

              <p>
                📅 Date:{" "}
                {new Date(booking.bookingDate).toLocaleDateString()}
              </p>

              <p>
                📍 Address: {booking.address}
              </p>

              <p>
                📌 Status: {booking.status}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
