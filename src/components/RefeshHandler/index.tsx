"use client";

import { useSession } from "next-auth/react";

const RefreshHandler = () => {
  const { data: session } = useSession();

  console.log(session);

  return <></>;
};

export default RefreshHandler;
