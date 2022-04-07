import React from "react";
import "./style.css";

export default function Pagination({
  pages = 10,
  curPage = 1,
  onPageClick = (e) => void 0,
}) {
  let pagesArr = [];
  for (var i = 1; i <= pages; i++) {
    pagesArr.push(i);
  }

  return (
    <ul className="pagination">
      {curPage !== 1 ? (
        <li className="page-item">
          <span className="page-link" onClick={() => onPageClick(curPage - 1)}>
            &laquo;
          </span>
        </li>
      ) : (
        <li className="page-item disabled">
          <span className="page-link">
            &laquo;
          </span>
        </li>
      )}

      {pagesArr.map((page, i) => {
        if (page === curPage)
          return <li className="page-item active" key={i}>
            <span className="page-link">
              {page}
            </span>
          </li>
        else
          return <li className="page-item" key={i}>
            <span className="page-link" onClick={() => onPageClick(page)}>
              {page}
            </span>
          </li>
      })}

      {curPage !== pages ? (
        <li className="page-item">
          <span className="page-link" onClick={() => onPageClick(curPage + 1)}>
            &raquo;
          </span>
        </li>
      ) : (
        <li className="page-item disabled">
          <span className="page-link">
            &raquo;
          </span>
        </li>
      )}
    </ul>
  );
}
