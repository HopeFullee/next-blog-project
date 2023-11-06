import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

const postDetail = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const id = req.query.id?.toString();

    const db = (await connectDB).db("forum");
    const postDetail = await db
      .collection("post")
      .findOne({ _id: new ObjectId(id) });

    if (!postDetail) return res.status(404).json("포스트가 존제하지 않습니다.");

    const { ownerId, comments } = postDetail;

    // find the post owner's name by unique ownerId
    const author = await db
      .collection("user_cred")
      .findOne({ _id: new ObjectId(ownerId) });

    postDetail.author = author?.name;

    // find the commenter's name by unique commenterId
    const promise = comments.map(async ({ commenterId }: any, idx: number) => {
      const result = await db
        .collection("user_cred")
        .findOne({ _id: new ObjectId(commenterId) });

      comments[idx].commenter = result?.name;
    });

    await Promise.all(promise);

    return res.status(200).json(postDetail);
  }
};

export default postDetail;
