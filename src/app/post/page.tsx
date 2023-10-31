import PostForm from "@/components/post/PostForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import RedirectTo from "@/components/RedirectTo";

const postPage = async () => {
  const session = await getServerSession(authOptions);

  // if not signed in Redirect user to sign-in page
  if (!session) return <RedirectTo href="/signin" />;
  else
    return (
      <>
        <PostForm />
      </>
    );
};

export default postPage;
