import { PostType } from "@/types/post";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const postDetail = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const id = req.query.id?.toString();

    const db = (await connectDB).db("forum");
    const result = await db
      .collection("post")
      .findOne({ _id: new ObjectId(id) });

    return res.status(200).json(result);
  }
};

export default postDetail;
