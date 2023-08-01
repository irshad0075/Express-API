const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const categoryRouter = require("./API/Category/categoryRouter.js"); //done
const userRouter = require("./API/User/userRouter.js"); //done
const productRouter = require("./API/Products/productRoutes.js"); //done
const brandRouter = require("./API/Brands/brandRoutes.js"); //done

const app = express();
app.use(express.json());

// Set up MongoDB connection
mongoose.connect(process.env.MONGO_URI);
// Handle connection errors
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err.message);
});
// Handle successful connection
mongoose.connection.once("open", () => {
  console.log("DB Connected Successfully");
});

// Categories Routes
app.use("/api/categories", categoryRouter);

// User Routes
app.use("/api/users", userRouter);

// Product Routes
app.use("/api/products", productRouter);

// Brands Routes
app.use("/api/brands", brandRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong." });
});

const SERVER_PORT = process.env.SERVER_PORT;
app.listen(SERVER_PORT, () => {
  console.log(`Server is running on SERVER_PORT ${SERVER_PORT}`);
});

