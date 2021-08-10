import React from "react";

const Pagination = ({ postsperPage, totalpage, paginate }) => {
  if (totalpage < 30) {
    totalpage = 0;
  }
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalpage / postsperPage); i++) {
    pageNumber.push(i);
  }

  return (
    <nav className="nav">
      {pageNumber.map((numbers) => (
        <p
          className="nav-link "
          aria-current="page"
          key={numbers}
          style={{ cursor: "pointer" }}
          onClick={() => paginate(numbers)}
        >
          {numbers}
        </p>
      ))}
    </nav>
  );
};

export default Pagination;
