const word = require("../models/word");

// add new word to database
const addNewWord = async (req, res) => {
    try {
      const { english_word, meanings } = req.body;

      // if the word already exists sent error message
      const existingWord = await word.findOne({ english_word });
      if (existingWord) return res.status(400).json({ message: 'word already exists' });
  
      // create a new word instance using the Word model
      const newWord = new word({
        english_word,
        meanings
      });
  
      // save the new word to the database and sent success message
      const addedWord =  await newWord.save();
      res.status(201).json({ message: 'word added successfully', word: addedWord });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'error occurred while adding the word' });
    }
  };

// get single word meaning
const getWordMeaning = async (req, res) => {
    try {
      const { english_word } = req.params;
  
      // find the word in the database
      const foundedWord = await word.findOne({ english_word });
  
      // sent error messsage if wor not found
      if (!foundedWord || !foundedWord.status) return res.status(404).json({ message: 'notfound', english_word });
  
      // sent word meanings to client
      res.status(200).json({ resultData: foundedWord });
    } catch (error) {
      res.status(500).json({ message: 'error occurred while retrieving the word meaning' });
      console.log(error)
    }
  };

// add a new meaning to an existing word
const addMeaningToWord = async (req, res) => {
    try {
      const { english_word } = req.params;
  
      // find the word in the database
      const foundedWord = await word.findOne({ english_word });
  
      if (!foundedWord) {
        return res.status(404).json({ message: 'word not found' });
      }
  
      // add the new meaning to the word's meanings array
      foundedWord.meanings.push(req.body);
  
      // save the updated word to the database
      await foundedWord.save();
  
      res.status(200).json({ message: 'meaning added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'error occurred while adding the meaning' });
    }
  };


// update word meaning in exsting word
const updateWordMeaning = async (req, res) => {
    try {
      const { english_word } = req.params;
      const { updated_meanings } = req.body;
  
      // find the word in the database
      const foundedWord = await word.findOne({ english_word });
  
      if (!foundedWord) {
        return res.status(404).json({ message: 'Word not found' });
      }
  
      // Update the meanings of the word
      foundedWord.meanings = updated_meanings;
  
      // Save the updated word to the database
      await foundedWord.save();
  
      res.status(200).json({ message: 'word meanings updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'error occurred while updating word meanings' });
    }
  };


  // edit word meaning in exsting word
const editWordMeaning = async (req, res) => {
  try {
    const { wordId } = req.params

    word.findOneAndUpdate(
      { _id: wordId, 'meanings._id': req.body._id },
      { $set: { 'meanings.$': req.body } },
      { new: true }
      
    ).then((updatedWord) => {
      res.status(200).json({ message: "word meaning edited successfully", updatedWord })
    }).catch((error) => {
      res.status(500).json(error)
    })

  } catch (error) {
    res.status(500).json({ message: 'error occurred while edit word meaning/part_of_speech' });
  }
};

  
  
  module.exports = { addNewWord, getWordMeaning, addMeaningToWord, updateWordMeaning, editWordMeaning };