const mongoose = require("mongoose");
const Answer = require("../models/answer");

exports.answers_get_all = (req,res)=>{
  Answer.find()
  .sort({date:'desc'})
  .then(answers=>{
      res.json(answers);
  })
  .catch(err=>console.log(err));
};

exports.answers_create_answer = (req,res)=>{
  Question.findById(req.params.id)
  .then(question=>{
      var newAnswer={};
      newAnswer.user=req.user.id;
      newAnswer.description=req.body.description;
      newAnswer.question=req.body.question;

      question.answer.unshift(newAnswer);
      question.save()
      .then(question=>{
          res.json(question);
      })
      .catch(err=>console.log(err))
  })
  .catch(err=>console.log(err));
};


exports.answers_get_answer = (req, res, next) => {
  const id = req.params.answerId;
  Answer.findById(id)
    .select("name price _id productImage")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          answer: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/answers"
          }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.answers_update_answer = (req, res, next) => {
  const id = req.params.answerId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Answer.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Answer updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/answers/" + id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.answers_delete = (req, res, next) => {
  const id = req.params.answerId;
  Answer.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Answer deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/answers",
          body: { name: "String", price: "Number" }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
