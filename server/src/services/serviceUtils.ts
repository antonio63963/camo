import path from "path";
import fs from "fs";

const imagePath = path.resolve("upload");

class ServiceUtils {
  createDoc(doc: { [index: string]: any }, data: { [index: string]: any }) {
    Object.keys(data).forEach((key: string) => (doc[key] = data[key]));
  };

  deleteImageFile = async (image: string) => {
    fs.unlink(imagePath + image, (err) => {
      if (err) {
        console.log("ERRR on DEstroy: ", err);
      }
    });
    console.log("====image was deleted.====");
  };
}

export default new ServiceUtils();
