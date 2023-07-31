const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const categoryRouter = require("./Category/categoryRouter.js"); //done
const userRouter = require("./User/userRouter.js"); //done
const productRouter = require("./Products/productRoutes.js"); //done
const brandRouter = require("./Brands/brandRoutes.js"); //done

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
