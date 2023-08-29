import { PostType } from "@/types/post";
import ListCard from "@/components/list/ListCard";

export const dynamic = "force-dynamic";

const ListPage = async () => {
  const response = await fetch("http://localhost:3000/api/list");
  const postData: PostType[] = await response.json();

  return (
    <div className="mx-auto max-w-1200">
      <form action="/api/list" method="GET">
        <button type="submit">모든 DB POST 내용 조회</button>
      </form>
      <ul className="under:w-full flex-col-center gap-30 under:rounded-md mt-100">
        {postData.map(({ _id, title, content }, idx) => {
          return (
            <ListCard key={idx} _id={_id} title={title} content={content} />
          );
        })}
      </ul>
    </div>
  );
};

export default ListPage;
