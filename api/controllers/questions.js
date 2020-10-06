const mongoose = require("mongoose");

const Question = require("../models/question");
const Answer = require("../models/answer");
const question = require("../models/question");
const checkAuth = require('../middleware/check-auth');


exports.questions_get_all = (req,res)=>{
  Question.find()
  .sort({date:'desc'})
  .then(questions=>{
      res.json(questions);
  })
  .catch(err=>console.log(err));
};

exports.questions_create_question = (req,res)=>{
  const newQuestion=new Question({
      user:req.user.id,
      title:req.body.title,
      description:req.body.description,
      name:req.body.name,
      tag:req.body.tag

  });
  newQuestion
  .save()
  .then(question=>{
      res.json(question);
  })
  .catch(err=>console.log('error in pushing question '+err));
};

exports.questions_get_question = (req, res, next) => {
  Question.findById(req.params.questionId)
    .populate("answer")
    .exec()
    .then(question => {
      if (!question) {
        return res.status(404).json({
          message: "Question not found"
        });
      }
      res.status(200).json({
        question: question,
        request: {
          type: "GET",
          url: "http://localhost:3000/questions"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.questions_delete_question = (req, res, next) => {
  Question.remove({ _id: req.params.questionId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Question deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/questions",
          body: { questionId: "ID", quantity: "Number" }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};
