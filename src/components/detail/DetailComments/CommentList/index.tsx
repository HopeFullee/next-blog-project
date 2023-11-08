"use client";

import { Session } from "next-auth";
import { useMemo, useState } from "react";
import useCommentModify from "@/hooks/comment/useCommentModify";
import CustomTextArea from "@/components/shared/CustomTextArea";

interface Props {
  session: Session | null;
  postId: string;
  _id: string;
  commenter: string;
  comment: string;
  createdAt: string;
}

const CommentList = ({
  _id: commentId,
  postId,
  commenter,
  comment,
  createdAt,
  session,
}: Props) => {
  const { isFetching, commentModify } = useCommentModify();

  const [editMode, setEditMode] = useState(false);
  const [modifiedCommentData, setModifiedCommentData] = useState(comment);
  const [regexWarning, setRegexWarning] = useState("");

  const commentDate = useMemo(() => {
    const date = new Date(createdAt);
    const browserLocale =
      typeof window !== "undefined" ? window.navigator.language : undefined;
    const dateFormatter = new Intl.DateTimeFormat(browserLocale, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    const formattedDate = dateFormatter
      .format(date)
      .replace(/(?!-)[^0-9.:]/g, "")
      .replace(/\./g, ". ");

    return formattedDate;
  }, []);

  const isCommentOwner = session?.user.name === commenter;

  const editModeClick = () => {
    setEditMode((prev) => !prev);

    if (editMode) {
      setModifiedCommentData(comment);
      setRegexWarning("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setModifiedCommentData(value);

    if (value.trim() === "") setRegexWarning("*필수 항목입니다.");
    else setRegexWarning("");
  };

  const handleModifySubmit = () => {
    if (regexWarning) return;

    commentModify(modifiedCommentData, commentId, postId);
  };

  return (
    <li className="p-5 py-10 border-b-1 border-cyan-500/40">
      <div className="flex justify-between text-15">
        <p>{commenter}</p>
        <div className="gap-10 flex-center">
          <p>{commentDate}</p>
          {isCommentOwner && (
            <button
              onClick={editModeClick}
              className="px-5 py-2 font-semibold tracking-wider rounded-sm bg-cyan-500/25 text-12"
            >
              {editMode ? "CANCEL" : "EDIT"}
            </button>
          )}
        </div>
      </div>
      {editMode ? (
        <div className="flex flex-col gap-10 mt-10">
          <CustomTextArea
            name="comment"
            value={modifiedCommentData}
            onChange={(e) => handleChange(e)}
            height={"h-70"}
            regexWarning={regexWarning}
          />
          <div className="flex justify-end gap-10 font-semibold under:py-5 under:px-12 text-13 under:bg-cyan-500/25 hover:under:text-cyan-400 under:rounded-sm">
            <button>Delete</button>
            <button onClick={handleModifySubmit} disabled={isFetching}>
              Submit
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-10 font-light tracking-wide break-all">{comment}</p>
      )}
    </li>
  );
};

export default CommentList;
