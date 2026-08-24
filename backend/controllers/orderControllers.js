const Order = require("../models/ordermodels");
const Product = require("../models/productmodels");

// =======================
// CREATE ORDER
// =======================
const createOrder = async (req, res) => {
  try {

    console.log("========== CREATE ORDER ==========");
    console.log("User:", req.user);
    console.log("Body:", req.body);

    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const qty = quantity || 1;

    const order = await Order.create({
      user: req.user.id,
      product: product._id,
      quantity: qty,
      totalPrice: product.price * qty,
    });

    res.status(201).json({
      success: true,
      data: order,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// =======================
// GET ALL ORDERS
// =======================
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    })
      .populate("user", "name")
      .populate("product", "name price image");

    res.status(200).json({
      success: true,
      data: orders,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =======================
// GET SINGLE ORDER
// =======================
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name")
      .populate("product");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =======================
// UPDATE ORDER STATUS
// =======================
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      {
        new: true,
      }
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
};