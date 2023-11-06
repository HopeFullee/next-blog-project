"use client";

import { useEffect, useState } from "react";
import { useProfileModify } from "@/hooks/useProfileModify";
import { Session } from "next-auth";
import CustomInput from "@/components/shared/CustomInput";

const nameRe = /^([a-z|A-Z|0-9|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]){2,12}$/;

export interface ProfileData {
  name: string | undefined;
}

interface Props {
  session: Session;
}

const ProfileForm = ({ session }: Props) => {
  const { profileModify, duplicateError, isFetching } = useProfileModify();

  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
  });

  const [regexWarning, setRegexWarning] = useState({
    name: "",
    duplicateName: "",
  });

  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (session) setProfileData({ name: session.user.name });
    setRegexWarning((prevState) => ({ ...prevState, ...duplicateError }));
  }, [duplicateError, session]);

  const regexErrorSet = (formKey: string, errorMsg: string) => {
    setRegexWarning((prev) => ({ ...prev, [formKey]: errorMsg }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));

    if (value.trim() === "") return regexErrorSet(name, "*필수 항목힙니다.");

    if (name === "name") {
      if (regexWarning.duplicateName) regexErrorSet("duplicateName", "");
      if (!nameRe.exec(value)) regexErrorSet(name, "*2~12, 영문, 한글, 숫자");
      else regexErrorSet(name, "");
    }
  };

  const editModeClick = () => {
    setEditMode((prev) => !prev);

    if (editMode) {
      setProfileData({ name: session?.user.name });
      setRegexWarning({
        name: "",
        duplicateName: "",
      });
    }
  };

  const formValidator = () => {
    const emptyFormKeyList: string[] = [];

    Object.entries(profileData).forEach(([key, value]) => {
      if (value?.trim() === "") emptyFormKeyList.push(key);
    });

    return emptyFormKeyList;
  };

  const handleSubmitClick = () => {
    const emptyFormKeyList = formValidator();

    emptyFormKeyList.forEach((formkey) => {
      regexErrorSet(formkey, "*필수 항목입니다.");
    });

    if (emptyFormKeyList.length !== 0) return;

    profileModify(profileData);
  };

  if (session)
    return (
      <article className="w-full mx-auto mt-100 max-w-340">
        <div className="flex items-center justify-between w-full px-5 py-8 font-semibold border-b-2 border-cyan-400/40">
          <h4 className="text-18">My Profile</h4>
          <button
            onClick={editModeClick}
            className="py-4 rounded-sm px-15 text-14 bg-cyan-500/25 hover:text-cyan-400"
          >
            Edit
          </button>
        </div>
        <form className="p-5" onSubmit={(e) => e.preventDefault()}>
          <div className="mt-15">
            <label
              htmlFor="user-name"
              className="font-semibold text-15 text-cyan-400"
            >
              Nick name
            </label>
            {editMode ? (
              <CustomInput
                id="user-name"
                name="name"
                type="text"
                onChange={(e) => handleChange(e)}
                value={profileData.name}
                regexWarning={regexWarning.name || regexWarning.duplicateName}
              />
            ) : (
              <p className="py-5">{session.user.name}</p>
            )}
          </div>
          <div className="mt-20">
            <label
              htmlFor="user-email"
              className="font-semibold text-15 text-cyan-400"
            >
              Email
            </label>
            <p className="py-5">{session.user.email}</p>
          </div>
          <div className="mt-20">
            <label
              htmlFor="user-provider"
              className="font-semibold text-15 text-cyan-400"
            >
              Provider
            </label>
            <p className="py-5">{session.provider}</p>
          </div>
          <div className="mt-20">
            <label
              htmlFor="user-role"
              className="font-semibold text-15 text-cyan-400"
            >
              Role
            </label>
            <p className="py-3">{session.user.role}</p>
          </div>
        </form>
        {editMode && (
          <div className="flex justify-end w-full font-semibold gap-15 under:px-15 under:py-6 under:bg-cyan-500/25 text-14 under:rounded-sm hover:under:text-cyan-400">
            <button onClick={editModeClick}>Cancel</button>
            <button onClick={handleSubmitClick} disabled={isFetching}>
              Submit
            </button>
          </div>
        )}
      </article>
    );
};

export default ProfileForm;
