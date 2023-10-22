"use client";

import { useSession } from "next-auth/react";

const ProfileInfo = () => {
  const { data: session } = useSession();

  return (
    <article className="mx-auto mt-100">
      <h4 className="font-semibold text-18 border-b-1 border-cyan-400/40">
        My Profile
      </h4>
      <p>{session?.user.name}</p>
    </article>
  );
};

export default ProfileInfo;
