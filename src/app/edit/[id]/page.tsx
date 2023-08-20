import { connectDB } from "@/util/database";
import { ObjectIdLike } from "bson";
import { ObjectId } from "mongodb";

const EditPage = async (props: {
  params: {
    id: string | number | ObjectId | ObjectIdLike | Uint8Array | undefined;
  };
}) => {
  const db = (await connectDB).db("forum");
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });

  return (
    <section className="flex-center">
      <ul className="flex flex-col w-full gap-20 max-w-400 mt-100">
        <p className="font-semibold text-center text-18">상세 페이지</p>

        <li className="p-5 border-gray-400 border-b-1">
          <input type="text" value={result?.title} />
        </li>
        <li className="p-5 border-gray-400 border-b-1">
          <textarea name="" id="" value={result?.content}></textarea>
        </li>
      </ul>
    </section>
  );
};

export default EditPage;
