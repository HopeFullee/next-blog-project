import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "@/lib/axios";

const useCommentDelete = () => {
  const [isFetching, setIsFetching] = useState(false);

  const { data: session } = useSession();

  const commentDelete = async (commentId: string, postId: string) => {
    setIsFetching(true);

    try {
      const res = await axios.delete("/api/comment", {
        params: {
          postId: postId,
          commentId: commentId,
        },
        headers: {
          Authorization: session?.accessToken,
        },
      });

      if (res.status === 200) window.location.reload();
      else throw res;
    } catch (err: any) {
      setIsFetching(false);
      console.log(err);
    }
  };

  return {
    isFetching,
    commentDelete,
  };
};

export default useCommentDelete;
