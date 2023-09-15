"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { PostDetail } from "@/app/detail/[id]/page";

const DetailContent = ({ _id, author, title, content }: PostDetail) => {
  const { data: session } = useSession();

  return (
    <>
      <ul className="flex flex-col w-full gap-20 max-w-400 mt-100">
        <p className="font-semibold text-center text-18">상세 페이지</p>
        {author === session?.user?.email && (
          <li className="flex justify-end gap-10 font-semibold text-14 under:border-1 under:border-black under:px-10 under:py-2 under:rounded-sm">
            <Link href={`/edit/${_id}`}>수정</Link>
            <DeleteButton id={_id} />
          </li>
        )}
        <li className="p-5 border-gray-400 border-b-1">
          <h4 className="break-words">{title}</h4>
        </li>
        <li className="p-5 border-gray-400 border-b-1">
          <p>{content}</p>
        </li>
      </ul>
    </>
  );
};

export default DetailContent;
