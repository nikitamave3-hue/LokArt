const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

const app = express();


const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:5176",
  "http://localhost:5177",
  "http://localhost:5178",
  "http://localhost:5179",
  "http://localhost:5180",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  "http://127.0.0.1:5175",
  "http://127.0.0.1:5176",
  "http://127.0.0.1:5177",
  "http://127.0.0.1:5178",
  "http://127.0.0.1:5179",
  "http://127.0.0.1:5180",
  "http://localhost:3000",
  "http://localhost:3001",
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS Not Allowed"));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/artists", require("./routes/artistRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/api/upload", require("./routes/uploadRoutes"));
app.use("/api/whatsapp", require("./routes/whatsappRoutes"));
app.use("/api/whatsapp", require("./routes/whatsappTemplateRoutes"));
app.use("/api/bookings", require("./routes/booking"));
app.use("/api/payment", require("./routes/payment"));
app.use("/api/posts", require("./routes/postRoutes"));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 LokArt API Running Successfully",
    version: "1.0.0",
    uptime: process.uptime(),
    time: new Date().toISOString(),
  });
});
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "OK",
    message: "LokArt Server is Healthy",
  });
});
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} Not Found`,
  });
});

app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB Connected Successfully");

    const server = app.listen(PORT, () => {
      console.log("==================================");
      console.log("🚀 LokArt Server Running");
      console.log(`🌐 Port : ${PORT}`);
      console.log(`📦 Environment : ${process.env.NODE_ENV}`);
      console.log("==================================");
    });

    server.on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        console.error(`❌ Port ${PORT} is already in use.`);
        process.exit(1);
      } else {
        console.error("❌ Server Error:", error);
        process.exit(1);
      }
    });
  } catch (error) {
    console.error("❌ Startup Error:", error);
    process.exit(1);
  }
};

startServer();