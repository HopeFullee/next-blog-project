import DetailContent from "@/components/detail/DetailContent";
import { ObjectId } from "mongodb";

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
  const queryString = new URLSearchParams({ id: props.params.id }).toString();

  const response = await fetch(
    "http://localhost:3000/api/detail?" + queryString
  );

  const postDetail = await response.json();

  return (
    <section className="flex-center">
      <DetailContent {...postDetail} />
    </section>
  );
};

export default DetailPage;
