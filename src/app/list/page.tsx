import { connectDB } from "@/util/database";
import ListCard from "@/components/list/ListCard";

const ListPage = async () => {
  const db = (await connectDB).db("forum");
  let result = await db.collection("post").find().toArray();

  return (
    <div className="mx-auto max-w-1200">
      <ul className="under:w-full flex-col-center gap-30 under:rounded-md mt-100">
        {result.map((db, idx) => {
          return <ListCard key={idx} {...db} />;
        })}
      </ul>
    </div>
  );
};

export default ListPage;
