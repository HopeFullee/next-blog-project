import { useState } from "react";
import { PostModify } from "@/components/modify/ModifyForm";
import axios from "@/lib/axios";

export const useForumModify = () => {
  const [isFetching, setIsFetching] = useState(false);

  const modify = async (postData: PostModify) => {
    setIsFetching(true);

    try {
      const res = await axios.put("/api/modify", {
        id: postData.id,
        title: postData.title,
        content: postData.content,
      });

      if (res.status === 200) window.location.replace(`/detail/${postData.id}`);
      else throw res;
    } catch (err: any) {
      setIsFetching(false);
      console.log(err);
    }
  };

  return { isFetching, modify };
};
