import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import ProfileForm from "@/components/profile/ProfileForm";
import RedirectTo from "@/components/RedirectTo";

const Profile = async () => {
  const session = await getServerSession(authOptions);

  // if not signed in Redirect user to sign-in page
  if (!session) return <RedirectTo href="/signin" />;
  else
    return (
      <section className="px-20">
        <ProfileForm />
      </section>
    );
};

export default Profile;
