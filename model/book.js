const mongoose = require("mongoose");

const Book = new mongoose.Schema(
    {
        titlename:{
            type: String,
            required: [true,"Enter full name"],
           
        },
        writer:{
            type: String,
            required: [true,"Enter age"],
        },
        publishername:{
            type: String,
            required: [true,"Select Gender"],
          
        },
        photo: {
            type: String,
            default: "no-photo.jpg",
          },
          createdAt: {
            type: Date,
            default: Date.now,
          },
    }
);

module.exports = mongoose.model("Book",Book);
