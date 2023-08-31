import EditForm from "@/components/edit/EditForm";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export const dynamic = "force-dynamic";

const EditPage = async (props: {
  params: {
    id: string;
  };
}) => {
  const queryString = new URLSearchParams({ id: props.params.id }).toString();

  const response = await fetch(
    "http://localhost:3000/api/detail?" + queryString
  );
  const postDetail = await response.json();

  const session = await getServerSession(authOptions);

  if (postDetail.author === session?.user?.email) {
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
    return (
      <>
        <p>접근 권한이 없습니다.</p>
      </>
    );
  }
};

export default EditPage;
