import DetailContent from "@/components/detail/DetailContent";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import axios from "@/lib/axios";
import { PostType } from "@/types/post";

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

  return (
    <section className="flex-center">
      <DetailContent {...postDetail} isPostOwner={isPostOwner} />
    </section>
  );
};

export default DetailPage;
