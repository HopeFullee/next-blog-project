import { PostType } from "@/types/post";
import Link from "next/link";
import { useEffect } from "react";

const TableRow = ({ _id, title, author, createdAt }: PostType) => {
  const date = new Date(createdAt);
  const browserLocale = window.navigator.language;
  const dateFormatter = new Intl.DateTimeFormat(browserLocale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const newDate = new Date();

  console.log(newDate);
  console.log(createdAt);

  const formattedDate = dateFormatter
    .format(date)
    .replace(/\. /gi, "-")
    .replace(/\./gi, "");

  return (
    <tr className="text-center border-b-2 rounded-sm under:p-10 h-50 border-cyan-500/40 under:overflow-hidden under:whitespace-nowrap under:text-ellipsis">
      <td className="text-left">
        <Link href={`/detail/${_id}`}>{title}</Link>
      </td>
      <td>{author}</td>
      <td>{formattedDate}</td>
      <td>9852</td>
    </tr>
  );
};

export default TableRow;
