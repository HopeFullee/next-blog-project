"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

const RefreshHandler = () => {
  const { data: session } = useSession();

  // useEffect(()=> {
  //   if(session? === "RefreshAccessTokenError"){
  //     signIn();
  //   }
  // }, [session])

  return <></>;
};

export default RefreshHandler;
