import React, { useState } from "react";

import { Card, Strong } from "react-bootstrap";

import { Box, Typography, Rating } from "@mui/material";

function Product({ product }) {
  return (
    <div className="card">
      <div className="card-body">
        <a href={`/product/${product.id}`}>
          <img></img>
          <h4 className="card-title text-center">{product.name}</h4>
        </a>
        {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
        <div className="card-text">
          <div className="my-3 d-flex">
            <Rating value={product.rating} precision={0.5} readOnly />
            <Box sx={{ ml: 2 }}>{product.numReviews} calificaciones</Box>
          </div>
        </div>
        <p className="card-text">{product.description}</p>
        <h4 className="card-text">${product.price}</h4>

        {/* <a href="#" className="card-link">
          Card link
        </a> */}
      </div>
    </div>
  );
}

export default Product;
