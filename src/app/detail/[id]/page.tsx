import DetailContent from "@/components/detail/DetailContent";
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
  const url = "/api/detail";

  const params = {
    id: props.params.id,
  };

  const response = await axios.get(url, {
    params: params,
  });

  const postDetail = await response.data;

  return (
    <section className="flex-center">
      <DetailContent {...postDetail} />
    </section>
  );
};

export default DetailPage;
