import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

const handleLogin = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    let { credEmail, credPassword } = req.body;

    const db = (await connectDB).db("forum");
    const user = await db.collection("user_cred").findOne({ email: credEmail });

    if (!user) {
      return res.status(400).json("이메일 없음");
    }

    const pwCheck = await bcrypt.compare(credPassword, user.password);

    if (!pwCheck) {
      return res.status(400).json("비번 틀림");
    }

    return res.status(200).json(user);
  }
};

export default handleLogin;
