/**
 * Model.find -> fetch multiple documents
 * Model.findOne -> fetch single document
 * Model.findById -> fetch single document by Id
 * 
 * Model.findOneAndUpdate
 * Model.findByIdAndUpdate
 * 
 * Model.findOneAndDelete 
 * Model.findByIdAndDelete
 * Model.findOneAndRemove
 * Model.findByIdAndRemove
*/


const express = require('express');
const router = express.Router();
const BookCtrl = require('../controllers/bookControllers');

// POST request to /books to create a new book
router.post('/books', BookCtrl.createNewBook );

// GET request to / to display the homepage
router.get('/', BookCtrl.home);

// GET request to /books to fetch all books
router.get('/books', BookCtrl.fetchBooks);

// GET request to /books/:id to fetch single book
router.get('/books/:id', BookCtrl.fetchSingleBook);

// PUT request to /books/:id to update a single book
router.put('/books/:id',BookCtrl.updateSingleBook);

// DELETE request to /books/:id to delete a book
router.delete('/books/:id', BookCtrl.deleteSingleBook);

module.exports = router;