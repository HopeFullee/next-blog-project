"use client";

import { useEffect } from "react";

const RedirectToForum = () => {
  useEffect(() => {
    window.location.replace("/forum");
  }, []);

  return <></>;
};

export default RedirectToForum;
