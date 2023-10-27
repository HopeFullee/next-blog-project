"use client";

import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

interface Props {
  session?: Session | null;
}

const Header = ({ session }: Props) => {
  return (
    <header className="p-20 shadow-md shadow-cyan-500/50">
      <nav className="flex justify-between mx-auto max-w-1000">
        <ul className="flex gap-20 font-medium text-20 hover:under:text-cyan-400">
          <li>
            <Link href={"/"}>MyForum</Link>
          </li>
          <li>
            <Link href={"/forum"}>Forum</Link>
          </li>
          {session && (
            <li>
              <Link href={"/post"}>Post</Link>
            </li>
          )}
        </ul>
        {session ? (
          <div className="flex items-center gap-20 text-18">
            <p className="font-medium text-cyan-400">{session.user?.name}</p>
            <Link className="font-medium hover:text-cyan-400" href={"/profile"}>
              My Page
            </Link>
            <button
              onClick={() => signOut()}
              className="font-medium hover:text-cyan-400"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <button
            onClick={() => signIn()}
            className="font-medium text-18 hover:text-cyan-400"
          >
            Sign In
          </button>
        )}
      </nav>
    </header>
  );
};

export default Header;
