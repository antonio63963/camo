import PointModel from '../models/comment';
import { Logger } from "tslog";

const log: Logger = new Logger();


class PointService {
  async createPoindDoc(userId: string, listId: string) {
    const doc = await PointModel.findOne({userId, listId});
    if(!doc) {
      await PointModel.create({userId, listId})
    } else {
      log.info("Such document already exists!");
    };
  };

  async findStudentListsId(userId: string) {
    return (await PointModel.find({userId}, {_id: false})).map(doc => doc.listId);
  };
};

export default new PointService();