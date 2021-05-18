const mongoose = require('mongoose');
   
// CREATE SCHEMA
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true, 
        minLength: 2
    },
    author:{
        type: String,
        required: true, 
        minLength: 2
    },
    description: String,
    category: {
        type:String,
        enum: ["fiction","non-fiction","comics","others"],
        default: "fiction"
    },
    purchaseCount: Number,
    imageUrl: String,
    tags: Array,
    color: String,
    contact:{
        email:{
            type:String,
            required:true,
            unique:true
        },
               phone:{
            type:Number,
            required:true,
            unique:true
        },
               address:{
            type:String,
            required:false
        }
    }
})

const Book = mongoose.model('Book', bookSchema)
 
module.exports = Book;