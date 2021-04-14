const express = require("express");
const  router = express.Router();

const {
  createBook,
  getBook, 
  getBookById,
  deleteBook,
  BookPhotoUpload,
  } = require("../controllers/book");

  const { protect } = require("../middleware/auth");

  router
  .route("/")
  .get(protect,getBook)
  .post(protect,createBook);

  router
  .route("/:id/photo")
  .put(protect, BookPhotoUpload);

  router
  .route("/:id")
  .get(protect,getBookById)
  .delete(protect, deleteBook);


  module.exports = router