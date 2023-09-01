"use client";
import { useState } from "react";
import CustomInput from "@/components/shared/CustomInput";

const RegisterForm = () => {
  const [registerData, setRegisterData] = useState({
    email: "",
    pw: "",
    cpw: "",
  });

  const [regexState, setRegexState] = useState({
    email: false,
    pw: false,
    cpw: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));

    // if input field is null -> trigger regexState to show warning
    if (value.trim() === "") {
      setRegexState((prev) => ({ ...prev, [name]: true }));
    } else {
      setRegexState((prev) => ({ ...prev, [name]: false }));
    }
  };

  return (
    <section className="mx-auto max-w-1400 flex-center">
      <form
        onSubmit={(e) => e.preventDefault}
        className="gap-30 mt-100 flex-col-center"
      >
        <p>회원가입</p>
        <div>
          <label htmlFor="register_email">Email</label>
          <CustomInput
            id="register_email"
            name="email"
            placeholder="이메일"
            onBlur={() => console.log(123)}
            onChange={(e) => handleChange(e)}
            value={registerData.email}
            regexState={regexState.email}
            regexMessage="이메일을 입력해주세요."
          />
        </div>
        <div>
          <label htmlFor="register_pw">Password</label>
          <CustomInput
            id="register_pw"
            name="pw"
            placeholder="비밀번호"
            onChange={(e) => handleChange(e)}
            value={registerData.pw}
            regexState={regexState.pw}
            regexMessage="6~20 사이 영문, 숫자, 특수기호 포함"
          />
        </div>
        <div>
          <label htmlFor="register_pw">Confirm Password</label>
          <CustomInput
            id="register_pw"
            name="cpw"
            placeholder="비밀번호 확인"
            onChange={(e) => handleChange(e)}
            value={registerData.cpw}
            regexState={regexState.cpw}
            regexMessage="비밀번호가 틀렸습니다."
          />
        </div>
      </form>
    </section>
  );
};

export default RegisterForm;
