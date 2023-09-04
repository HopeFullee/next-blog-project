"use client";
import { useState } from "react";
import CustomInput from "@/components/shared/CustomInput";

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
      setRegexWarning((prev) => ({ ...prev, [name]: true }));
    } else {
      setRegexWarning((prev) => ({ ...prev, [name]: false }));
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
            onChange={(e) => handleChange(e)}
            value={registerData.email}
            regexWarning={regexWarning.email}
          />
        </div>
        <div>
          <label htmlFor="register_pw">Password</label>
          <CustomInput
            id="register_pw"
            name="pw"
            placeholder="비밀번호"
            onChange={(e) => handleChange(e)}
            value={registerData.password}
            regexWarning={regexWarning.password}
          />
        </div>
        <div>
          <label htmlFor="register_pw">Confirm Password</label>
          <CustomInput
            id="register_pw"
            name="cpw"
            placeholder="비밀번호 확인"
            onChange={(e) => handleChange(e)}
            value={registerData.confirmPassword}
            regexWarning={regexWarning.confirmPassword}
          />
        </div>
      </form>
    </section>
  );
};

export default RegisterForm;
