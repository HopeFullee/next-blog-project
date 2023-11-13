"use client";

import CustomTextArea from "@/components/shared/CustomTextArea";
import useCommentModify from "@/hooks/comment/useCommentModify";
import useCommentDelete from "@/hooks/comment/useCommentDelete";
import { useState } from "react";

interface Props {
  postId: string;
  commentId: string;
  comment: string;
}

const CommentModify = ({ postId, commentId, comment }: Props) => {
  const { isFetching, commentModify } = useCommentModify();
  const { isFetching: isDeleteing, commentDelete } = useCommentDelete();

  const [modifiedCommentData, setModifiedCommentData] = useState(comment);
  const [regexWarning, setRegexWarning] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setModifiedCommentData(value);

    if (value.trim() === "") setRegexWarning("*필수 항목입니다.");
    else setRegexWarning("");
  };

  const handleModifyClick = () => {
    if (regexWarning) return;

    commentModify(modifiedCommentData, commentId, postId);
  };

  const handleDeleteClick = () => {
    commentDelete(commentId, postId);
  };

  return (
    <>
      <div className="flex flex-col gap-10 mt-10">
        <CustomTextArea
          name="comment"
          value={modifiedCommentData}
          onChange={(e) => handleChange(e)}
          height={"h-70"}
          regexWarning={regexWarning}
        />
        <div className="flex justify-end gap-10 font-semibold under:py-5 under:px-12 text-13 under:bg-cyan-500/25 hover:under:text-cyan-400 under:rounded-sm">
          <button onClick={handleDeleteClick} disabled={isDeleteing}>
            Delete
          </button>
          <button onClick={handleModifyClick} disabled={isFetching}>
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default CommentModify;
