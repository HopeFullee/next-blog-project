"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "@/lib/axios";

const useCommentPost = () => {
  const [isFetching, setIsFetching] = useState(false);

  const { data: session } = useSession();

  const addComment = async (commentData: string, postId: string) => {
    setIsFetching(true);

    try {
      const res = await axios.post(
        "/api/comment",
        {
          postId: postId,
          commenterId: session?.user.id,
          comment: commentData,
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

export default useCommentPost;
