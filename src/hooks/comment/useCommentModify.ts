import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "@/lib/axios";

const useCommentModify = () => {
  const [isFetching, setIsFetching] = useState(false);

  const { data: session } = useSession();

  const commentModify = async (
    modifiedCommentData: string,
    commenterId: string,
    commentId: string,
    postId: string
  ) => {
    setIsFetching(true);

    try {
      const res = await axios.put(
        "/api/comment",
        {
          postId: postId,
          commentId: commentId,
          commenterId: commenterId,
          comment: modifiedCommentData,
        },
        {
          headers: {
            Authorization: session?.accessToken,
          },
        }
      );

      if (res.status === 200) window.location.reload();
      else throw res;
    } catch (err: any) {
      setIsFetching(false);
      console.log(err);
    }
  };

  return { isFetching, commentModify };
};

export default useCommentModify;
