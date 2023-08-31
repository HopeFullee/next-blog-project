import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

const write = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    req.body.author = session.user?.email;
  } else {
    return;
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
      return res.redirect(302, "/list");
    }
  }
  return res.status(500).send("I messed up");
};

export default write;
