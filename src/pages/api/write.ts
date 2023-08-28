import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";

const write = async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, content } = req.body;

  if (req.method === "POST") {
    const db = (await connectDB).db("forum");
    if (title.trim() === "" || content.trim() === "") {
      return res.status(400).json("비어있는 항목이 존제합니다.");
    } else {
      const post = await db.collection("post").insertOne({
        title,
        content,
      });
      return res.redirect(302, "/list");
    }
  }
  return res.status(500).send("I messed up");
};

export default write;
