import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import axios from "axios";

// const setToken = async () => {
//   const session = await getServerSession(authOptions);
// };

const BASE_URL = "http://localhost:3000";

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    common: { Authorization: "asdasd" },
    post: { "Content-Type": "application/json" },
  },
});
