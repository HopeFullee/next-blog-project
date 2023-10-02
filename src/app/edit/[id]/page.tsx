import EditForm from "@/components/edit/EditForm";
import axios from "@/lib/axios";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

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

  const isPostAuthor = postDetail.author === session?.user?.email;

  if (isPostAuthor) {
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
      <div className="gap-10 flex-col-center mt-100">
        <p>게시글의 작성자가 아닙니다.</p>
        <p>You are not the owner of the post.</p>
      </div>
    );
  }
};

export default EditPage;
