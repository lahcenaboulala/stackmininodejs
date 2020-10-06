const express = require("express");
const router = express.Router();
// const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const AnswersController = require('../controllers/answers');




router.get("/", AnswersController.answers_get_all);

router.post("/", checkAuth,AnswersController.answers_create_answer);

router.get("/:answerId", AnswersController.answers_get_answer);

router.delete("/:answerId", checkAuth, AnswersController.answers_delete);

module.exports = router;
