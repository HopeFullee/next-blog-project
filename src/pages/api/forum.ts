import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { ObjectId } from "mongodb";

const forum = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const db = (await connectDB).db("forum");
    const result = await db.collection("post").find().toArray();

    return res.status(200).json(result);
  }

  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(403).json("접근 권한이 없습니다.");

    req.body.author = session.user?.email;

    const { title, content, author } = req.body;

    const createdAt = new Date();

    const db = (await connectDB).db("forum");
    if (title.trim() === "" || content.trim() === "") {
      return res.status(400).json("비어있는 항목이 존제합니다.");
    } else {
      const post = await db.collection("post").insertOne({
        createdAt,
        author,
        title,
        content,
      });
      return res.status(200).json("게시글 등록");
    }
  }

  if (req.method === "PUT") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(403).json("접근 권한이 없습니다.");

    const { id, title, content } = req.body;

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

  if (req.method === "DELETE") {
    const session = await getServerSession(req, res, authOptions);
    if (!session) return res.status(403).json("접근 권한이 없습니다.");

    const id = req.query.id?.toString();

    const db = (await connectDB).db("forum");
    const postOrigin = await db
      .collection("post")
      .findOne({ _id: new ObjectId(id) });

    if (session.user?.email === postOrigin?.author) {
      const db = (await connectDB).db("forum");
      const deletePost = await db
        .collection("post")
        .deleteOne({ _id: new ObjectId(id) });

      return res.status(200).json("삭제됨");
    }
  }

  return res.status(500).json("server error");
};

export default forum;
