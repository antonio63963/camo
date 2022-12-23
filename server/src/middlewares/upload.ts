import multer from "multer";
import path from "path";
import { Request } from "express";
import { v4 as uuidv4 } from 'uuid';

import sharp from 'sharp';

const folderUploads = path.resolve("upload/avatars/");

const storage = multer.diskStorage({
  destination(req: Request, file, cb) {
    cb(null, folderUploads);
  },
  filename(req, file, cb) {
    console.log('Multer', file)
    const typeFile = file.mimetype.match(/\/(.*)$/i)[1];
    const filePath = `${uuidv4()}_${Date.now()}.${typeFile}`;

    cb(null, `${filePath}`);
    req.params.photoPath += `,${filePath}`;
    console.log(req.params)
  },
});

const fileFilter = (req: Request, file: any, cb: any) => {
  const typeFile = file.mimetype;
  if (
    typeFile === "image/png" ||
    typeFile === "image/jpg" ||
    typeFile === "image/jpeg" ||
    typeFile === "image/svg" ||
    typeFile === "image/gif" ||
    typeFile === "image/tiff"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const limits = {
  fileSize: 2e7,
};

const uploadFile = multer({ storage, fileFilter, limits }).single("imageAsset");
const upload = multer();

export {
  uploadFile,
  upload,
};
