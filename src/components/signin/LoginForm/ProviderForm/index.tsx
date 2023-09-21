import Image from "next/image";
import githubLogo from "@/assets/providerLogo/github.png";
import { signIn } from "next-auth/react";

const ProviderForm = () => {
  return (
    <>
      <div className="w-full gap-10 flex-center">
        <span className="w-full h-1 border-black border-dashed border-t-1"></span>
        <p className="font-medium">or</p>
        <span className="w-full h-1 border-black border-dashed border-t-1"></span>
      </div>
      <div className="mt-5 flex-center">
        <Image
          src={githubLogo}
          alt="github"
          className="cursor-pointer w-65 h-65"
          onClick={() => signIn("github")}
        />
      </div>
    </>
  );
};

export default ProviderForm;
