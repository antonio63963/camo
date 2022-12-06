import PinModel from "models/pin";
import { General } from "models/pin.type";
import { Comment } from "models/comment.type";

import serviceUtils from "./serviceUtils";
import commentService from "services/comment.service";

class PinService {
  async createPin(pinData: General) {
    const doc = new PinModel();
    serviceUtils.createDoc(doc, pinData);
    const { id, title, about, image, category, postedBy } = await doc.save();
    return { id, title, about, image, category, postedBy };
  }

  async getPins() {
    return await PinModel.find({}, { comments: false, about: false })
      .populate("postedBy")
      .limit(30);
  }

  async getSamePins(category: string) {
    return await PinModel.find(
      { category: category },
      { comments: false, about: false }
    )
      .populate("postedBy")
      .limit(20);
  }

  async editPin(updateData: General) {
    const { id, title, about, image, category, postedBy } = updateData;
    return await PinModel.findOneAndUpdate(
      { _id: id, postedBy },
      { title, about, image, category }
    );
  }

  async addNewComment(commentData: Comment) {
    const { _id } = await commentService.create(commentData);
    const doc = await PinModel.findOneAndUpdate(
      { _id: commentData.pinId },
      { $push: { comments: _id } }
    );
    return doc.comments;
  }

  async removePin(pinId: string, postedBy: string) {
    return await PinModel.findOneAndDelete(
      { _id: pinId, postedBy },
      { _id: true }
    );
  }

  async getPinById(pinId: string) {
    return await PinModel.findOne({ _id: pinId })
      .populate("postedBy")
      .populate({ path: "comments", populate: { path: "user" } }); // fields
  }

  async checkIsListExist(owner: string, title: string) {
    return await PinModel.exists({ owner, title });
  }

  async findListByTitle(owner: string, title: string) {
    return await PinModel.findOne({ owner, title });
  }

  async getListsForStudent(userId: string, listIds: string[]) {
    const lists = await PinModel.find(
      {
        $and: [{ _id: listIds }],
        isPublic: true,
        students: {
          $elemMatch: {
            userId,
            isDisabled: false,
          },
        },
      },
      { id: true, title: true, materials: true }
    );
    // return lists.map(list => {
    //   list.materialsCount = list.materials.length;
    //   delete list.materials;
    //   return list;
    // });
  }

  async getListsForTeacher(userId: string) {
    const lists = await PinModel.find(
      { owner: userId },
      { title: true, isPublic: true, materials: true }
    );
    // return lists.map(list => {
    //   list.materialsCount = list.materials.length;
    //   delete list.materials;
    //   return list;
    // });
  }

  async findMaterialByUrl(listId: string, url: string) {
    return await PinModel.findOne({
      _id: listId,
      materials: {
        $elemMatch: { url },
      },
    });
  }

  async findMaterialByTitle(listId: string, title: string) {
    return await PinModel.findOne({
      _id: listId,
      materials: {
        $elemMatch: { title },
      },
    });
  }

  // async editMaterial(listId: string, userId: string, material: Material) {
  //   return await PinModel.findOneAndUpdate(
  //     { _id: listId, owner: userId },
  //     { $set: { "materials.$[elem]": material } },
  //     {
  //       new: true,
  //       rawResult: true,
  //       arrayFilters: [{ "elem._id": material.materialId }],
  //     }
  //   ).select({ materials: { $elemMatch: { title: material.title } } });
  // }

  async removeMaterial(listId: string, userId: string, deletedId: string) {
    return await PinModel.findOneAndUpdate(
      { _id: listId, owner: userId },
      {
        $pull: { materials: { _id: deletedId } },
        $inc: { materialsCount: -1 },
      },
      { rawResult: true }
    ).select({ materials: { $elemMatch: { _id: deletedId } } });
  }
}

export default new PinService();
