const express = require("express");
const router = express.Router();
const Product = require("../models/Product.js");

//CREATE PRODUCT START
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Sunucu hatası..." });
  }
});

//CREATE PRODUCT END

//GET PRODUCTS START
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Sunucu hatası..." });
  }
});
//GET PRODUCTS END

//GET PRODUCT START
router.get("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Sunucu hatası..." });
  }
});
//GET PRODUCT END

//UPDATE PRODUCT START
router.put("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const updateInfo = req.body;

    const updatedProduct = await Product.findById(productId);
    if (!updatedProduct) {
      res.status(404).json({ error: "Ürün bulunamadı..." });
    }
    const updated = await Product.findByIdAndUpdate(productId, updateInfo);
    res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Sunucu hatası..." });
  }
});
//UPDATE PRODUCT END

//DELETE PRODUCT START
router.delete("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Ürün bulunamadı.." });
    }
    res.status(200).json(deletedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Sunucu hatası..." });
  }
});

//DELETE PRODUCT END

module.exports = router;
