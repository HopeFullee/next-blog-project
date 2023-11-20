import { useState } from "react";
import { PostModify } from "@/components/modify/ModifyForm";
import { useSession } from "next-auth/react";
import axios from "@/lib/axios";

export const useForumModify = () => {
  const [isFetching, setIsFetching] = useState(false);

  const { data: session } = useSession();

  const modify = async (postData: PostModify) => {
    setIsFetching(true);

    try {
      const res = await axios.put(
        "/api/forum",
        {
          id: postData.id,
          ownerId: postData.ownerId,
          title: postData.title,
          content: postData.content,
        },
        {
          headers: {
            Authorization: session?.accessToken,
          },
        }
      );

      if (res.status === 200) window.location.replace(`/detail/${postData.id}`);
      else throw res;
    } catch (err: any) {
      setIsFetching(false);
      console.log(err);
    }
  };

  return { isFetching, modify };
};
