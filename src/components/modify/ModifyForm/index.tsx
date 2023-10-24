"use client";

import Link from "next/link";
import { useState } from "react";
import { useForumModify } from "@/hooks/useForumModify";
import CustomInput from "@/components/shared/CustomInput";
import CustomTextArea from "@/components/shared/CustomTextArea";

type InputElements = HTMLInputElement | HTMLTextAreaElement;

export interface PostModify {
  id: string;
  title: string;
  content: string;
}

const ModifyForm = ({ id, title, content }: PostModify) => {
  const { modify, isFetching } = useForumModify();

  const [postData, setPostData] = useState({
    id: id,
    title: title,
    content: content,
  });

  const [regexWarning, setRegexWarning] = useState({
    title: "",
    content: "",
  });

  const regexErrorSet = (formkey: string, errorMsg: string) => {
    setRegexWarning((prev) => ({ ...prev, [formkey]: errorMsg }));
  };

  const handleChange = (e: React.ChangeEvent<InputElements>) => {
    // controlled input
    const { name, value } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));

    // if input field is null -> trigger regexState to show warning
    if (value.trim() === "") {
      regexErrorSet(name, "*필수 항목입니다.");
    } else {
      regexErrorSet(name, "");
    }
  };

  const formValidator = () => {
    const emptyFormKeyList: string[] = [];

    Object.entries(postData).forEach(([key, value]) => {
      if (value?.trim() === "") emptyFormKeyList.push(key);
    });

    return emptyFormKeyList;
  };

  const handleModifyClick = () => {
    const emptyFormKeyList = formValidator();

    emptyFormKeyList.forEach((formkey) => {
      regexErrorSet(formkey, "*필수 항목입니다.");
    });

    if (emptyFormKeyList.length !== 0) return;

    modify(postData);
  };

  return (
    <div>
      <div className="mx-auto flex-col-center mt-100 max-w-400">
        <h4 className="font-semibold text-18">게시글 수정</h4>
        <form
          onSubmit={(e) => e.preventDefault()}
          method="POST"
          className="w-full gap-40 mt-40 flex-col-center"
        >
          <div className="flex justify-between w-full">
            <label
              htmlFor="forum-title"
              className="mt-6 font-semibold text-15 w-50"
            >
              제목
            </label>
            <CustomInput
              id="forum-title"
              name="title"
              type="text"
              placeholder="글 제목"
              onChange={(e) => handleChange(e)}
              value={postData.title}
              regexWarning={regexWarning.title}
            />
          </div>
          <div className="flex justify-between w-full">
            <label
              htmlFor="forum-content"
              className="mt-6 font-semibold text-15 w-50"
            >
              내용
            </label>
            <CustomTextArea
              id="forum-content"
              name="content"
              placeholder="본문 내용"
              onChange={(e) => handleChange(e)}
              value={postData.content}
              regexWarning={regexWarning.content}
            />
          </div>
          <div className="flex justify-end w-full font-semibold gap-15 under:px-15 under:py-6 under:bg-cyan-500/25 text-14 under:rounded-sm hover:under:text-cyan-400">
            <Link href={`/detail/${id}`}>Cancel</Link>
            <button
              onClick={handleModifyClick}
              disabled={isFetching}
              type="button"
            >
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModifyForm;
