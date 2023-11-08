import { Session } from "next-auth";
import CommentList from "./CommentList";
import CommentTextArea from "./CommentTextArea";

interface Props {
  postId: string;
  session: Session | null;
  comments: {
    commenter: string;
    comment: string;
    createdAt: string;
  }[];
}

const DetailComments = ({ postId, comments, session }: Props) => {
  return (
    <article className="w-full max-w-500">
      <p className="p-5 font-semibold border-b-2 text-18 border-cyan-500/40">
        Comments
      </p>
      <ul>
        {comments.map(({ ...rest }) => {
          return <CommentList {...rest} postId={postId} session={session} />;
        })}
      </ul>
      <CommentTextArea postId={postId} session={session} />
    </article>
  );
};

export default DetailComments;
