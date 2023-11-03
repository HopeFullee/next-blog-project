import CommentList from "./CommentList";
import CommentTextArea from "./CommentTextArea";

interface Props {
  postId: string;
  comments: {
    commenter: string;
    comment: string;
    createdAt: string;
  }[];
}

const DetailComments = ({ postId, comments }: Props) => {
  return (
    <article className="w-full max-w-500">
      <p className="p-5 font-semibold border-b-2 text-18 border-cyan-500/40">
        Comments
      </p>
      <ul>
        {comments.map(({ ...rest }) => {
          return <CommentList {...rest} />;
        })}
      </ul>
      <CommentTextArea postId={postId} />
    </article>
  );
};

export default DetailComments;
