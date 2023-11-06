import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { PostType } from "@/types/post";
import axios from "@/lib/axios";
import DetailContent from "@/components/detail/DetailContent";
import DetailComments from "@/components/detail/DetailComments";

export const dynamic = "force-dynamic";

const DetailPage = async (props: {
  params: {
    id: string;
  };
}) => {
  const response = await axios.get("/api/detail", {
    params: {
      id: props.params.id,
    },
  });

  const postDetail: PostType = await response.data;

  const session = await getServerSession(authOptions);

  const isPostOwner = session?.user?.id === postDetail.ownerId;

  console.log("------------------ D E T A I L  ---------------------");
  console.log(postDetail.comments);

  return (
    <section className="flex-col-center gap-80">
      <DetailContent {...postDetail} isPostOwner={isPostOwner} />
      <DetailComments
        postId={postDetail._id}
        comments={postDetail.comments}
        session={session}
      />
    </section>
  );
};

export default DetailPage;
