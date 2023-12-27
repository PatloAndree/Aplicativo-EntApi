import React from "react";
import ReactPaginate from "react-paginate";

interface Props {
  pageCount: number;
  onPageChange: (item: { selected: number }) => void;
}
export default function Paginacion(props: Props) {
  return (
    <ReactPaginate
      nextLabel="next >"
      onPageChange={props.onPageChange}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      pageCount={props.pageCount}
      previousLabel="< previous"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      previousClassName="page-item"
      previousLinkClassName="page-link"
      nextClassName="page-item"
      nextLinkClassName="page-link"
      breakLabel="..."
      breakClassName="page-item"
      breakLinkClassName="page-link"
      containerClassName="pagination"
      activeClassName="active"
      renderOnZeroPageCount={null}
    />
  );
}
