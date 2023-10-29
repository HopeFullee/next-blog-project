import { ProfileData } from "@/components/profile/ProfileForm";
import axios from "@/lib/axios";
import { useState } from "react";
import { useSession } from "next-auth/react";

export const useProfileModify = () => {
  const [isFetching, setIsFetching] = useState(false);
  const { update: sessionUpdate } = useSession();

  const [duplicateError, setDuplicateError] = useState<Record<string, string>>(
    {}
  );

  const profileModify = async (profileData: ProfileData) => {
    setIsFetching(true);

    try {
      const res = await axios.put("/api/auth/profile", {
        name: profileData.name,
      });

      if (res.status === 200) {
        await sessionUpdate({ name: profileData.name });
        window.location.replace("/profile");
      } else throw res;
    } catch (err: any) {
      setIsFetching(false);

      const errorBody = err.response.data;
      setDuplicateError(errorBody);
    }
  };

  return {
    isFetching,
    duplicateError,
    profileModify,
  };
};
