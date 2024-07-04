const express = require("express");
const MenuItem = require("../models/MenuItem");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const newMenu = new MenuItem(data);

    const response = await newMenu.save();
    console.log("saved ");
    res.status(200).json(response);
  } catch (error) {
    console.log("error occcured");
    res.status(500).json({
      err: "Internal server error",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();

    res.status(200).json(data);
  } catch (error) {
    console.log("error occured ");
    res.status(500).json({
      err: "Internal server error",
    });
  }
});

module.exports = router;
