const express = require("express");
const router = express.Router();
const Coupon = require("../models/Coupon.js");

//CREATE COUPON START
router.post("/", async (req, res) => {
  try {
    const newCoupon = new Coupon(req.body);
    await newCoupon.save();
    res.status(201).json(newCoupon);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Sunucu hatası..." });
  }
});

//CREATE COUPON END

//GET COUPON START
router.get("/", async (req, res) => {
  try {
    const coupon = await Coupon.find();
    res.status(200).json(coupon);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Sunucu hatası..." });
  }
});
//GET COUPON END

//GET COUPON START
router.get("/byid/:id", async (req, res) => {
  try {
    const couponId = req.params.id;
    const coupon = await Coupon.findById(couponId);
    if (!coupon) {
      return res.status(404).json({ error: "COUPON not found" });
    }

    res.status(200).json(coupon);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Sunucu hatası..." });
  }
});
//GET COUPON END

//GETBYCODE COUPON START
router.get("/:couponcode", async (req, res) => {
  try {
    const couponCode = req.params.couponcode;
    const coupon = await Coupon.findOne({ code: couponCode });
    if (!coupon) {
      return res.status(404).json({ error: "COUPON not found" });
    }

    const { discount, expired, count } = coupon;
    res.status(200).json({ discount, expired, count });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Sunucu hatası..." });
  }
});
//GETBYCODE COUPON END

//UPDATE COUPON START
router.put("/:couponId", async (req, res) => {
  try {
    const couponId = req.params.couponId;
    const updateInfo = req.body;

    const updatedCoupon = await Coupon.findById(couponId);
    if (!updatedCoupon) {
      res.status(404).json({ error: "COUPON not found..." });
    }
    const updated = await Coupon.findByIdAndUpdate(couponId, updateInfo);
    res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Sunucu hatası..." });
  }
});
//UPDATE COUPON END

//DELETE COUPON START
router.delete("/:couponId", async (req, res) => {
  try {
    const couponId = req.params.couponId;
    const deletedCoupon = await Coupon.findByIdAndDelete(couponId);

    if (!deletedCoupon) {
      return res.status(404).json({ error: "COUPON not found.." });
    }
    res.status(200).json(deletedCoupon);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Sunucu hatası..." });
  }
});

//DELETE COUPON END

module.exports = router;
