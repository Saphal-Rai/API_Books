const ErrorResponse = require("../utils/errorResponse");
const Book = require("../model/Book");
const asyncHandler = require("../middleware/async");
//To get the file name extension line .jpg,.png
const path = require("path");


//--------------------CREATE Student------------------

exports.createBook = asyncHandler(async (req, res, next) => {

  const book = await Book.create(req.body);

  if (!book) {
    return next(new ErrorResponse("Error adding book"), 404);
  }

  res.status(201).json({
    success: true,
    data: book,
  });
});

//-------------------Display all students

exports.getBook = asyncHandler(async (req, res, next) => {
    const book = await Book.find({});
  
    res.status(201).json({
      success: true,
      count: book.length,
      data: book,
    });
  });

  // -----------------FIND Student BY ID-------------------

exports.getBookById = asyncHandler(async (req, res, next) => {
    const book = await Book.findById(req.params.id);
  
    if (!book) {
      return next(new ErrorResponse("Book not found"), 404);
    }
  
    res.status(200).json({
      success: true,
      data: book,
    });
  });

  // -----------------DELETE STUDENT------------------------

exports.deleteBook = asyncHandler(async (req, res, next) => {
    const book = await Book.findById(req.params.id);
  
    if (!book) {
      return next(new ErrorResponse(`No student found `), 404);
    }
  
    await book.remove();
  
    res.status(200).json({
      success: true,
      count: book.length,
      data: {},
    });
  });

  // ------------------UPLOAD IMAGE-----------------------

exports.BookPhotoUpload = asyncHandler(async (req, res, next) => {
    const book = await Book.findById(req.params.id);
  
    console.log(book);
    if (!book) {
      return next(new ErrorResponse(`No book found with ${req.params.id}`), 404);
    }
  
  
    if (!req.files) {
      return next(new ErrorResponse(`Please upload a file`, 400));
    }
  
    const file = req.files.file;
  
    // Make sure the image is a photo and accept any extension of an image
    // if (!file.mimetype.startsWith("image")) {
    //   return next(new ErrorResponse(`Please upload an image`, 400));
    // }
  
    // Check file size
    if (file.size > process.env.MAX_FILE_UPLOAD) {
      return next(
        new ErrorResponse(
          `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
          400
        )
      );
    }
  
    file.name = `photo_${book.id}${path.parse(file.name).ext}`;
  
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
      if (err) {
        console.err(err);
        return next(new ErrorResponse(`Problem with file upload`, 500));
      }
  
      //insert the filename into database
      await Book.findByIdAndUpdate(req.params.id, {
        photo: file.name,
      });
    });
  
    res.status(200).json({
      success: true,
      data: file.name,
    });
  });