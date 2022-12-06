import { ObjectId } from 'mongoose';

type General = {
  id?: string 
  title: string;
  postedBy: ObjectId;
  image: string;
  about: string;
  category: string;
  comments: ObjectId[];
};

export type {
  General,
};
