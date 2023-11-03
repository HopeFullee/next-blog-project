export interface PostType {
  _id: string;
  ownerId: string;
  author: string;
  title: string;
  content: string;
  createdAt: string;
  comments: {
    commenter: string;
    comment: string;
    createdAt: string;
  }[];
}
