import express from "express";

import PinController from "controllers/PinController";
import { uploadPinImage } from "middlewares/upload";

const pinRouter = express.Router();

pinRouter.get("/", PinController.index);
pinRouter.get("/userPins", PinController.userPins);
pinRouter.get("/likedPins", PinController.likedPins);
pinRouter.get("/:id", PinController.show);
pinRouter.get("/:category/category", PinController.samePins);
pinRouter.get("/:searchTerm/search", PinController.searchPins);
pinRouter.post("/:id/comments", PinController.addComment);
pinRouter.post(
  "/",
  // listTitleSchema,
  // validateSchema,
  uploadPinImage,
  PinController.create
);

pinRouter.put(
  "/:id/like",
  PinController.like
);

pinRouter.delete(
  "/:id/like",
  PinController.deleteLike
);

pinRouter.put(
  "/:id/image",
  // checkIsTeacher,
  // listTitleSchema,
  // validateSchema,
  uploadPinImage,
  // deleteImageFile,
  PinController.editImage,
);


pinRouter.delete(
  '/:id/',
  PinController.delete,
)

export default pinRouter;
