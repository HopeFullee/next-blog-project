"use client";

import { useMemo } from "react";

interface Props {
  commenter: string;
  comment: string;
  createdAt: string;
}

const CommentList = ({ commenter, comment, createdAt }: Props) => {
  const commentDate = useMemo(() => {
    const date = new Date(createdAt);
    const browserLocale =
      typeof window !== "undefined" ? window.navigator.language : undefined;
    const dateFormatter = new Intl.DateTimeFormat(browserLocale, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    const formattedDate = dateFormatter
      .format(date)
      .replace(/(?!-)[^0-9.:]/g, "")
      .replace(/\./g, ". ");

    return formattedDate;
  }, []);

  return (
    <li className="p-5 py-10 border-b-1 border-cyan-500/40">
      <div className="flex justify-between text-15">
        <p>{commenter}</p>
        <div className="gap-10 flex-center">
          <p>{commentDate}</p>
          <button className="px-5 py-1 font-semibold tracking-wider rounded-sm bg-cyan-500/25 text-14">
            EDIT
          </button>
        </div>
      </div>
      <p className="mt-10 font-light tracking-wide break-all">{comment}</p>
    </li>
  );
};

export default CommentList;
