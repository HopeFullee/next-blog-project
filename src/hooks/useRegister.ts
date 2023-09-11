import { RegisterData } from "@/components/register/RegisterForm";
import { useState } from "react";

export const useRegister = () => {
  const [isFetching, setIsFetching] = useState(false);

  const [duplicateError, setDuplicateError] = useState<Record<string, string>>(
    {}
  );

  const register = async (registerData: RegisterData) => {
    setIsFetching(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          email: registerData.email,
          password: registerData.password,
          confirmPassword: registerData.confirmPassword,
        }),
      });

      if (res.ok) window.location.replace("/forum");
      else throw res;
    } catch (err: any) {
      setIsFetching(false);

      const errorBody = await err.json();
      setDuplicateError(errorBody);
    }
  };

  return {
    isFetching,
    duplicateError,
    register,
  };
};
