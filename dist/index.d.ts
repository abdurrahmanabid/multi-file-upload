import { Request, Response, NextFunction } from "express";
/**
 * File upload middleware.
 * @param uploadType - 'single' or 'multiple' (default: 'single')
 * @param acceptedTypes - Array of allowed file MIME types (default: all)
 * @param directory - Upload directory (default: 'uploads/')
 * @param fieldName - The field name for file input (default: 'file')
 */
declare const uploadHandler: (uploadType?: "single" | "multiple", acceptedTypes?: string[], directory?: string, fieldName?: string) => (req: Request, res: Response, next: NextFunction) => void;
export default uploadHandler;
