import { RegisterData } from "@/components/register/RegisterForm";
import axios from "@/lib/axios";
import { useState } from "react";

export const useRegister = () => {
  const [isFetching, setIsFetching] = useState(false);

  const [duplicateError, setDuplicateError] = useState<Record<string, string>>(
    {}
  );

  const register = async (registerData: RegisterData) => {
    setIsFetching(true);

    try {
      const res = await axios.post("/api/auth/register", {
        email: registerData.email,
        name: registerData.name,
        password: registerData.password,
        confirmPassword: registerData.confirmPassword,
      });

      if (res.status === 200) window.location.replace("/forum");
      else throw res;
    } catch (err: any) {
      setIsFetching(false);

      console.log(err.response.data);

      const errorBody = await err.response.data;
      setDuplicateError(errorBody);
    }
  };

  return {
    isFetching,
    duplicateError,
    register,
  };
};
