const path = require('path');
const fs = require('fs');
const Book = require('../models/book')

exports.createNewBook = (req,res) => {
    // retrieve new book details from req.body
    // create a new book and save to db
        Book.create({
        // author: req.body.author,
        // description: req.body.description,
        // title: req.body.title,
        // category: req.body.category,
        // purchaseCount: req.body.purchaseCount,
        // imageUrl: req.body.imageUrl,
        // tags: req.body.tags,
        // color: req.body.color,
        // contact: req.body.contact

        // spreading the request.body content
        // and matching it with the model specification
        ...req.body
    }, (err, newBook) => {
        if(err) {
            return res.status(500).json({message: err})
        } else {
            // send response to client
            return res.status(200).json({message: "new book created", newBook})
        }
    })
}


exports.home =  (req,res) => {
    
    // create file path
    //   let filepath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url )
     let filepath = path.resolve('public', req.url === '/' ? 'index.html' : req.url )
    let contentType = getContentType(filepath) || 'text/html'
    // let emptyPagePath = path.join(__dirname,'public','404.html')
let emptyPagePath = path.resolve('public','404.html');

// read from the file using fs module
    fs.readFile(filepath, 'utf8', (err,content) => {
        if (err) {
            if(err.code === 'ENOENT'){
                fs.readFile(emptyPagePath,'utf8',(err,content) => {
                    res.writeHead(200,{'Content-Type': contentType})
                    res.end(content)
                })
            } else {
                res.writeHead(500)
                res.end('A server error has occured!')
            }
        }

        if(!err){
            res.writeHead(200,{'Content-Type': contentType})
            res.end(content)
        }
    })
}


// create dynamic contentType for the header
const getContentType = (filepath) => {
    let extname = path.extname(filepath)
    if(extname === '.js'){
        return 'text/javascript'
    }
      if(extname === '.css'){
        return 'text/css'
    }
      if(extname === '.png'){
        return 'image/png'
    }
          if(extname === '.jpg'){
        return 'image/jpg'
    }
}


exports.fetchBooks =  (req,res)=> {
    // fetch all books or retrieve searched book
    // check req.query for filters
    let conditions = {};
    if (req.query.category){
        conditions.category = req.query.category;
    }
        if (req.query.tag){
        conditions.tag = req.query.tag;
    }
        if (req.query.author){
        conditions.author = req.query.author;
    }
     if (req.query.tags){
        conditions.tags = req.query.tags;
    }
     if (req.query.description){
        conditions.description = req.query.description;
    }
      if (req.query.title){
        conditions.title = req.query.title;
    }
     if (req.query.purchaseCount){
        conditions.purchaseCount = req.query.purchaseCount;
    }
        if (req.query.imageUrl){
        conditions.imageUrl = req.query.imageUrl;
    }
     if (req.query.color){
        conditions.color = req.query.color;
    }
      if (req.query.contact){
        conditions.contact = req.query.contact;
    }
//   if (req.query.contact.email){
//         conditions.contact.email = req.query.contact.email;
//     }
//       if (req.query.contact.phone){
//         conditions.contact.phone = req.query.contact.phone;
//     }


    Book.find(conditions, (err,books)=>{
        if(err){
            return res.status(500).json({message: err })
        } else {
            // send response to client 
            return res.status(200).json({books})
        }
    })
    
}

exports.fetchSingleBook = (req,res) => {
    // Find by object value
    // Book.findOne({ _id: req.params.id}, (err,book) => {
    //     if (!book) {
    //         // send unsuccessful search message to client 
    //         return res.status(404).json({message: "Book not found."})
            
    //     } else if (err) {
    //         return res.status(500).json({message: err})
    //     } else {
    //         return res.status(200).json({book})
    //     }
    // })

    // Find by Id 
    Book.findById(req.params.id, (err,book) => {
        if (!book) {
            // send unsuccessful search message to client 
            return res.status(404).json({message: "Book not found."})
        } else if (err) {
            return res.status(500).json({message: err})
        } else {
            return res.status(200).json({book})
        }
    })
}

exports.updateSingleBook = (req,res) => {
    Book.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        category: req.body.category,
        contact: req.body.contact
    }, (err,book) => {
        if(err) {
            return res.status(500).json({message: err})
        } else if (!book){
            return res.status(404).json({message: "Book does not exist."})
        } else {
            book.save((err,savedBook) => {
                if(err) {
                return res.status(400).json({message: err})    
                } else {
                    return res.status(200).json({message: "Book updated successfully."})
                }
            })
        }

    })
}


exports.deleteSingleBook = (req,res) => {
    Book.findByIdAndDelete(req.params.id,(err,book)=> {
        if(err) {
            return res.status(500).json({message: err})
        } else if (!book) {
            return res.status(404).json({message: "Book was not found"})
        } else {
            return res.status(200).json({message: "Book deleted successfully."})
        }
    })
}