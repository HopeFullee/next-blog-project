"use client";

import { useEffect } from "react";

type Props = {
  href: string;
};

const RedirectTo = ({ href }: Props) => {
  useEffect(() => {
    window.location.replace(href);
  }, []);

  return <></>;
};

export default RedirectTo;
