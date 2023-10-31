import CustomTextArea from "@/components/shared/CustomTextArea";

const CommentTextArea = () => {
  return (
    <div className="flex flex-col items-end gap-10 mt-15">
      <CustomTextArea
        name="comment"
        height="h-80"
        placeholder="댓글을 입력해주세요."
        regexWarning="*필수 항목입니다."
      />
      <button className="py-6 font-semibold rounded-sm px-15 bg-cyan-500/25 text-14 hover:under:text-cyan-400">
        Submit
      </button>
    </div>
  );
};

export default CommentTextArea;
