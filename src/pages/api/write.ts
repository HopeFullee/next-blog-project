import { connectDB } from "@/util/database";

connectDB;

const write = async (req, res) => {
  if (req.method === "POST") {
    const db = (await connectDB).db("forum");
    const { title, content } = req.body;

    const post = await db.collection("post").insertOne({
      title,
      content,
    });
  }

  return res.status(200).json("등록완료");
};

export default write;
