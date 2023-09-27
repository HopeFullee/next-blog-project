import Image from "next/image";
import githubLogo from "@/assets/providerLogo/github.png";
import googleLogo from "@/assets/providerLogo/google.png";
import { signIn } from "next-auth/react";

const ProviderForm = () => {
  return (
    <div>
      <div className="w-full gap-10 flex-center">
        <span className="w-full h-1 border-black border-dashed border-t-1"></span>
        <p className="font-medium">or</p>
        <span className="w-full h-1 border-black border-dashed border-t-1"></span>
      </div>
      <nav className="mt-20 gap-15 flex-center">
        <div className="flex-center">
          <Image
            src={githubLogo}
            alt="github"
            className="cursor-pointer w-45 h-45"
            onClick={() => signIn("github")}
          />
        </div>
        <div className="flex-center">
          <Image
            src={googleLogo}
            alt="google"
            className="cursor-pointer w-45 h-45"
            onClick={() => signIn("google")}
          />
        </div>
      </nav>
    </div>
  );
};

export default ProviderForm;
