import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Pagination from "react-js-pagination";

const CustomPagination = ({ resPerPage, filteredProductsCount }) => {
  const [currentPage, setCurrentPage] = useState();

  let [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get the current page from the search parameters or default to 1
  const page = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);

    // Update the search parameters
    searchParams.set("page", pageNumber);

    // Construct the new path with the updated search parameters
    const path = `${window.location.pathname}?${searchParams.toString()}`;
    navigate(path);
  };

  return (
    <div className="d-flex justify-content-center my-5">
    {filteredProductsCount > resPerPage && (
      <Pagination
        activePage={currentPage}
        itemsCountPerPage={resPerPage}
        totalItemsCount={filteredProductsCount}
        onChange={setCurrentPageNo}
        nextPageText={"Next"}
        prevPageText={"Prev"}
        firstPageText={"First"}
        lastPageText={"Last"}
        itemClass="page-item"
        linkClass="page-link"
      />
    )}
  </div>
  );
};

export default CustomPagination;
