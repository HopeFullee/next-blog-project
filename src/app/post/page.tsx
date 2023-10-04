import PostForm from "@/components/post/PostForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import RedirectToSignIn from "@/components/RedirectToSignIn";

const postPage = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    return (
      <>
        <PostForm />
      </>
    );
  } else {
    // if not signed in Redirect user to sign-in page
    return <RedirectToSignIn />;
  }
};

export default postPage;
