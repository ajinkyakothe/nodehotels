const express = require("express");
const Person = require("../models/Person");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log("data saved ");
    res.status(200).json(response);
  } catch (error) {
    console.log("error occured");
    console.log(error);
    res.status(500).json({ error: "Error occured" });
  }
});

router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;

    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("response fetched ");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "Invalid input" });
    }
  } catch (error) {
    console.log("error occured ");
    res.status(500).json({
      err: "Internal server error",
    });
  }
});

router.get("/getperson", async (req, res) => {
  try {
    const data = await Person.find();

    res.status(200).json(data);
  } catch (error) {
    console.log("error occured ");
    console.log(error);
    res.status(500).json({
      err: "Internal server error",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updateId = req.params.id;
    const datatoupdate = req.body;

    const response = await Person.findByIdAndUpdate(updateId, datatoupdate, {
      new: true,
      runValidators: true,
    });

    console.log("data updated");
    res.status(200).json(response);
  } catch (error) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personId = req.params.id;

    const response = await Person.findByIdAndDelete(personId);

    console.log("data deleted");
    res.status(200).json({ msg: "Deleted record" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
