import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

import { Col, Row } from "react-bootstrap";

import { Alert, CircularProgress } from "@mui/material";

import Product from "../components/Product";
import ProductHome from "../components/ProductHome";
import SubCategoryHeader from "../components/SubCategoryHeader";
import Paginate from "../components/Paginate";

function HomeScreen({ history }) {
  // let products = [{ id: "1", name: "producto1" }];
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);

  const { error, loading, products, count, next } = productList;

  let keyword = history.location.search;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      <div className="container my-3">
        <div className="row mb-3">
          <div className="col text-center">
            <div className="text-center display-5">Conecta con el campo</div>
          </div>
        </div>
      </div>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          <div className="container">
            <div className="row">
              <SubCategoryHeader name="Vaca" />

              <SubCategoryHeader name="Toro" />

              <SubCategoryHeader name="Novillo" />

              <SubCategoryHeader name="Vacona" />
            </div>
          </div>
          <div className="container my-5">
            <Row className="mb-3">
              <div className="display-6">Descubre lotes en venta</div>
            </Row>

            <Row>
              <ProductHome itemData={products} />
              {/* {products.map((product) => (
                <Col key={product.id} sm={12} md={6} lg={4}>
                  <Product product={product} />
                </Col>
              ))} */}
            </Row>
            <div className="d-flex justify-content-center">
              <Row className="justify-content-center">
                <Paginate keyword={keyword} count={count} next={next} />
              </Row>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default HomeScreen;
