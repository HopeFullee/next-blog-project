"use client";

import { useEffect, useState } from "react";
import CustomInput from "@/components/shared/CustomInput";
import { useSignIn } from "@/hooks/useSignIn";
import Link from "next/link";

const emailRe = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export interface SignInData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { isFetching, customSignIn, authError } = useSignIn();

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const [regexWarning, setRegexWarning] = useState({
    email: "",
    password: "",
    authError: "",
  });

  useEffect(() => {
    setRegexWarning((prev) => ({ ...prev, ...authError }));
  }, [authError]);

  const regexErrorSet = (formKey: string, errorMsg: string) => {
    setRegexWarning((prev) => ({ ...prev, [formKey]: errorMsg }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (regexWarning.authError) {
      regexErrorSet("authError", "");
    }

    const { value, name } = e.target;

    setSignInData((prev) => ({ ...prev, [name]: value }));

    if (value.trim() === "") {
      return regexErrorSet(name, "*필수 항목입니다.");
    } else {
      regexErrorSet(name, "");
    }

    if (name === "email") {
      if (!emailRe.exec(value)) regexErrorSet(name, "*이메일 형식이 아닙니다.");
      else regexErrorSet(name, "");
    }
  };

  const formValidator = () => {
    const emptyFormKeyList: string[] = [];
    const warningFormKeyList: string[] = [];

    Object.entries(signInData).forEach(([key, value]) => {
      if (value.trim() === "") emptyFormKeyList.push(key);
    });

    Object.entries(regexWarning).forEach(([key, value]) => {
      if (value) warningFormKeyList.push(key);
    });

    return { emptyFormKeyList, warningFormKeyList };
  };

  const handleSubmit = () => {
    const { emptyFormKeyList, warningFormKeyList } = formValidator();

    emptyFormKeyList.forEach((formKey) => {
      regexErrorSet(formKey, "*필수 항목입니다.");
    });

    if (emptyFormKeyList.length !== 0) return;
    if (warningFormKeyList.length !== 0) return;

    customSignIn(signInData);
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="gap-25 max-w-250 flex-col-center mt-100"
    >
      <h4 className="font-semibold text-18">Login</h4>
      <div className="flex flex-col">
        <label htmlFor="login-email">Email</label>
        <CustomInput
          id="login-email"
          name="email"
          type="email"
          value={signInData.email}
          onChange={(e) => handleChange(e)}
          regexWarning={regexWarning.email || regexWarning.authError}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="login-password">Password</label>
        <CustomInput
          id="login-password"
          name="password"
          type="password"
          value={signInData.password}
          onChange={(e) => handleChange(e)}
          regexWarning={regexWarning.password}
        />
      </div>

      <div className="flex justify-end w-full gap-20 mt-10 under:border-1 under:border-gray-500 under:px-5 under:py-1 under:rounded-sm">
        <Link href="/">취소</Link>
        <button disabled={isFetching} type="button" onClick={handleSubmit}>
          로그인
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
