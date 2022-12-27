import { ObjectId } from 'mongoose';

type General = {
  id?: string 
  title: string;
  postedBy: ObjectId;
  imageAsset?: string;
  imageLink?: string;
  about: string;
  category: string;
  comments: ObjectId[];
  likes: ObjectId[];
};

export type {
  General,
};
