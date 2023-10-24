"use client";

import { PostType } from "@/types/post";
import TableRow from "./TableRow";

interface Props {
  postList: PostType[];
}

const ForumTable = ({ postList }: Props) => {
  return (
    <table className="w-full table-fixed mt-100">
      <thead>
        <tr className="under:font-semibold text-cyan-400 under:p-10 border-cyan-500/40 border-b-1">
          <th className="w-[50%]">title</th>
          <th className="w-[15%]">author</th>
          <th className="w-[15%]">date</th>
          <th className="w-[8%]">views</th>
        </tr>
      </thead>
      <tbody>
        {postList.map((rest, idx) => {
          return <TableRow key={idx} {...rest} />;
        })}
      </tbody>
    </table>
  );
};

export default ForumTable;
