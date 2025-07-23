import multer, { StorageEngine } from "multer";
import path from "path";
import fs from "fs";
import { Request, Response, NextFunction } from "express";

/**
 * File upload middleware.
 * @param uploadType - 'single' or 'multiple' (default: 'single')
 * @param acceptedTypes - Array of allowed file MIME types (default: all)
 * @param directory - Upload directory (default: 'uploads/')
 * @param fieldName - The field name for file input (default: 'file')
 */
const uploadHandler = (
  uploadType: 'single' | 'multiple' = 'single',
  acceptedTypes: string[] = [],
  directory: string = 'uploads/',
  fieldName: string = 'file'
) => {
  // Ensure the directory exists
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  // Configure multer storage
  const storage: StorageEngine = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
      cb(null, directory);
    },
    filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
      const filename = `${Date.now()}-${file.originalname}`;
      cb(null, filename);
    }
  });

  // Multer filter for accepted file types
  const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, acceptFile?: boolean) => void
  ) => {
    if (acceptedTypes.length > 0 && !acceptedTypes.includes(file.mimetype)) {
      return cb(new Error("Invalid file type"), false);
    }
    cb(null, true);
  };

  const upload = multer({
    storage,
    fileFilter
  });

  // Choose single or multiple upload
  const uploadMiddleware = uploadType === "multiple"
    ? upload.array(fieldName, 10) // Allow up to 10 files
    : upload.single(fieldName);

  // Return middleware with automatic response handling
  return (req: Request, res: Response, next: NextFunction) => {
    uploadMiddleware(req, res, (err: any) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      if (!req.files && !req.file) {
        res.status(404).json({
          message: "Files NOT FOUND",
        });
        return;
      }
      res.status(200).json({
        message: "Files uploaded successfully",
        files: req.files
          ? Array.isArray(req.files)
            ? req.files.map((file: Express.Multer.File) => ({ ...file, path: file.path.replace(/\\/g, "/") }))
            : req.files
          : req.file
            ? { ...req.file, path: req.file.path.replace(/\\/g, "/") }
            : undefined
      });
    });
  };
};

export default uploadHandler; 