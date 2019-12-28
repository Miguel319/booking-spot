const express = require("express");
const router = express.Router();
const { signin, signup, getLoggedInUser } = require("../controllers/auth");
const { protect } = require("../middleware/auth");

router.post("/signin", signin);
router.post("/signup", signup);
router.get("/currentUser", protect, getLoggedInUser);

module.exports = router;
