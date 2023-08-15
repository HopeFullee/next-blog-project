const ListPage = () => {
  return (
    <div className="mx-auto max-w-1200">
      <ul className="under:w-full flex-col-center gap-30 under:rounded-md mt-100 under:p-15 under:shadow-[2px_2px_6px_gray]">
        <li>
          <h4 className="font-semibold text-20">글제목</h4>
          <p>1월 1일</p>
        </li>
        <li>
          <h4 className="font-semibold text-20">글제목</h4>
          <p>1월 1일</p>
        </li>
      </ul>
    </div>
  );
};

export default ListPage;
