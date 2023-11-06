export interface PostType {
  _id: string;
  ownerId: string;
  author: string;
  title: string;
  content: string;
  createdAt: string;
  comments: {
    commenterId: string;
    commenter: string;
    comment: string;
    createdAt: string;
  }[];
}
