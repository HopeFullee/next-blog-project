import { PostType } from "@/types/post";
import axios from "@/lib/axios";
import ForumTable from "@/components/Forum/ForumTable";

export const dynamic = "force-dynamic";

const ForumPage = async () => {
  const url = "/api/forum";

  const response = await axios.get(url);

  const postList: PostType[] = await response.data;

  return (
    <section className="px-20 mx-auto max-w-1240">
      <ForumTable postList={postList} />
    </section>
  );
};

export default ForumPage;
