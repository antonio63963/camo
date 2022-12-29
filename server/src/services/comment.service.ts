import CommentModel from 'models/comment';
import serviceUtils from './serviceUtils';
import { Comment } from 'models/comment.type';
import ApiError from 'lib/ApiError';

class CommentService {

  async create(commentData: Comment) {
    const comment = new CommentModel();
    serviceUtils.createDoc(comment, commentData);
    const doc = await comment.save();
    if(!doc) throw ApiError.ServerError();
    return doc;
  }

};

export default new CommentService();
