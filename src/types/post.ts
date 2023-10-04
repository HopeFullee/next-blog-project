import { ObjectId } from "mongodb";

export interface PostType {
  _id: ObjectId;
  title: string;
  content: string;
  postDate: {
    year: string;
    month: string;
    date: string;
    time: {
      hours: string;
      minutes: string;
    };
  };
}
