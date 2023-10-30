"use client";

import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { useMemo } from "react";
import { PostType } from "@/types/post";

interface Props extends PostType {
  isPostOwner: boolean;
}

const DetailContent = ({
  _id,
  author,
  title,
  content,
  createdAt,
  isPostOwner,
}: Props) => {
  // 날짜 수정 로직은 없음으로 최초 1회만 ISO 날짜 포맷 변환후 캐싱된 날짜 데이터 재활용.
  const postDate = useMemo(() => {
    const date = new Date(createdAt);
    // const browserLocale =
    //   typeof window !== "undefined" ? window.navigator.language : undefined;
    // const dateFormatter = new Intl.DateTimeFormat(browserLocale, {
    //   year: "numeric",
    //   month: "2-digit",
    //   day: "2-digit",
    //   hour: "2-digit",
    //   minute: "2-digit",
    // });

    // const formattedDate = dateFormatter.format(date);
    // .replace(/(?!-)[^0-9.:]/g, "")
    // .replace(/\./g, ". ");

    const addZero = (num: number) => {
      if (num < 9) {
        return "0" + num;
      }

      return num;
    };

    const year = date.getFullYear();
    const month = addZero(date.getMonth() + 1);
    const day = addZero(date.getDay());
    const hour = addZero(date.getHours());
    const minute = addZero(date.getMinutes());

    const formattedDate = `${year}. ${month}. ${day}. ${hour}:${minute}`;

    return formattedDate;
  }, []);

  return (
    <>
      <ul className="flex flex-col w-full max-w-500 mt-100 ">
        <p className="font-semibold text-center text-18">Post Detail</p>
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
        <li className="px-5 py-10 mt-20 border-b-2 border-cyan-500/40">
          <h4 className="font-semibold break-words text-20">{title}</h4>
        </li>
        <li className="px-5 py-10 border-b-2 border-cyan-500/40">
          <div className="flex justify-between font-light text-14">
            <p>{author}</p>
            <p>{postDate}</p>
          </div>
          <p className="w-full mt-20 break-words">{content}</p>
        </li>
      </ul>
    </>
  );
};

export default DetailContent;
