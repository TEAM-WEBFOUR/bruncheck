// const router = require("express").Router();
// let User = require("../models/user.model");
// const express = require("express"),
//   app = express(),
//   mongoose = require("mongoose"),
//   bcrypt = require("bcrypt"),
//   bodyParser = require("body-parser");

const app = require("express");
const router = app.Router();
let User = require("../models/user.model");
const bcrypt = require("bcrypt");


const saltRounds = 10;

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/register").post(async (req, res) => {
  try {
    const password = await bcrypt.hash(req.body.password, saltRounds);
    const newUser = await new User({
      name: req.body.name,
      email: req.body.email,
      password: password,
    });
    newUser
      .save()
      .then(() => res.json("User added!"))
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error Occured");
  }
});

router.route("/login").post(async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const cmp = await bcrypt.compare(req.body.password, user.password);
      if (cmp) {
        //   ..... further code to maintain authentication like jwt or sessions
        // res.send("Auth Successful");
        res.send({
          token: 'test123'
        });
      } else {
        res.status(500).send("Internal Server error Occured");
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error Occured");
  }
});

router.route("/:id").delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json("User deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((packages) => res.json(packages))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  User.findById(req.params.id)
    .then((thePackage) => {
      thePackage.name = req.body.name;
      thePackage.email = req.body.email;
      thePackage.password = req.body.password;

      thePackage
        .save()
        .then(() => res.json("Package updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
