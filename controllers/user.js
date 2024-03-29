const ErrorResponse = require("../utils/errorResponse");
const user = require('../model/user');
const asyncHandler = require("../middleware/async");
//To get the file name extension line .jpg,.png
const path = require("path");



//--------------------CREATE Student------------------

exports.createUser = asyncHandler(async (req, res, next) => {

  const user = await user.create(req.body);

  if (!user) {
    return next(new ErrorResponse("Error adding user"), 404);
  }

  res.status(201).json({
    success: true,
    data: user,
  });
});

//-------------------Display all students

exports.getuser = asyncHandler(async (req, res, next) => {
    const user = await user.find({});
  
    res.status(201).json({
      success: true,
      count: students.length,
      data: user,
    });
  });

  // -----------------FIND Student BY ID-------------------

exports.getuserById = asyncHandler(async (req, res, next) => {
    const user = await user.findById(req.params.id);
  
    if (!user) {
      return next(new ErrorResponse("user not found"), 404);
    }
  
    res.status(200).json({
      success: true,
      data: user,
    });
  });

  // -----------------DELETE STUDENT------------------------

exports.deleteUser = asyncHandler(async (req, res, next) => {
    const user = await user.findById(req.params.id);
  
    if (!student) {
      return next(new ErrorResponse(`No user found `), 404);
    }
  
    await user.remove();
  
    res.status(200).json({
      success: true,
      count: user.length,
      data: {},
    });
  });

//   // ------------------UPLOAD IMAGE-----------------------

// exports.StudentPhotoUpload = asyncHandler(async (req, res, next) => {
//     const student = await Student.findById(req.params.id);
  
//     console.log(student);
//     if (!student) {
//       return next(new ErrorResponse(`No student found with ${req.params.id}`), 404);
//     }
  
  
//     if (!req.files) {
//       return next(new ErrorResponse(`Please upload a file`, 400));
//     }
  
//     const file = req.files.file;
  
//     // Make sure the image is a photo and accept any extension of an image
//     // if (!file.mimetype.startsWith("image")) {
//     //   return next(new ErrorResponse(`Please upload an image`, 400));
//     // }
  
//     // Check file size
//     if (file.size > process.env.MAX_FILE_UPLOAD) {
//       return next(
//         new ErrorResponse(
//           `Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`,
//           400
//         )
//       );
//     }
  
//     file.name = `photo_${student.id}${path.parse(file.name).ext}`;
  
//     file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
//       if (err) {
//         console.err(err);
//         return next(new ErrorResponse(`Problem with file upload`, 500));
//       }
  
//       //insert the filename into database
//       await Student.findByIdAndUpdate(req.params.id, {
//         photo: file.name,
//       });
//     });
  
//     res.status(200).json({
//       success: true,
//       data: file.name,
//     });
//   });