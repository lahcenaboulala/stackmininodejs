const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const QuestionsController = require('../controllers/questions');

// Handle incoming GET requests to /orders
router.get("/", checkAuth, QuestionsController.questions_get_all);

router.post("/", checkAuth, QuestionsController.questions_create_question);

router.get("/:questionId", checkAuth, QuestionsController.questions_get_question);

router.delete("/:questionId", checkAuth, QuestionsController.questions_delete_question);

module.exports = router;
