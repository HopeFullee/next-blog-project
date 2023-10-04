"use client";

import { useEffect } from "react";

const RedirectToSignIn = () => {
  useEffect(() => {
    window.location.replace("/signin");
  }, []);

  return <></>;
};

export default RedirectToSignIn;
