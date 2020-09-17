import multer from 'multer';
import { Request, Response, NextFunction } from 'express';
import User from '../entities/user';
import { ERRORS, FILE_UPLOADS } from '@app/common';
import path from 'path';

// Storage Calibration for Image
const profileStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads/profile-pictures'));
  },
  filename: (req, file, cb) => {
    const fileExtension = file.originalname.split('.').pop();
    const fileName = `${(req as any).username}.${fileExtension}`;
    cb(null, fileName);
  }
});

// Uploads Profile Picture
export const uploadProfile = multer({ storage: profileStorage }).single(
  FILE_UPLOADS.PROFILE_PICTURE
);

// Prepares Upload with Username
export const prepareUpload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get User
    const { id } = res.locals.payload;
    const user = await User.findOne(id);
    if (!user) throw new Error();

    (req as any).username = user.username;

    next();
  } catch {
    res.status(400).json({
      error: ERRORS.FILE_UPLOAD.FILENAME
    });
  }
};
