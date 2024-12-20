function Pagination({
  dataPerPage,
  totalData,
  currentPage,
  paginate,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            key={number}
            
            className={`page-item ${currentPage === number ? "active" : ""}`}
          >
            <a
              onClick={() => {
                paginate(number);
              }}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;