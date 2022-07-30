import React, { useState } from "react";

import { Card, Strong } from "react-bootstrap";

import { Box, Typography, Rating } from "@mui/material";

function Product({ product }) {
  return (
    <div className="card">
      <div className="card-body px-0 pt-0">
        <a href={`/product/${product.id}`}>
          <img
            src={product.image.image1}
            className="card-img-top"
            alt={product.name}
          />
          <div className="card-title px-3 text-cente pt-1">{product.name}</div>
        </a>
        {/* <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6> */}
        <div className="card-text px-1">
          {/* <div className="my-3 d-flex">
            <Rating value={product.rating} precision={0.5} readOnly />
            <Box sx={{ ml: 2 }}>{product.numReviews} calificaciones</Box>
          </div> */}
        </div>
        <div className="card-text px-3 text-description-card">
          <p className="card-text">{product.description}</p>
          <p className="card-text ">${product.price.precioTotal}</p>
        </div>

        {/* <a href="#" className="card-link">
          Card link
        </a> */}
      </div>
    </div>
  );
}

export default Product;
