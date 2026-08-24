const User = require("../models/usermodels");
const Product = require("../models/productmodels");
const Order = require("../models/ordermodels");

// =======================
// ADMIN STATS CONTROLLER
// =======================
const getAdminStats = async (req, res) => {
  try {
    // =======================
    // BASIC COUNTS
    // =======================
    const users = await User.countDocuments();
    const products = await Product.countDocuments();
    const orders = await Order.countDocuments();

    // =======================
    // ORDER STATUS COUNTS
    // =======================
    const pendingOrders = await Order.countDocuments({
      status: "Pending",
    });

    const processingOrders = await Order.countDocuments({
      status: "Processing",
    });

    const shippedOrders = await Order.countDocuments({
      status: "Shipped",
    });

    const deliveredOrders = await Order.countDocuments({
      status: "Delivered",
    });

    // =======================
    // TOTAL REVENUE
    // =======================
    const revenueResult = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalPrice",
          },
        },
      },
    ]);

    const totalRevenue =
      revenueResult.length > 0
        ? revenueResult[0].totalRevenue
        : 0;

    // =======================
    // RECENT ORDERS
    // =======================
    const latestOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(5);

    // =======================
    // RECENT USERS
    // =======================
    const latestUsers = await User.find()
      .select("-password")
      .sort({ createdAt: -1 })
      .limit(5);

    // =======================
    // RECENT PRODUCTS
    // =======================
    const latestProducts = await Product.find()
      .sort({ createdAt: -1 })
      .limit(5);

    // =======================
    // RESPONSE
    // =======================
    res.status(200).json({
      success: true,

      users,
      products,
      orders,

      totalRevenue,

      pendingOrders,
      processingOrders,
      shippedOrders,
      deliveredOrders,

      latestOrders,
      latestUsers,
      latestProducts,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getReviews = async (req, res) => {
  try {
    const reviews = [];
    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAdminStats,
  getReviews,
};