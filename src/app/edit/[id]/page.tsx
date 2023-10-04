import EditForm from "@/components/edit/EditForm";
import axios from "@/lib/axios";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import RedirectToForum from "@/components/RedirectToForum";

export const dynamic = "force-dynamic";

const EditPage = async (props: {
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

  const isPostOwner = postDetail.author === session?.user?.email;

  if (isPostOwner) {
    return (
      <>
        <EditForm
          postId={postDetail?._id.toString()}
          postTitle={postDetail?.title}
          postContent={postDetail?.content}
        />
      </>
    );
  } else {
    // if user is not the owner of the post -> redirect back to forum
    return <RedirectToForum />;
  }
};

export default EditPage;
