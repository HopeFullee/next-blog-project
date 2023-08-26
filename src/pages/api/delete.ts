import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

const postDeleteHandler = async (req, res) => {
  const { _id } = JSON.parse(req.body);

  if (req.method === "DELETE") {
    const db = (await connectDB).db("forum");
    const result = await db
      .collection("post")
      .deleteOne({ _id: new ObjectId(_id) });

    return res.status(200).json("삭제한듯?");
  }

  return res.status(500).json("I fucked up");
};

export default postDeleteHandler;
