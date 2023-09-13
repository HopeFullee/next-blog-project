import { SignInData } from "@/components/signin/LoginForm";
import { signIn } from "next-auth/react";
import { useState } from "react";

export const useSignIn = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [authError, setAuthError] = useState<Record<string, string>>({});

  const customSignIn = async (signInData: SignInData) => {
    setIsFetching(true);

    try {
      const res = await signIn("credentials", {
        email: signInData.email,
        password: signInData.password,
        redirect: false,
        callbackUrl: "/",
      });

      if (res?.ok) return;
      else throw res;
    } catch (err: any) {
      setIsFetching(false);

      const errorBody = JSON.parse(err.error);
      setAuthError(errorBody);
    }
  };

  return { isFetching, customSignIn, authError };
};
