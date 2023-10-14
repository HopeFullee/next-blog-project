"use client";
import { PostType } from "@/types/post";
import Link from "next/link";
import { useMemo } from "react";

const TableRow = ({ _id, title, author, createdAt }: PostType) => {
  // 날짜 수정 로직은 없음으로 최초 1회만 ISO 날짜 포맷 변환후 캐싱된 날짜 데이터 재활용.
  const postDate = useMemo(() => {
    const date = new Date(createdAt);
    const browserLocale =
      typeof window !== "undefined" ? window.navigator.language : undefined;
    const dateFormatter = new Intl.DateTimeFormat(browserLocale, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const formattedDate = dateFormatter
      .format(date)
      .replace(/\. /gi, "-")
      .replace(/\./gi, "");

    return formattedDate;
  }, []);

  return (
    <tr className="text-center border-b-2 rounded-sm under:p-10 h-50 border-cyan-500/40 under:overflow-hidden under:whitespace-nowrap under:text-ellipsis">
      <td className="text-left">
        <Link href={`/detail/${_id}`}>{title}</Link>
      </td>
      <td>{author}</td>
      <td>{postDate}</td>
      <td>77</td>
    </tr>
  );
};

export default TableRow;
