import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { Form, Button, Modal, Row, Col } from "react-bootstrap";

import {
  Alert,
  CircularProgress,
  FormControl,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import FormContainer from "../components/FormContainer";

import { detailsUserProducts } from "../actions/userActions";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "../actions/productActions";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_UPDATE_RESET,
} from "../constants/productConstants";

function ProfileProductScreen({ history, match }) {
  const [showForm, setShowForm] = useState(true);

  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [name, setName] = useState("");
  const [codigo, setCodigo] = useState("");
  const [description, setDescription] = useState("");
  const [edad, setEdad] = useState(0);
  const [peso, setPeso] = useState(0);
  const [sexo, setSexo] = useState("");
  const [raza, setRaza] = useState("");
  const [pesoMin, setPesoMin] = useState(0);
  const [pesoMax, setPesoMax] = useState(0);
  const [pesoAvg, setPesoAvg] = useState(0);
  const [images, setImages] = useState([]);

  const [atCreated, setAtCreated] = useState();
  const [price, setPrice] = useState(0);

  let arr = [...Array(21).keys()].slice(1);

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProductsDetails = useSelector((state) => state.userProductsDetails);
  const { loading, error, product } = userProductsDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success } = productUpdate;

  // useEffect(() => {
  //   if (category == "bovino") {
  //     subCategory == "" || cantidad == ""
  //       ? setShowForm(false)
  //       : setShowForm(true);
  //   }
  // }, [category, subCategory, cantidad]);

  //Modal
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!product || product.user != userInfo.id) {
        dispatch(detailsUserProducts(match.params.id));
      } else {
        setCategory(product.category.toLowerCase());
        setSubCategory(product.subCategory.toLowerCase());
        setCantidad(Number(product.cantidad));
        setName(product.name);
        setCodigo(product.codigo);
        setEdad(Number(product.edad));
        setSexo(product.sexo);
        setRaza(product.raza);
        setPeso(product.peso);

        setPrice(product.price.precioTotal);

        setDescription(product.description);
        setAtCreated(product.atCreated);
      }
    }
  }, [dispatch, product, userInfo]);

  const handleCategoria = (e) => {
    setCategory(e.target.value);
    setShowForm(true);
  };

  //REDUX
  const [fieldError, setFieldError] = useState([]);

  useEffect(() => {
    if (product) {
    }
  }, [product]);

  const deleteHandler = (id, name) => {
    handleShow();
  };

  const confirmHandler = () => {
    console.log("id delete", product.id);
    dispatch(deleteProduct(product.id));
    handleClose();
    history.push("/profile");
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    let producto = {
      id: product.id,
      category,
      subCategory,
      name,
      codigo,
      description,
      edad,
      peso,
      pesoMin,
      pesoMax,
      pesoAvg,
      sexo,
      raza,
      images,
      price,
    };

    if (
      name.trim().length == 0 ||
      codigo.trim().length == 0 ||
      // description.trim().length == 0 ||
      edad.length == 0 ||
      sexo.trim().length == 0
    ) {
      //errores
      Object.keys(producto).map((key) => {
        producto[key] == "" &&
          setFieldError((fieldError) => [...fieldError, key]);
      });
    } else {
      setFieldError([]);
      //file upload
      const formData = new FormData();
      // formData.append("image", images);
      Object.keys(producto).map((key, index) => {
        formData.append(key, producto[key]);
      });
      console.log(formData);
      console.log(producto);
      //Send create product action
      dispatch(updateProduct(formData));
      dispatch({ type: PRODUCT_UPDATE_RESET });
      console.log("dispatched update");
    }
  };

  return (
    <>
      <Row>
        <h3>Crear Publicación</h3>
      </Row>
      <Row>
        <div className="text-muted">Fecha publicación: {atCreated}</div>
      </Row>
      <Row>
        <Col>
          <FormContainer>
            <Form.Group controlId="categoria" className="">
              <Form.Label>Seleccione Categoria</Form.Label>
              <Form.Select
                onChange={(e) => handleCategoria(e)}
                value={category}
              >
                <option value="">---Categoria---</option>
                <option value="bovino">Bovinos</option>
                <option value="porcino">Porcinos</option>
                {/* <option value="frutas">Frutas</option> */}
                <option value="cultivo">Cultivos</option>
              </Form.Select>
            </Form.Group>
          </FormContainer>
        </Col>
      </Row>
      {error && (
        <Alert severity="error">
          {Object.keys(error).map((key, index) => (
            <ul key={index}>
              {key}: {error[key]}
            </ul>
          ))}
        </Alert>
      )}
      {/* {success && <Alert severity="success">Publicacion creada</Alert>} */}
      {category == "bovino" && (
        <Row className="mt-4">
          <Col>
            <Form.Group controlId="categoria" className="">
              <Form.Label>Seleccione Tipo</Form.Label>
              <Form.Select
                onChange={(e) => setSubCategory(e.target.value)}
                value={subCategory}
              >
                <option value="">---Tipo---</option>
                <option value="toro">Toro</option>
                <option value="vaca">Vaca</option>
                <option value="destete">Destete</option>
                <option value="torete">Torete</option>
                <option value="vacona">Vacona</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="categoria" className="">
              <Form.Label>Cant de animales en esta publicacion</Form.Label>
              {/* <Form.Select
                onChange={(e) => setCantidad(e.target.value)}
                value={cantidad}
              >
                <option value="">---Cant---</option>

                {arr.map((cant) => (
                  <option value={cant} key={cant}>
                    {cant}
                  </option>
                ))}
                <option value=">20"> > 20</option>
              </Form.Select> */}
              <Form.Control
                type="number"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>
        </Row>
      )}

      {showForm && (
        <>
          <Row>
            <Col></Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="image" className="my-3">
                <Form.Control
                  type="file"
                  placeholder="Enter Image"
                  onChange={(e) => setImages(e.target.files[0])}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form onSubmit={(e) => HandleSubmit(e)}>
                <Row>
                  <Col>
                    <TextField
                      error={fieldError.includes("name") && true}
                      fullWidth
                      margin="normal"
                      id="name"
                      label="Nombre"
                      variant="outlined"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <TextField
                      error={fieldError.includes("codigo") && true}
                      fullWidth
                      margin="normal"
                      id="outlined-basic"
                      label="Codigo"
                      variant="outlined"
                      value={codigo}
                      onChange={(e) => setCodigo(e.target.value)}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <TextField
                      error={fieldError.includes("edad") && true}
                      fullWidth
                      margin="normal"
                      type="number"
                      id="outlined-basic"
                      label="Edad"
                      variant="outlined"
                      value={edad}
                      onChange={(e) => setEdad(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <FormControl fullWidth className="mt-3">
                      <InputLabel id="demo-simple-select-label">
                        Sexo
                      </InputLabel>
                      <Select
                        error={fieldError.includes("name") && true}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={sexo}
                        label="Sexo"
                        onChange={(e) => setSexo(e.target.value)}
                      >
                        <MenuItem value="Macho">Macho </MenuItem>
                        <MenuItem value="Hembra">Hembra </MenuItem>
                      </Select>
                    </FormControl>
                  </Col>
                  <Col>
                    <TextField
                      fullWidth
                      margin="normal"
                      id="outlined-basic"
                      label="Raza"
                      variant="outlined"
                      value={raza}
                      onChange={(e) => setRaza(e.target.value)}
                    />
                  </Col>
                </Row>

                <Row>
                  {cantidad < 2 ? (
                    <Col md={4}>
                      <TextField
                        fullWidth
                        margin="normal"
                        type="number"
                        id="outlined-basic"
                        label="Peso"
                        variant="outlined"
                        value={peso}
                        onChange={(e) => setPeso(e.target.value)}
                      />
                    </Col>
                  ) : (
                    <>
                      <Col>
                        <TextField
                          fullWidth
                          margin="normal"
                          type="number"
                          id="outlined-basic"
                          label="Peso Min"
                          variant="outlined"
                          onChange={(e) => setPesoMin(e.target.value)}
                        />
                      </Col>
                      <Col>
                        <TextField
                          fullWidth
                          margin="normal"
                          type="number"
                          id="outlined-basic"
                          label="Peso Max"
                          variant="outlined"
                          onChange={(e) => setPesoMax(e.target.value)}
                        />
                      </Col>
                      <Col>
                        <TextField
                          fullWidth
                          margin="normal"
                          type="number"
                          id="outlined-basic"
                          label="Peso Promedio"
                          variant="outlined"
                          onChange={(e) => setPesoAvg(e.target.value)}
                        />
                      </Col>
                    </>
                  )}
                </Row>

                <Row>
                  <Col md={4}>
                    <TextField
                      fullWidth
                      margin="normal"
                      type="number"
                      id="outlined-basic"
                      label="Precio"
                      variant="outlined"
                      value={price}
                      onChange={(e) => setPesoAvg(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextField
                      multiline
                      rows={4}
                      fullWidth
                      margin="normal"
                      id="outlined-basic"
                      label="Descripcion"
                      variant="outlined"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Col>
                </Row>

                <div className="row justify-content-around mt-3">
                  <Col className="d-grid col-3 mx-auto">
                    <Button type="submit" variant="primary">
                      Actualizar
                    </Button>
                  </Col>

                  <Col className="d-grid col-3 mx-auto">
                    <Button
                      variant="danger"
                      onClick={() => deleteHandler(product.id, product.name)}
                    >
                      Eliminar
                    </Button>
                    <Modal show={showModal} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Eliminar</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        Desea eliminar la publicacion {name}?
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Cerrar
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => confirmHandler(product.id)}
                        >
                          Delete
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </Col>
                </div>
              </Form>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default ProfileProductScreen;
