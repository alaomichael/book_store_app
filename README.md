# book_store_app
This is a book store app project for the implementation of crud operations using express and a database. 

# Heroku link
https://the-book-store-app.herokuapp.com/

# Github repo link
https://github.com/alaomichael/book_store_app

// POST request to /books to create a new book
// GET request to /books to fetch all books
// GET request to /books/:id to fetch single book
// PUT request to /books/:id to update a single book
// DELETE request to /books/:id to delete a book


** FEATURES**
* Store owner can
    * Create Books
    * Fetch Books
    * Update Books
    * Delete Books
    * Search books

**TODO** 
* register route
    * Create a new user
    * Hash user's password
    * Create a token for user
    * Send token to the user

* login route
    * Check if user exists
    * compare user's password with stored hash
    * create a token
    * send token to user
* authenticate book routes (GET)