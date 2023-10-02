import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

const forumPost = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    req.body.author = session.user?.email;
  } else {
    return res.status(401).json("로그인을 해주세요.");
  }

  const { title, content, author } = req.body;

  if (req.method === "POST") {
    const db = (await connectDB).db("forum");
    if (title.trim() === "" || content.trim() === "") {
      return res.status(400).json("비어있는 항목이 존제합니다.");
    } else {
      const post = await db.collection("post").insertOne({
        author,
        title,
        content,
      });
      return res.status(200).json("게시글 등록");
    }
  }
  return res.status(500).send("I messed up");
};

export default forumPost;
