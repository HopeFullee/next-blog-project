import axios from "@/lib/axios";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import RedirectTo from "@/components/RedirectTo";
import ModifyForm from "@/components/modify/ModifyForm";

export const dynamic = "force-dynamic";

const ModifyPage = async (props: {
  params: {
    id: string;
  };
}) => {
  const url = "/api/detail";

  const params = {
    id: props.params.id,
  };

  const response = await axios.get(url, {
    params: params,
  });

  const postDetail = await response.data;

  const session = await getServerSession(authOptions);

  const isPostOwner = postDetail.ownerId === session?.user?.id;

  // if user is not the owner of the post -> redirect back to forum
  if (!isPostOwner) return <RedirectTo href="/forum" />;
  else
    return (
      <>
        <ModifyForm
          id={postDetail?._id.toString()}
          title={postDetail?.title}
          content={postDetail?.content}
        />
      </>
    );
};

export default ModifyPage;
