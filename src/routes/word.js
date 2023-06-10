const { addNewWord, getWordMeaning, addMeaningToWord, editWordMeaning } = require("../controllers/wordController");
const express = require("express");
const router = express.Router();

// add new word to database
router.post("/word/add-new-word", addNewWord)

// get word meanings
router.get("/word/search/:english_word", getWordMeaning);

// add new meaning to exsting word
router.post("/word/add-new-meaning/:english_word", addMeaningToWord);

// edit word meaning in exsting word
router.post("/word/edit-word-meaning/:wordId" , editWordMeaning) 

module.exports = router;