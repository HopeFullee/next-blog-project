"use client";

import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { PostDetail } from "@/app/detail/[id]/page";

interface Props extends PostDetail {
  isPostOwner: boolean;
}

const DetailContent = ({ _id, author, title, content, isPostOwner }: Props) => {
  return (
    <>
      <ul className="flex flex-col w-full gap-20 max-w-400 mt-100 ">
        <p className="font-semibold text-center text-18">상세 페이지</p>
        {isPostOwner && (
          <li className="flex justify-end gap-10 font-semibold text-14 under:px-20 under:py-6 under:rounded-sm">
            <Link
              className="bg-cyan-500/25 hover:text-cyan-400"
              href={`/modify/${_id}`}
            >
              Edit
            </Link>
            <DeleteButton id={_id} />
          </li>
        )}
        <li className="px-5 py-10 border-b-2 border-cyan-500/40">
          <h4 className="break-words">{title}</h4>
        </li>
        <li className="px-5 py-10 border-b-2 border-cyan-500/40">
          <p className="w-full break-words">{content}</p>
        </li>
      </ul>
    </>
  );
};

export default DetailContent;
