import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

const handleLogin = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    let { credEmail, credPassword } = req.body;

    const db = (await connectDB).db("forum");
    const user = await db.collection("user_cred").findOne({ email: credEmail });

    if (!user) {
      return res
        .status(400)
        .json({ authError: "*이메일 또는 비밀번호가 틀렸습니다." });
    }

    const pwCheck = await bcrypt.compare(credPassword, user.password);

    if (!pwCheck) {
      return res
        .status(400)
        .json({ authError: "*이메일 또는 비밀번호가 틀렸습니다." });
    }

    return res.status(200).json(user);
  }
};

export default handleLogin;
