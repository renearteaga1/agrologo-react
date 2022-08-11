import React from "react";

function SubCategoryHeader({ name }) {
  return (
    <div className="col">
      <div
        className="card border-secondary rounded-circle mb-3 mx-auto"
        style={{ width: "7rem", height: "7rem" }}
      >
        <a
          href={`/?subcategoria=${name}&page=1`}
          className="icon-center card-no-decoration"
        >
          <div className="card-body text-secondary">
            <div className="card-text ">{name}</div>
          </div>
        </a>
      </div>
      <a href={`/?subcategoria=${name}&page=1`} className="card-no-decoration">
        <div className="text-center">{name}</div>
      </a>
    </div>
  );
}

export default SubCategoryHeader;
