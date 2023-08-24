import { connectDB } from "@/util/database";
import { ObjectIdLike } from "bson";
import { ObjectId } from "mongodb";
import Link from "next/link";

const DetailPage = async (props: {
  params: {
    id: string | number | ObjectId | ObjectIdLike | Uint8Array | undefined;
  };
}) => {
  const db = (await connectDB).db("forum");
  const result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });

  return (
    <section className="flex-center">
      <ul className="flex flex-col w-full gap-20 max-w-400 mt-100">
        <p className="font-semibold text-center text-18">상세 페이지</p>
        <li className="flex justify-end gap-10 font-semibold text-14 under:border-1 under:border-black under:px-10 under:py-2 under:rounded-sm">
          <Link href={`/edit/${result?._id}`}>수정</Link>
          <Link href={"/"}>삭제</Link>
        </li>
        <li className="p-5 border-gray-400 border-b-1">
          <h4 className="break-words">{result?.title}</h4>
        </li>
        <li className="p-5 border-gray-400 border-b-1">
          <p>{result?.content}</p>
        </li>
      </ul>
    </section>
  );
};

export default DetailPage;
