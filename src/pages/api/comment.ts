import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { connect } from "http2";

const comment = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    if (!req.headers.authorization) {
      return res.status(403).json("접근 권한이 없습니다.");
    }

    const { postId, commenterId, comment } = req.body;

    if (comment.trim() === "") return res.status(400).json("*필수 항목입니다.");

    const createdAt = new Date();

    const db = (await connectDB).db("forum");
    const result = await db.collection("post").updateOne(
      { _id: new ObjectId(postId) },
      {
        $push: {
          comments: {
            _id: new ObjectId(),
            commenterId,
            comment,
            createdAt,
          },
        },
      }
    );

    return res.status(200).json("댓글 등록 완료.");
  }

  if (req.method === "PUT") {
    if (!req.headers.authorization) {
      return res.status(403).json("접근 권한이 없습니다.");
    }

    const { postId, commentId, comment } = req.body;

    const db = (await connectDB).db("forum");
    const result = await db.collection("post").updateOne(
      { _id: new ObjectId(postId) },
      {
        $set: {
          "comments.$[element].comment": comment,
        },
      },
      {
        arrayFilters: [{ "element._id": new ObjectId(commentId) }],
      }
    );

    return res.status(200).json("댓글 수정 완료.");
  }

  if (req.method === "DELETE") {
    if (!req.headers.authorization) {
      return res.status(403).json("접근 권한이 없습니다.");
    }

    const postId = req.query.postId?.toString();
    const commentId = req.query.commentId?.toString();

    const db = (await connectDB).db("forum");
    const result = await db.collection("post").updateOne(
      { _id: new ObjectId(postId) },
      {
        $pull: {
          comments: {
            _id: new ObjectId(commentId),
          },
        },
      }
    );

    return res.status(200).json("댓글 삭제 완료.");
  }
};

export default comment;
