const WritePage = () => {
  return (
    <div>
      <h4>글 작성</h4>
      <form
        action="/api/write"
        method="POST"
        className="gap-30 flex-col-center"
      >
        <input type="text" name="title" className="w-400" />
        <textarea name="content" className="w-400" />
        <button type="submit" className="px-20 border-black border-1">
          등록
        </button>
      </form>
    </div>
  );
};

export default WritePage;
