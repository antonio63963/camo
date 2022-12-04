import { ObjectId } from 'mongoose';

interface Comment {
  pinId: ObjectId;
  user: ObjectId;
  message: string;
  data: number;
};

export type {
  Comment,
};
