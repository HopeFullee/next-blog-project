import Link from "next/link";
import DeleteButton from "@/components/detail/DeleteButton";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const dynamic = "force-dynamic";

const DetailPage = async (props: {
  params: {
    id: string;
  };
}) => {
  const queryString = new URLSearchParams({ id: props.params.id }).toString();

  const response = await fetch(
    "http://localhost:3000/api/detail?" + queryString
  );

  const postDetail = await response.json();

  const session = await getServerSession(authOptions);

  return (
    <section className="flex-center">
      <ul className="flex flex-col w-full gap-20 max-w-400 mt-100">
        <p className="font-semibold text-center text-18">상세 페이지</p>
        {postDetail.author === session?.user?.email && (
          <li className="flex justify-end gap-10 font-semibold text-14 under:border-1 under:border-black under:px-10 under:py-2 under:rounded-sm">
            <Link href={`/edit/${postDetail._id}`}>수정</Link>
            <DeleteButton
              id={postDetail._id.toString()}
              author={postDetail.author}
            />
          </li>
        )}
        <li className="p-5 border-gray-400 border-b-1">
          <h4 className="break-words">{postDetail.title}</h4>
        </li>
        <li className="p-5 border-gray-400 border-b-1">
          <p>{postDetail?.content}</p>
        </li>
      </ul>
    </section>
  );
};

export default DetailPage;
