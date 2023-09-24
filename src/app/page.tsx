"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Home() {
  const { data: session } = useSession();

  console.log(session);

  return <></>;
}
