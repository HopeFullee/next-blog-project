import { useState } from "react";
import { PostData } from "@/components/post/PostForm";
import axios from "@/lib/axios";

export const useForumPost = () => {
  const [isFetching, setIsFetching] = useState(false);

  const post = async (postData: PostData) => {
    setIsFetching(true);

    try {
      const res = await axios.post("/api/forum", {
        title: postData.title,
        content: postData.content,
      });

      if (res.status === 200) window.location.replace("/forum");
      else throw res;
    } catch (err: any) {
      setIsFetching(false);
      console.log(err);
    }
  };

  return { post, isFetching };
};
