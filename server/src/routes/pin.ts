import express from "express";

import PinController from "controllers/PinController";
import checkIsTeacher from "middlewares/checkIsTeacher";
import materialTitleSchema from "schemas/materialTitleSchema";
import listTitleSchema from "schemas/listTitleSchema";
import materialUrlSchema from "schemas/materialUrlSchema";
import validateSchema from "middlewares/validateSchema";
import checkAuth from "middlewares/checkAuth";
import uploadImage from "middlewares/upoadImage";

const pinRouter = express.Router();

// pinRouter.get("/students", PinController.students);
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
  checkAuth,
  uploadImage,
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
  "/",
  // checkIsTeacher,
  // listTitleSchema,
  // validateSchema,
  PinController.edit
);


pinRouter.delete(
  '/:id/',
  PinController.delete,
)

export default pinRouter;
