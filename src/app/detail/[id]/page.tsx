import { connectDB } from "@/util/database";
import { ObjectIdLike } from "bson";
import { ObjectId } from "mongodb";

const DetailPage = async (props: {
  params: {
    id: string | number | ObjectId | ObjectIdLike | Uint8Array | undefined;
  };
}) => {
  const db = (await connectDB).db("forum");
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });

  return (
    <>
      <p>상세 페이지</p>
      <h4>글제목: {result?.title}</h4>
      <p>글내용: {result?.content}</p>
    </>
  );
};

export default DetailPage;
