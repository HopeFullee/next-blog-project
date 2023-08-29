import { ObjectId } from "mongodb";

export interface PostType {
  _id: ObjectId;
  title: string;
  content: string;
}
