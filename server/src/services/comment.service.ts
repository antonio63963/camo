import CommentModel from 'models/comment';
import serviceUtils from './serviceUtils';
import { Comment } from 'models/comment.type';

class CommentService {

  async create(commentData: Comment) {
    const comment = new CommentModel();
    serviceUtils.createDoc(comment, commentData);
    const { _id } = await comment.save();
    return _id;
  }

};

export default new CommentService();
