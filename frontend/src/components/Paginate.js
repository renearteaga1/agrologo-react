import React from "react";
// import { Pagination } from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";

function Paginate({ count, next, keyword = "", isAdmin = false }) {
  if (keyword) {
    keyword = keyword.split("&")[0];
    if (keyword.split("=")[0] == "?page") {
      keyword = "";
    }
  }
  let page;
  if (next == null) {
    page = count;
  } else {
    page = next - 1;
  }

  return (
    count > 1 && (
      <>
        <Pagination
          page={page}
          count={count}
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={
                keyword ? `${keyword}&page=${item.page}` : `?page=${item.page}`
              }
              {...item}
            />
          )}
        />
        {/* <Pagination>
          {[...Array(count).keys()].map((x) => (
            <LinkContainer
              key={x + 1}
              to={keyword ? `${keyword}&page=${x + 1}` : `?page=${x + 1}`}
            >
              <Pagination.Item active={x + 1 == page}>{x + 1}</Pagination.Item>
            </LinkContainer>
          ))}
        </Pagination> */}
      </>
    )
  );
}

export default Paginate;
