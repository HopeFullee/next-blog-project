import DetailContent from "@/components/detail/DetailContent";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import axios from "@/lib/axios";

export const dynamic = "force-dynamic";

export interface PostDetail {
  _id: string;
  author: string;
  title: string;
  content: string;
}

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

  const postDetail = await response.data;

  const session = await getServerSession(authOptions);

  const isPostOwner = session?.user?.id === postDetail.ownerId;

  return (
    <section className="flex-center">
      <DetailContent {...postDetail} isPostOwner={isPostOwner} />
    </section>
  );
};

export default DetailPage;
