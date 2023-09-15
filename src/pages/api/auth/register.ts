import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

const emailRe = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passwordRe = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

const handleRegister = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === "POST") {
      let { email, password, confirmPassword } = JSON.parse(req.body);

      // check regular expression for Email and Password
      if (!emailRe.exec(email) || !passwordRe.exec(password)) {
        return res
          .status(400)
          .json("이메일 또는 비밀번호의 형식이 틀렸습니다.");
      }

      // check password is same with confirm password
      if (password !== confirmPassword) {
        return res.status(400).json("비밀번호 확인이 일치하지 않습니다.");
      }

      const db = (await connectDB).db("forum");

      // check for any overlapping emails on DB
      const duplicateEmail = await db
        .collection("user_cred")
        .findOne({ email: email });

      if (duplicateEmail?.email === email) {
        return res.status(400).json({
          ["email"]: "*사용할수 없는 이메일입니다.",
        });
      }

      // hash password with bycrpt
      password = await bcrypt.hash(password, 10);

      const userRole = "normal";

      const registerUser = await db
        .collection("user_cred")
        .insertOne({ email, password, userRole });

      return res.status(200).json("회원가입 완료");
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default handleRegister;
