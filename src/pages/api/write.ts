import { connectDB } from "@/util/database";

connectDB;

const write = async (req, res) => {
  if (req.method === "POST") {
    const db = (await connectDB).db("forum");
    const { title, content } = req.body;

    if (title.trim() === "" || content.trim() === "") {
      return res.status(500).json("비어있는 항목이 존제합니다.");
    } else {
      const post = await db.collection("post").insertOne({
        title,
        content,
      });

      return res.status(200).redirect("/list");
    }
  }
};

export default write;
