import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

const postDeleteHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(403).json("접근 권한이 없습니다.");

    const { _id } = JSON.parse(req.body);

    const db = (await connectDB).db("forum");
    const result = await db
      .collection("post")
      .findOne({ _id: new ObjectId(_id) });

    if (session.user?.email === result?.author) {
      const db = (await connectDB).db("forum");
      const result = await db
        .collection("post")
        .deleteOne({ _id: new ObjectId(_id) });

      return res.status(200).json("삭제됨");
    }
  }

  return res.status(500).json("I fucked up");
};

export default postDeleteHandler;
