"use client";

import { useState } from "react";
import { CommentData } from "@/components/detail/DetailComments/CommentTextArea";
import { useSession } from "next-auth/react";
import axios from "@/lib/axios";

const useComment = () => {
  const [isFetching, setIsFetching] = useState(false);

  const { data: session } = useSession();

  const addComment = async (commentData: CommentData, postId: string) => {
    setIsFetching(true);

    try {
      const res = await axios.post(
        "/api/comment",
        {
          postId: postId,
          commenterId: session?.user.id,
          comment: commentData.comment,
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

  return { isFetching, addComment };
};

export default useComment;
