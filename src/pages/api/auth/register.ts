import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";

const emailRe = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passwordRe = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

const handleRegister = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { email, password, confirmPassword } = JSON.parse(req.body);
  }
};

export default handleRegister;
