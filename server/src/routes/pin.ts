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
pinRouter.get("/:id", PinController.show);
pinRouter.get("/:category/:id", PinController.samePins);
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
  "/",
  // checkIsTeacher,
  // listTitleSchema,
  // validateSchema,
  PinController.edit
);

pinRouter.delete(
  "/:id",
  checkIsTeacher,
  PinController.delete
);

pinRouter.post(
  "/:id/materials",
  checkIsTeacher,
  materialTitleSchema,
  materialUrlSchema,
  validateSchema,
  PinController.create
);

pinRouter.put(
  "/:id/materials",
  checkIsTeacher,
  // PinController.editMaterial
);

pinRouter.delete(
  '/:id/materials/',
  checkIsTeacher,
  // PinController.deleteMaterial
)

export default pinRouter;
