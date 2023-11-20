import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";
import { ObjectId } from "mongodb";

const forum = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const db = (await connectDB).db("forum");
    const postArr = await db.collection("post").find().toArray();

    // find the post owner's name by unique ownerId
    const promise = postArr.map(async ({ ownerId, comments }, idx) => {
      const db = (await connectDB).db("forum");
      const author = await db
        .collection("user_cred")
        .findOne({ _id: new ObjectId(ownerId) });

      postArr[idx].author = author?.name;
    });

    await Promise.all(promise);

    return res.status(200).json(postArr);
  }

  if (req.method === "POST") {
    if (!req.headers.authorization) {
      return res.status(403).json("로그인 해주세요.");
    }

    const session = await getServerSession(req, res, authOptions);

    const { title, content } = req.body;

    const createdAt = new Date();

    const db = (await connectDB).db("forum");
    if (title.trim() === "" || content.trim() === "") {
      return res.status(400).json("비어있는 항목이 존제합니다.");
    } else {
      const post = await db.collection("post").insertOne({
        createdAt,
        ownerId: session?.user.id,
        title,
        content,
        comments: [],
      });
      return res.status(200).json("게시글 등록");
    }
  }

  if (req.method === "PUT") {
    if (!req.headers.authorization) {
      return res.status(403).json("로그인 해주세요.");
    }

    const session = await getServerSession(req, res, authOptions);

    const { id, ownerId, title, content } = req.body;

    if (title.trim() === "" || content.trim() === "") {
      return res.status(400).json("비어있는 항목이 존제합니다.");
    }

    if (ownerId !== session?.user.id) {
      return res.status(403).json("게시글의 작성자가 아닙니다.");
    }

    const db = (await connectDB).db("forum");
    const result = await db.collection("post").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          title: title,
          content: content,
        },
      }
    );

    return res.status(200).json("수정 완료");
  }

  if (req.method === "DELETE") {
    if (!req.headers.authorization) {
      return res.status(403).json("로그인 해주세요.");
    }

    const session = await getServerSession(req, res, authOptions);

    const id = req.query.id?.toString();

    const db = (await connectDB).db("forum");

    // 쿼리로 글작성자의 ownerId 를 받오면 위험하므로 별도로 DB에서 받아옴
    const postOrigin = await db
      .collection("post")
      .findOne({ _id: new ObjectId(id) });

    if (session?.user.id !== postOrigin?.ownerId) {
      return res.status(403).json("게시글의 작성자가 아닙니다.");
    }

    const deletePost = await db
      .collection("post")
      .deleteOne({ _id: new ObjectId(id) });

    return res.status(200).json("삭제됨");
  }

  return res.status(500).json("server error");
};

// const userAuthenticator = async (
//   accessToken: string | undefined,
//   provider: string
// ) => {
//   // 일반 회원가입 유저는 accessToken 발급 API 가 없으므로 true 반환
//   if (provider === "credentials") {
//     return true;
//   } else if (provider === "github") {
//     const res = fetch("https://api.github.com/octocat", {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "X-GitHub-Api-Version": "2022-11-28",
//       },
//     });

//     const isAuthenticated = await res;
//     return isAuthenticated;
//   } else if (provider === "google") {
//     const res = fetch(
//       `https://oauth2.googleapis.com/tokeninfo?$id_token=${accessToken}`
//     );

//     const isAuthenticated = await res;
//     return isAuthenticated;
//   }
// };

export default forum;
