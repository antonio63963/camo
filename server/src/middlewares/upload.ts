import multer from "multer";
import path from "path";
import { Request } from "express";
import { v4 as uuidv4 } from "uuid";

import sharp from "sharp";

const folderUploadsAvatar = path.resolve("upload/avatars/");
const folderUploadsPinImage = path.resolve("upload/pinImages/");

const storageAvatar = multer.diskStorage({
  destination(req: Request, file, cb) {
    cb(null, folderUploadsAvatar);
  },
  filename(req, file, cb) {
    console.log("Multer", file);
    const typeFile = file.mimetype.match(/\/(.*)$/i)[1];
    const filePath = `${uuidv4()}_${Date.now()}.${typeFile}`;

    cb(null, `${filePath}`);
    req.body.avatarPath = `/avatars/${filePath}`;
  },
});

const storagePinImage = multer.diskStorage({
  destination(req: Request, file, cb) {
    cb(null, folderUploadsPinImage);
  },
  filename(req, file, cb) {
    console.log("Multer", file);
    const typeFile = file.mimetype.match(/\/(.*)$/i)[1];
    const filePath = `${uuidv4()}_${Date.now()}.${typeFile}`;

    cb(null, `${filePath}`);
    req.body.imageAsset = `/pinImages/${filePath}`;
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

const limitsAvatar = {
  fileSize: 5e6,
};
const limitsPin = {
  fileSize: 2e7,
};

const uploadAvatar = multer({
  storage: storageAvatar,
  fileFilter,
  limits: limitsAvatar,
}).single("imageAsset");

const uploadPinImage = multer({
  storage: storagePinImage,
  fileFilter,
  limits: limitsPin,
}).single("imageAsset");
const upload = multer();

export { uploadAvatar, uploadPinImage, upload };
