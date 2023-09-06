"use client";
import { useState } from "react";
import CustomInput from "@/components/shared/CustomInput";
import Link from "next/link";

const emailRe = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const passwordRe = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/;

const RegisterForm = () => {
  const [registerData, setRegisterData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [regexWarning, setRegexWarning] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));

    // if input field is null -> trigger regexState to show warning
    if (value.trim() === "") {
      return setRegexWarning((prev) => ({
        ...prev,
        [name]: "*필수 항목입니다.",
      }));
    }

    if (name === "email") {
      if (!emailRe.exec(value)) {
        setRegexWarning((prev) => ({
          ...prev,
          [name]: "*이메일 형식이 아닙니다.",
        }));
      } else {
        setRegexWarning((prev) => ({ ...prev, [name]: "" }));
      }
    }

    if (name === "password") {
      if (!passwordRe.exec(value)) {
        setRegexWarning((prev) => ({
          ...prev,
          [name]: "*8~15, 영문, 숫자, 특수기호 포함.",
        }));
      } else {
        setRegexWarning((prev) => ({ ...prev, [name]: "" }));
      }
    }

    if (name === "confirmPassword") {
      if (value !== registerData.password) {
        setRegexWarning((prev) => ({
          ...prev,
          [name]: "*비밀번호가 일치하지 않습니다.",
        }));
      } else {
        setRegexWarning((prev) => ({ ...prev, [name]: "" }));
      }
    }
  };

  const handleSubmit = () => {
    const regexCheck = new Promise((resolve, reject) => {
      // check for empty fields
      Object.entries(registerData).forEach(([key, value]) => {
        if (value.trim() === "") {
          setRegexWarning((prev) => ({
            ...prev,
            [key]: "*필수 항목입니다.",
          }));
        }
      });

      const isWarning = Object.entries(regexWarning).some(([_, warning]) => {
        return warning !== "";
      });

      if (isWarning) {
        reject("전송 못함");
      } else {
        resolve("전송 가능");
      }
    });

    regexCheck
      .then(() => {
        fetch("/api/auth/register", {
          method: "POST",
          body: JSON.stringify({
            email: registerData.email,
            password: registerData.password,
            confirmPassword: registerData.confirmPassword,
          }),
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="mx-auto max-w-1400 flex-center">
      <form
        onSubmit={(e) => e.preventDefault}
        className="gap-30 mt-100 flex-col-center"
      >
        <p>회원가입</p>
        <div>
          <label htmlFor="register_email">Email</label>
          <CustomInput
            id="register_email"
            type="email"
            name="email"
            placeholder="이메일"
            onChange={(e) => handleChange(e)}
            value={registerData.email}
            regexWarning={regexWarning.email}
          />
        </div>
        <div>
          <label htmlFor="register_pw">Password</label>
          <CustomInput
            id="register_pw"
            type="password"
            name="password"
            placeholder="비밀번호"
            onChange={(e) => handleChange(e)}
            value={registerData.password}
            regexWarning={regexWarning.password}
          />
        </div>
        <div>
          <label htmlFor="register_cpw">Confirm Password</label>
          <CustomInput
            id="register_cpw"
            type="password"
            name="confirmPassword"
            placeholder="비밀번호 확인"
            onChange={(e) => handleChange(e)}
            value={registerData.confirmPassword}
            regexWarning={regexWarning.confirmPassword}
          />
        </div>
        <div className="flex justify-end w-full gap-20 mt-10 under:border-1 under:border-gray-500 under:px-5 under:py-1 under:rounded-sm">
          <Link href="/">취소</Link>
          <button type="button" onClick={handleSubmit}>
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
