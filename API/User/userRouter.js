const express = require("express");
const router = express.Router();
const {signup,login,getAllUsers,getUserById,getUserByEmail,updateUser,deleteUser,} = require("./userController");

router.post("/signup", signup);
router.post("/login", login);
router.get("/getAllUsers", getAllUsers);
router.get("/getUserById/:userId", getUserById);
router.get("/getUserByEmail/:email", getUserByEmail);
router.put("/updateUser/:userId", updateUser);
router.delete("/deleteUser/:userId", deleteUser);

module.exports = router;
