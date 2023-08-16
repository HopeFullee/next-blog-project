const WritePage = () => {
  return (
    <div>
      <h4>글 작성</h4>
      <form action="/api/test" method="POST">
        <button type="submit">등록</button>
      </form>
    </div>
  );
};

export default WritePage;
