const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUser,
  deleteUser,
} = require("./userController");

router.post("/signup", signup);
router.post("/login", login);
router.get("/allUsers", getAllUsers);
router.get("/userById/:userId", getUserById);
router.get("/userByEmail/:email", getUserByEmail);
router.put("/updateUser/:userId", updateUser);
router.delete("/deleteUser/:userId", deleteUser);

module.exports = router;
