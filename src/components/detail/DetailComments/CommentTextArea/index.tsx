"use client";
import { useState } from "react";
import useComment from "@/hooks/useComment";
import CustomTextArea from "@/components/shared/CustomTextArea";

export interface CommentData {
  comment: string;
}

interface Props {
  postId: string;
}

const CommentTextArea = ({ postId }: Props) => {
  const { isFetching, addComment } = useComment();

  const [commentData, setCommentData] = useState<CommentData>({
    comment: "",
  });

  const [regexWarning, setRegexWarning] = useState({
    comment: "",
  });

  const regexErrorSet = (formKey: string, errorMsg: string) => {
    setRegexWarning((prev) => ({ ...prev, [formKey]: errorMsg }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setCommentData((prev) => ({ ...prev, [name]: value }));
  };

  const formValidator = () => {
    const emptyFormKeyList: string[] = [];

    Object.entries(commentData).forEach(([key, value]) => {
      if (value.trim() === "") emptyFormKeyList.push(key);
    });

    return emptyFormKeyList;
  };

  const handleSubmit = () => {
    const emptyFormKeyList = formValidator();

    emptyFormKeyList.forEach((formKey) => {
      regexErrorSet(formKey, "*필수 항목입니다.");
    });

    if (emptyFormKeyList.length !== 0) return;

    addComment(commentData, postId);
  };

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
        value={commentData.comment}
        regexWarning={regexWarning.comment}
      />
      <button
        className="py-6 font-semibold rounded-sm px-15 bg-cyan-500/25 text-14 hover:under:text-cyan-400"
        onClick={handleSubmit}
        disabled={isFetching}
      >
        Submit
      </button>
    </form>
  );
};

export default CommentTextArea;
