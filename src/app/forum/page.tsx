import { PostType } from "@/types/post";
import ListCard from "@/components/list/ListCard";
import axios from "@/lib/axios";

export const dynamic = "force-dynamic";

const ForumPage = async () => {
  const url = "/api/list";

  const response = await axios.get(url);

  const postList: PostType[] = await response.data;

  return (
    <div className="mx-auto max-w-1200">
      <ul className="under:w-full flex-col-center gap-30 mt-100">
        {postList.map(({ _id, title, postDate }, idx) => {
          return <ListCard key={idx} _id={_id} title={title} date={postDate} />;
        })}
      </ul>
    </div>
  );
};

export default ForumPage;
