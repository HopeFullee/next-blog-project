import EditForm from "@/components/edit/EditForm";

const EditPage = async (props: {
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
    <>
      <EditForm
        postId={postDetail?._id.toString()}
        postTitle={postDetail?.title}
        postContent={postDetail?.content}
      />
    </>
  );
};

export default EditPage;
