"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

const Header = ({ session }: any) => {
  return (
    <header className="p-20 shadow-md shadow-cyan-500/50">
      <nav className="flex justify-between mx-auto max-w-1200">
        <ul className="flex gap-20 font-medium text-20">
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
          <div className="flex items-center gap-20">
            <p className="font-medium text-cyan-500 text-18">
              {session.user?.name}
            </p>
            <button onClick={() => signOut()} className="font-medium text-18">
              Sign Out
            </button>
          </div>
        ) : (
          <>
            <button onClick={() => signIn()} className="font-medium text-18">
              Sign In
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
