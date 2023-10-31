import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "@/lib/axios";

const useDeletePost = () => {
  const [isFetching, setIsFetching] = useState(false);

  const { data: session } = useSession();

  const deletePost = async (id: string) => {
    setIsFetching(true);

    try {
      const res = await axios.delete("/api/forum", {
        params: {
          id: id,
        },
        headers: {
          Authorization: session?.accessToken,
        },
      });

      if (res.status === 200) window.location.replace("/forum");
      else throw res;
    } catch (err) {
      setIsFetching(false);
      console.log(err);
    }
  };

  return {
    isFetching,
    deletePost,
  };
};

export default useDeletePost;
