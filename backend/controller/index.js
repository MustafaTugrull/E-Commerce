const express = require("express");
const router = express.Router();

const productRoute = require("./products.js");
const categoryRoute = require("./categories.js");
const userRoute = require("./users.js");
const blogRoute = require("./blogs.js");

router.use("/categories",categoryRoute);
router.use("/products",productRoute);
router.use("/users",userRoute);
router.use("/blogs",blogRoute);


module.exports = router;