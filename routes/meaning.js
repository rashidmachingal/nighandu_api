const express = require("express");
const router = express.Router();
const Meaning = require("../models/Meaning");
const {transporter} = require('./mailConfig')

// add new word
router.post("/add-new-word", async (req, res) => {
  try {
    const allItems = req.body;
    const word = allItems[0].english_word
    const isWordAlready = await Meaning.findOne({ english_word: word })
    if(isWordAlready!=null) return res.json({status:"NO",eng_word:word})
    allItems.map( async (i) => {
      const newWord = new Meaning({
        english_word: i.english_word,
        part_of_speech: i.part_of_speech,
        malayalam_definition: i.malayalam_definition,
      });
      newWord.save();
      res.json({status:"OK"})
    });

    let mailOptions = {
      from: '"Mallu Nighandu" <therashileo@gmail.com>',
      to: 'rashileocontact@gmail.com',
      subject: `New Word Added to Mallu Nigandu`,
      text: `New Word: ${word}`
    };

    transporter.sendMail(mailOptions)
  } catch (error) {
    res.json(error);
  }
});

// get word meaning
router.get("/search/:word", async (req, res) => {
  try {
    let word = await Meaning.find({ english_word: req.params.word });
    if (word.length === 0) {
      const word = [{ status: "notfound", search_word: req.params.word }];
      return res.json(word);
    }
    res.json(word);
  } catch (error) {
    res.json(error);
  }
});

// add new meaning
router.post("/add-new-meaning", async (req, res) => {
  try {
      const newMeaning = new Meaning({
        english_word: req.body.english_word,
        part_of_speech: req.body.part_of_speech,
        malayalam_definition: req.body.malayalam_definition,
      });
      newMeaning.save();
      res.json({status:"OK"})
  } catch (error) {
    res.json(error);
  }
});

// update word meaning
router.post("/update-word-meaning/:id", async (req,res) => {
  try {
    const updatedWord = await Meaning.findByIdAndUpdate(
      req.params.id,
      {
        $set:req.body,
      },
      {new : true}
    )
    res.json({status:"OK",updatedWord})

    let mailOptions = {
      from: '"Mallu Nighandu" <therashileo@gmail.com>',
      to: 'rashileocontact@gmail.com',
      subject: `${updatedWord.english_word.toUpperCase()} Word Meaning Updated`,
      text: `Hello Rashid,\n
      Updated Word Meaning Details\n
      English Word: ${updatedWord.english_word}\n
      Part Of Speech: ${updatedWord.part_of_speech}\n
      Malayalam Definition: ${updatedWord.malayalam_definition}\n
      Id: ${updatedWord._id}`
    };

    transporter.sendMail(mailOptions)
  } catch (error) {
    res.status(500).json(error);
  }
}) 

module.exports = router;