const multer = require("multer");
const path = require("path");
const fs = require("fs");

/**
 * File upload middleware.
 * @param {string} uploadType - 'single' or 'multiple' (default: 'single')
 * @param {Array} acceptedTypes - Array of allowed file MIME types (default: all)
 * @param {string} directory - Upload directory (default: 'uploads/')
 * @param {string} fieldName - The field name for file input (default: 'file')
 */
const uploadHandler = (uploadType = "single", acceptedTypes = [], directory = "uploads/", fieldName = "file") => {
  
  // Ensure the directory exists
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  // Configure multer storage
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, directory);
    },
    filename: (req, file, cb) => {
      const filename = `${Date.now()}-${file.originalname}`;
      cb(null, filename);
    }
  });

  // Multer filter for accepted file types
  const fileFilter = (req, file, cb) => {
    if(!file){
      res.status(404).json({
        message: "File(s) not FOUND" 
      });
    }
    if (acceptedTypes.length > 0 && !acceptedTypes.includes(file.mimetype)) {
      return cb(new Error("Invalid file type"), false);
    }
    cb(null, true);
  };

  const upload = multer({
    storage,
    fileFilter
  });

  // Auto-detect single/multiple
  if (Array.isArray(uploadType) && uploadType.length > 0) {
    fieldName = fieldName || "files";
    uploadType = "multiple";
  }

  // Choose single or multiple upload
  const uploadMiddleware = uploadType === "multiple"
    ? upload.array(fieldName, 10) // Allow up to 10 files
    : upload.single(fieldName);

  // Return middleware with automatic response handling
  return (req, res, next) => {
    uploadMiddleware(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      if(!req.files && !req.file){
        res.status(404).json({
          message: "Files NOT FOUND",
        });
        return;
      }
      res.status(200).json({
        message: "Files uploaded successfully",
        files: req.files
          ? req.files.map(file => ({ ...file, path: file.path.replace(/\\/g, "/") }))
          : { ...req.file, path: req.file?.path.replace(/\\/g, "/") }
      });      
    });
  };
};

module.exports = uploadHandler;
