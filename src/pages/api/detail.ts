import { PostType } from "@/types/post";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

const postDetail = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const id = req.query.id?.toString();

    const db = (await connectDB).db("forum");
    const postDetail = await db
      .collection("post")
      .findOne({ _id: new ObjectId(id) });

    // find the post owner's name by unique ownerId
    const author = await db
      .collection("user_cred")
      .findOne({ _id: new ObjectId(postDetail?.ownerId) });

    if (postDetail) postDetail.author = author?.name;

    return res.status(200).json(postDetail);
  }
};

export default postDetail;
