import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

const usePostInfo = async (id: ObjectId) => {
  const db = (await connectDB).db("forum");
  const postInfo = await db
    .collection("post")
    .findOne({ _id: new ObjectId(id) });

  return { postInfo };
};

export default usePostInfo;
