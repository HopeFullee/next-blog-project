import CommentList from "./CommentList";
import CommentTextArea from "./CommentTextArea";

export interface PostId {
  postId: string;
}

const DetailComments = ({ postId }: PostId) => {
  return (
    <article className="w-full max-w-500">
      <p className="p-5 font-semibold border-b-2 text-18 border-cyan-500/40">
        Comments
      </p>
      <CommentList />
      <CommentTextArea postId={postId} />
    </article>
  );
};

export default DetailComments;
