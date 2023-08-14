import { connectDB } from "@/util/database";
import Image from "next/image";

export default async function Home() {
  const client = await connectDB;
  const db = client.db("forum");

  const res = await db.collection("post").find().toArray();
  console.log(res);
  return <></>;
}
