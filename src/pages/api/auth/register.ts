import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

const emailRe = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passwordRe = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

const handleRegister = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    let { email, password, confirmPassword } = JSON.parse(req.body);

    // check regular expression for Email and Password
    if (emailRe.exec(email) && passwordRe.exec(password)) {
      // check password is same with confirm password
      if (password === confirmPassword) {
        // hash password with bycrpt
        password = await bcrypt.hash(password, 10);

        const db = (await connectDB).db("forum");
        const result = db
          .collection("user_cred")
          .insertOne({ email, password, confirmPassword });

        return res.status(200).json("회원가입 완료");
      }
    }

    return res.status(500).json("서버 오류");
  }
};

export default handleRegister;
