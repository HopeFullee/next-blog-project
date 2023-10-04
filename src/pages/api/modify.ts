import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

const modify = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) return res.status(403).json("접근 권한이 없습니다.");

  const { id, title, content } = req.body;
  if (req.method === "PUT") {
    if (title.trim() === "" || content.trim() === "") {
      return res.status(400).json("비어있는 항목이 존제합니다.");
    }

    const db = (await connectDB).db("forum");
    const result = await db.collection("post").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          title: title,
          content: content,
        },
      }
    );

    return res.status(200).json("수정 완료");
  }
  return res.status(500).json("somthing went wrong");
};

export default modify;
