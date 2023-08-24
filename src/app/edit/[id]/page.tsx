import EditForm from "@/components/edit/EditForm";
import { connectDB } from "@/util/database";
import { ObjectIdLike } from "bson";
import { ObjectId } from "mongodb";

type InputElements = HTMLInputElement | HTMLTextAreaElement;

const EditPage = async (props: {
  params: {
    id: string | number | ObjectId | ObjectIdLike | Uint8Array | undefined;
  };
}) => {
  const db = (await connectDB).db("forum");
  const result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(props.params.id) });

  return (
    <>
      <EditForm
        postId={result?._id.toString()}
        postTitle={result?.title}
        postContent={result?.content}
      />
    </>
  );
};

export default EditPage;
