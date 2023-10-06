const app = require("express");
const router = app.Router();
let Setting = require("../models/setting.model");

router.route("/").get((req, res) => {
    Setting.find()
      .then((setting) => res.json(setting))
      .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post(async (req, res) => {
  try {
    const newSetting = await new Setting({
      color: req.body.color
    });
    newSetting
      .save()
      .then(() => res.json("Setting added!"))
      .catch((err) => res.status(400).json("Error:" + err));
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error Occured");
  }
});

// todo
router.route("/register").post(async (req, res) => {
    try {
      const newSetting = await new Setting({
        color: req.body.color,
      });
      newUser
        .save()
        .then(() => res.json("Setting added!"))
        .catch((err) => res.status(400).json("Error: " + err));
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server error Occured");
    }
  });


router.route("/:id").get((req, res) => {
  Setting.findById(req.params.id)
    .then((setting) => res.json(setting))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Setting.findById(req.params.id)
    .then((setting) => {
      setting.color = req.body.color;
      setting.finishedStr = req.body.finishedStr;

      setting
        .save()
        .then(() => res.json("Setting updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;