import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";

const listHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const db = (await connectDB).db("forum");
    const result = await db.collection("post").find().toArray();

    return res.status(200).json(result);
  }
};

export default listHandler;
