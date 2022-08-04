import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";

import { Col, Row } from "react-bootstrap";

import { Alert, CircularProgress } from "@mui/material";

import Product from "../components/Product";
import ProductHome from "../components/ProductHome";

function HomeScreen() {
  // let products = [{ id: "1", name: "producto1" }];
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);

  const { error, loading, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

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
              <div className="col">
                <div
                  className="card border-secondary rounded-circle mb-3 mx-auto"
                  style={{ width: "7rem", height: "7rem" }}
                >
                  <a href="" className="icon-center card-no-decoration">
                    <div className="card-body text-secondary">
                      <div className="card-text ">Vaca</div>
                    </div>
                  </a>
                </div>
                <a href="" className="card-no-decoration">
                  <div className="text-center">Vaca</div>
                </a>
              </div>

              <div className="col">
                <div
                  className="card border-secondary rounded-circle mb-3 mx-auto"
                  style={{ width: "7rem", height: "7rem" }}
                >
                  <a href="" className="icon-center card-no-decoration">
                    <div className="card-body text-secondary">
                      <div className="card-text ">Toro</div>
                    </div>
                  </a>
                </div>
                <a href="" className="card-no-decoration">
                  <div className="text-center">Toro</div>
                </a>
              </div>

              <div className="col">
                <div
                  className="card border-secondary rounded-circle mb-3 mx-auto"
                  style={{ width: "7rem", height: "7rem" }}
                >
                  <a href="" className="icon-center card-no-decoration">
                    <div className="card-body text-secondary">
                      <div className="card-text ">Novillo</div>
                    </div>
                  </a>
                </div>
                <a href="" className="card-no-decoration">
                  <div className="text-center">Novillo</div>
                </a>
              </div>

              <div className="col">
                <div
                  className="card border-secondary rounded-circle mb-3 mx-auto"
                  style={{ width: "7rem", height: "7rem" }}
                >
                  <a href="" className="icon-center card-no-decoration">
                    <div className="card-body text-secondary">
                      <div className="card-text ">Vacona</div>
                    </div>
                  </a>
                </div>
                <a href="" className="card-no-decoration">
                  <div className="text-center">Vacona</div>
                </a>
              </div>
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
          </div>
        </>
      )}
    </>
  );
}

export default HomeScreen;
