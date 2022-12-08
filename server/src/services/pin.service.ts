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

  async addLike(pinId: string, uid: string) {
    return await PinModel.findOneAndUpdate(
      { _id: pinId },
      { $push: { likes: uid } }
    ).select("_id");
  }
  async deleteLike(pinId: string, uid: string) {
    return await PinModel.findOneAndUpdate(
      { _id: pinId },
      { $pullAll: { likes: uid } },
      { rawResult: true }
    ).select("_id");
  }

  async getLikedPins(uid: string) {
    return await PinModel.find(
      {
        likes: { $elemMatch: uid },
      },
      { comments: false, about: false }
    )
      .populate("postedBy")
      .limit(30);
  }

  async getUserPins(uid: string) {
    return await PinModel.find(
      { postedBy: uid },
      { comments: false, about: false }
    ).populate("postedBy");
  }
}

export default new PinService();
