"use client";

import { useState } from "react";
import { Session } from "next-auth";
import useCommentPost from "@/hooks/comment/useCommentPost";
import CustomTextArea from "@/components/shared/CustomTextArea";

interface Props {
  postId: string;
  session: Session | null;
}

const CommentTextArea = ({ postId, session }: Props) => {
  const { isFetching, addComment } = useCommentPost();

  const [commentData, setCommentData] = useState("");

  const [regexWarning, setRegexWarning] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setCommentData(value);

    if (value.trim() === "") setRegexWarning("*필수 항목입니다.");
    else setRegexWarning("");
  };

  const handleSubmit = () => {
    if (commentData.trim() === "") {
      setRegexWarning("*필수 항목입니다.");
      return;
    }

    addComment(commentData, postId);
  };

  if (session)
    return (
      <form
        className="flex flex-col items-end gap-10 mt-15"
        onSubmit={(e) => e.preventDefault()}
      >
        <CustomTextArea
          name="comment"
          height="h-80"
          placeholder="댓글을 입력해주세요."
          onChange={(e) => handleChange(e)}
          value={commentData}
          regexWarning={regexWarning}
        />
        <button
          className="py-6 font-semibold rounded-sm px-15 bg-cyan-500/25 text-14 hover:text-cyan-400"
          onClick={handleSubmit}
          disabled={isFetching}
        >
          Submit
        </button>
      </form>
    );
};

export default CommentTextArea;
