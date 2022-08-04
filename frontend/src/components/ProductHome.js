import React, { useState } from "react";

import { Card, Strong } from "react-bootstrap";

import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

function ProductHome({ itemData }) {
  return (
    <div>
      <ImageList variant="masonry" cols={3} gap={8}>
        {itemData.map((item) => (
          <a href={`/products/${item.id}`} key={item.id}>
            <ImageListItem>
              <img
                src={`${item.image.image1}?w=248&fit=crop&auto=format`}
                srcSet={`${item.image.image1}?w=248&fit=crop&auto=format&dpr=2 2x`}
                alt={item.title}
                loading="lazy"
              />
              <ImageListItemBar
                sx={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                    "rgba(0,0,0,0.3) 75%, rgba(0,0,0,0) 100%)",
                }}
                title={item.price.precioTotal}
                position="top"
                actionIcon={
                  <IconButton
                    sx={{ color: "white" }}
                    aria-label={`price ${item.price.precioTotal}`}
                  >
                    <AttachMoneyIcon />
                  </IconButton>
                }
                actionPosition="left"
              />
              <ImageListItemBar position="below" title={item.productor} />
            </ImageListItem>
          </a>
        ))}
      </ImageList>
    </div>
  );
}

export default ProductHome;
