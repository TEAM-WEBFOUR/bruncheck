const app = require("express");
// const cors = require("cors");
const router = app.Router();
// const cors = require('cors');
let Question = require("../models/question.model");
// const cors = require("cors");


router.route("/").get((req, res) => {
  Question.find()
    .then((questions) => res.json(questions))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post(async (req, res) => {
  try {
    const newQuestion = await new Question({
      question: req.body.question,
      breakfast: req.body.breakfast,
      brunch: req.body.brunch,
      lunch: req.body.lunch,
      snack: req.body.snack,
      dinner: req.body.dinner,
      dessert: req.body.dessert,
    });
    newQuestion
      .save()
      .then(() => res.json("Question added!"))
      .catch((err) => res.status(400).json("Error: " + err));
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error Occured");
  }
});

router.route("/:id").delete((req, res) => {
  Question.findByIdAndDelete(req.params.id)
    .then(() => res.json("Question deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Question.findById(req.params.id)
    .then((questions) => res.json(questions))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Question.findById(req.params.id)
    .then((theQuestion) => {
      theQuestion.question = req.body.question;
      theQuestion.breakfast = req.body.breakfast;
      theQuestion.brunch = req.body.brunch;
      theQuestion.lunch = req.body.lunch;
      theQuestion.snack = req.body.snack;
      theQuestion.dinner = req.body.dinner;
      theQuestion.dessert = req.body.dessert;

      theQuestion
        .save()
        .then(() => res.json("Question updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
