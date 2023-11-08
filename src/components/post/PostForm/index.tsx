"use client";

import Link from "next/link";
import { useState } from "react";
import { useForumPost } from "@/hooks/forum/useForumPost";
import CustomInput from "@/components/shared/CustomInput";
import CustomTextArea from "@/components/shared/CustomTextArea";

type InputElements = HTMLInputElement | HTMLTextAreaElement;

export interface PostData {
  title: string;
  content: string;
}

const PostForm = () => {
  const { post, isFetching } = useForumPost();

  const [postData, setPostData] = useState({
    title: "",
    content: "",
  });

  const [regexWarning, setRegexWarning] = useState({
    title: "",
    content: "",
  });

  const regexErrorSet = (formKey: string, errorMsg: string) => {
    setRegexWarning((prev) => ({
      ...prev,
      [formKey]: errorMsg,
    }));
  };

  const handleChange = (e: React.ChangeEvent<InputElements>) => {
    // controlled input & set(change) parent's form data state
    const { name, value } = e.target;
    setPostData((prev: any) => ({ ...prev, [name]: value }));

    if (value.trim() === "") {
      regexErrorSet(name, "*필수 항목입니다");
    } else {
      regexErrorSet(name, "");
    }
  };

  const formValidator = () => {
    const emptyFormKeyList: string[] = [];

    Object.entries(postData).forEach(([key, value]) => {
      if (value.trim() === "") emptyFormKeyList.push(key);
    });

    return emptyFormKeyList;
  };

  const handlePostClick = async () => {
    const emptyFormKeyList = formValidator();

    emptyFormKeyList.forEach((formkey) => {
      regexErrorSet(formkey, "*필수 항목입니다");
    });

    if (emptyFormKeyList.length !== 0) return;

    post(postData);
  };

  return (
    <div>
      <div className="mx-auto flex-col-center mt-100 max-w-400">
        <h4 className="font-semibold text-18">Forum Post</h4>
        <form
          onSubmit={(e) => e.preventDefault}
          className="w-full mt-40 gap-30 flex-col-center"
        >
          <div className="flex justify-between w-full">
            <label
              htmlFor="forum-title"
              className="mt-6 font-semibold w-50 text-15"
            >
              제목
            </label>
            <CustomInput
              id="forum-title"
              name="title"
              type="text"
              placeholder="제목을 입력해주세요."
              onChange={(e) => handleChange(e)}
              value={postData.title}
              regexWarning={regexWarning.title}
            />
          </div>
          <div className="flex justify-between w-full">
            <label
              htmlFor="forum-content"
              className="mt-6 font-semibold w-50 text-15"
            >
              내용
            </label>
            <CustomTextArea
              id="forum-content"
              name="content"
              height="h-200"
              placeholder="내용을 입력해주세요."
              onChange={(e) => handleChange(e)}
              value={postData.content}
              regexWarning={regexWarning.content}
            />
          </div>
          <div className="flex justify-end w-full font-semibold gap-15 under:px-15 under:py-6 under:bg-cyan-500/25 text-14 under:rounded-sm hover:under:text-cyan-400">
            <Link href="/forum">Cancel</Link>
            <button
              type="button"
              disabled={isFetching}
              onClick={handlePostClick}
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
