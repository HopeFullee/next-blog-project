import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const postDeleteHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { _id } = JSON.parse(req.body);

  if (req.method === "DELETE") {
    const db = (await connectDB).db("forum");
    const result = await db
      .collection("post")
      .deleteOne({ _id: new ObjectId(_id) });

    return res.status(200).json("삭제됨");
  }

  return res.status(500).json("I fucked up");
};

export default postDeleteHandler;
