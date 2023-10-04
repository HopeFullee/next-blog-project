import { PostType } from "@/types/post";
import ListCard from "@/components/list/ListCard";
import axios from "@/lib/axios";

export const dynamic = "force-dynamic";

const ForumPage = async () => {
  const url = "/api/forum";

  const response = await axios.get(url);

  const postList: PostType[] = await response.data;

  return (
    <div className="mx-auto max-w-1200">
      <ul className="under:w-full flex-col-center gap-30 mt-100">
        {postList.map(({ _id, title, createdAt }, idx) => {
          return (
            <ListCard key={idx} id={_id} title={title} createdAt={createdAt} />
          );
        })}
      </ul>
    </div>
  );
};

export default ForumPage;
