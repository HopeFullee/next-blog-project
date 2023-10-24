import Image from "next/image";
import githubLogo from "@/assets/providerLogo/github.png";
import googleLogo from "@/assets/providerLogo/google.png";
import { signIn } from "next-auth/react";

const ProviderForm = () => {
  return (
    <>
      <div className="w-full gap-10 flex-center">
        <span className="w-full h-1 border-dashed border-cyan-500/40 border-t-1"></span>
        <p className="font-semibold text-15 text-cyan-400">or</p>
        <span className="w-full h-1 border-dashed border-cyan-500/40 border-t-1"></span>
      </div>
      <nav className="mt-20 gap-15 flex-center">
        <div className="flex-center">
          <Image
            src={githubLogo}
            alt="github"
            className="cursor-pointer w-45 h-45"
            onClick={() => signIn("github", { callbackUrl: "/" })}
          />
        </div>
        <div className="flex-center">
          <Image
            src={googleLogo}
            alt="google"
            className="cursor-pointer w-45 h-45"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          />
        </div>
      </nav>
    </>
  );
};

export default ProviderForm;
