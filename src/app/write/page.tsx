import PostForm from "@/components/write/PostForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const WritePage = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    return (
      <>
        <PostForm />
      </>
    );
  } else {
    return (
      <>
        <p>로그인을 해주세요</p>
      </>
    );
  }
};

export default WritePage;
