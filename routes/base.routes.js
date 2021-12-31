const express = require("express");
const authController = require("../controllers/auth.controllers");

const router = express.Router();

router.get("/", (req, res) =>{
    res.render("customer/products/all-products");
});



module.exports = router;