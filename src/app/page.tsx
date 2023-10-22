"use client";

import axios from "@/lib/axios";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, update } = useSession();

  console.log(session);

  return (
    <section className="mx-auto max-w-1200">
      <div className="gap-30 mt-100 flex-col-center">
        <h1 className="font-semibold text-36">Welcome To My Forum</h1>
        <ul className="gap-10 text-20 flex-col-center">
          <li className="font-medium text-30">Frameworks & DB</li>
          <li>Next.js 13</li>
          <li>MongoDB</li>
        </ul>
        <ul className="gap-10 text-20 flex-col-center">
          <li className="font-medium text-30">Librarys</li>
          <li>Next-Auth</li>
          <li>Axios</li>
          <li>Tailwind CSS</li>
        </ul>
      </div>
    </section>
  );
}
