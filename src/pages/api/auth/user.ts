import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "./[...nextauth]";

const user = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    const session = await getServerSession(req, res, authOptions);
    const { name } = req.body;

    const db = (await connectDB).db("forum");
    const result = await db.collection("user_cred").updateOne(
      { _id: new ObjectId(session?.user.id) },
      {
        $set: {
          name: name,
        },
      }
    );

    return res.status(200).json("게시글 등록");
  }

  return res.status(500).json("server error");
};

export default user;
