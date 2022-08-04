import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { Form, Button, Row, Col } from "react-bootstrap";

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

import { createProduct } from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

function ProductCreateScreen() {
  const [showForm, setShowForm] = useState(false);

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

  const [price, setPrice] = useState(0);

  let arr = [...Array(21).keys()].slice(1);

  const dispatch = useDispatch();

  const productCreate = useSelector((state) => state.productCreate);
  const { loading, success, error, product } = productCreate;

  useEffect(() => {
    if (category == "bovino") {
      subCategory == "" || cantidad == ""
        ? setShowForm(false)
        : setShowForm(true);
    }
  }, [category, subCategory, cantidad]);

  const handleCategoria = (e) => {
    setCategory(e.target.value);
    setShowForm(true);
  };

  //REDUX
  // useEffect(()=> {
  //   dispatch()
  // },[dispatch])

  const [fieldError, setFieldError] = useState([]);

  let producto = {
    category,
    subCategory,
    cantidad,
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
    active: true,
  };

  const uploadFileHandler = (e) => {};

  const HandleSubmit = (e) => {
    e.preventDefault();
    setFieldError([]);
    if (
      name.trim().length == 0 ||
      codigo.trim().length == 0 ||
      // description.trim().length == 0 ||
      edad == 0 ||
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

      //Send create product action
      dispatch(createProduct(formData));
      dispatch({ type: PRODUCT_CREATE_RESET });
      console.log("dispatch");
    }
  };

  return (
    <>
      <Row>
        <h3>Crear Publicación</h3>
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
      {success && <Alert severity="success">Publicacion creada</Alert>}
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
              <Form.Select
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
              </Form.Select>
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
                {/* <Form.Control type="text" value={image} disabled></Form.Control> */}
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
                {/* <Form.Group controlId="numero" className="my-3">
                  <Form.Label>Numero</Form.Label>

                  <Form.Control
                    required
                    type="text"
                    placeholder="Numero"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                  ></Form.Control>
                </Form.Group> */}
                <Row>
                  <Col>
                    <TextField
                      error={fieldError.includes("name") && true}
                      fullWidth
                      margin="normal"
                      id="name"
                      label="Nombre"
                      variant="outlined"
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
                      onChange={(e) => setEdad(e.target.value)}
                    />
                  </Col>
                  <Col>
                    <FormControl fullWidth className="mt-3">
                      <InputLabel id="demo-simple-select-label">
                        Sexo
                      </InputLabel>
                      <Select
                        error={fieldError.includes("sexo") && true}
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
                      onChange={(e) => setPrice(e.target.value)}
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
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Col>
                </Row>

                <div className="row col-6 mx-auto mt-3">
                  <Button type="submit" variant="primary">
                    Enviar
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default ProductCreateScreen;
