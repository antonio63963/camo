import PinModel from "models/pin";
import { General } from "models/pin.type";
import { Comment } from "models/comment.type";
import { ObjectId } from "mongodb";

import serviceUtils from "./serviceUtils";
import commentService from "services/comment.service";
import ApiError from "lib/ApiError";

class PinService {
  async createPin(pinData: General) {
    const doc = new PinModel();
    serviceUtils.createDoc(doc, pinData);
    const newPinDoc = await doc.save();
    if (!newPinDoc) throw ApiError.ServerError();
    const { id, title, about, image, category, postedBy } = newPinDoc;
    return { id, title, about, image, category, postedBy };
  }

  async getPins() {
    return await PinModel.find({}, { comments: false, about: false })
      .populate("postedBy")
      .limit(30);
  }

  async getSamePins(category: string) {
    const pins = await PinModel.find(
      { category: category },
      { comments: false, about: false }
    )
      .populate("postedBy")
      .limit(20);
    if (!pins) throw ApiError.ServerError();
    return pins;
  }

  async editPin(updateData: General) {
    const { id, title, about, image, category, postedBy } = updateData;
    const editedPin = await PinModel.findOneAndUpdate(
      { _id: id, postedBy },
      { title, about, image, category }
    );
    if (!editedPin) throw ApiError.ServerError();
    return editedPin;
  }
  async changeImage(uid: string, pinId: string, image: string) {
    const pin = await PinModel.findOneAndUpdate({_id: pinId, postedBy: uid}, {image});
    if(!pin && !pin.image) throw ApiError.ServerError();
    return pin.image;
  }

  async addNewComment(commentData: Comment) {
    const { _id } = await commentService.create(commentData);
    const doc = await PinModel.findOneAndUpdate(
      { _id: commentData.pinId },
      { $push: { comments: _id } }
    );
    if (!doc) throw ApiError.ServerError();
    return doc.comments;
  }

  async removePin(pinId: string, postedBy: string) {
    const removedDoc = await PinModel.findOneAndDelete({
      _id: pinId,
      postedBy,
    });
    if (!removedDoc) throw ApiError.ServerError();
  }

  async getPinById(pinId: string) {
    const pinDoc = await PinModel.findOne({ _id: pinId })
      .populate("postedBy")
      .populate({ path: "comments", populate: { path: "user" } }); // fields

    if (!pinDoc) throw ApiError.NotFound();
    return pinDoc;
  }

  async addLike(pinId: string, uid: string) {
    const docId = await PinModel.updateOne(
      { _id: pinId },
      { $push: { likes: uid } }
    ).select("likes");
    if (!docId) throw ApiError.ServerError();
  }

  async deleteLike(pinId: string, uid: string) {
    console.log("New delet ObjID: ", uid);
    const docId = await PinModel.updateOne(
      { _id: pinId },
      { $pull: { likes: uid } },
      { rawResult: true }
    ).select("_id");
    if (!docId) throw ApiError.ServerError();
  }

  async getLikedPins(uid: string) {
    const pins = await PinModel.find(
      {
        likes: { $in: [uid] },
      },
      { comments: false, about: false }
    )
      .populate("postedBy")
      .limit(30);
    if (!pins) throw ApiError.ServerError();
    return pins;
  }

  async getUserPins(uid: string) {
    const userPins = await PinModel.find(
      { postedBy: uid },
      { comments: false, about: false }
    ).populate("postedBy");
    if (!userPins) throw ApiError.ServerError();
    return userPins;
  }

  async search(searchTerm: string) {
    const regex = new RegExp(`${searchTerm}`, "i");
    const pins = PinModel.find(
      {
        $or: [{ title: { $regex: regex } }, { about: { $regex: regex } }],
      },
      { comments: false, about: false }
    ).populate("postedBy");
    if (!pins) throw ApiError.ServerError();
    return pins;
  }
}

export default new PinService();
