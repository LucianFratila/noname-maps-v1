import React, { useState, useContext, useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
import Leaflet from "leaflet";
import { Marker, Popup } from "react-leaflet";
import Button from "react-bootstrap/esm/Button";
import Spinner from "react-bootstrap/esm/Spinner";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Accordion from "react-bootstrap/esm/Accordion";
import AddPhotos from "../forms/addPhotos";
import { FaEdit, FaTrash, FaEnvelopeOpenText, FaImage, FaSave } from "react-icons/fa";
import { UserContext } from "../../UserContext";
import Image from "react-bootstrap/Image";
import Carousel from "react-bootstrap/Carousel";
import { AiOutlineCaretRight } from "react-icons/ai";
const DELETEfunc = require("../endpoints/delEndPoints");
const POSTfunc = require("../endpoints/postEndPoints");
const popupContent = {
  textAlign: "center",
  height: "100%",
  marginTop: "30px",
};
const popupHead = {
  fontWeight: "bold",
  fontSize: "22px",
};

const popupText = {
  fontSize: "15px",
  marginBottom: "20px",
};

const okText = {
  fontSize: "15px",
};

class MyCustomPin {
  constructor(color) {
    this.color = color;
  }

  obiectiveIcon(x) {
    return Leaflet.divIcon({
      className: "my-custom-pin",
      iconAnchor: [0, 0],
      labelAnchor: [0, 0],
      popupAnchor: [0, -36],
      html: `<span style="background-color: ${x};
        width: 2rem;
        height: 2rem;
        display: block;
        left: -1.5rem;
        top: -1.5rem;
        position: relative;
        border-radius: 3rem 3rem 0;
        transform: rotate(45deg);
        border: 1px solid #FFFFFF" />`,
    });
  }
}
let obiectivePin = new MyCustomPin();

function Obiective({ categorieObiective, loadingCategorieObiective,refresTokenFunc }) {
  const { token } = useContext(UserContext);
  //////of canvas cat obiective controls//////
  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //////of canvas cat obiective controls//////

  //////of canvas edit obiectiv controls//////
  const [showEditObiectiv, setShowEditObiectiv] = useState(false);
  const handleCloseEditObiectiv = () => setShowEditObiectiv(false);
  const handleShowEditObiectiv = () => setShowEditObiectiv(true);
  const [editData, setEditData] = useState(null);
  //////of canvas edit obiectiv controls//////

  ////////////edi state///////////////
  const [transferPhotoRes, setTransferPhotoRes] = useState(null);
  const [showAlert, setShowAlert] = useState({ status: false, mess: "" });
  const [newNume, setNewNume] = useState("");
  const [newObs, setNewObs] = useState({ obs: "", length: 0 });
  const [newObsEn, setNewObsEn] = useState({ obs_en: "", length: 0 });
  const [newObsDe, setNewObsDe] = useState({ obs_de: "", length: 0 });
  ////////////edi state///////////////

  ///////loading state/////////////
  const [loading, isLoading] = useState(false);
  ///////loading state/////////////

  ///////pass loading state to useGETallCategoriiObiective hook/////////////
  useEffect(() => {
    loadingCategorieObiective(loading);
    refresTokenFunc(loading)
  }, [loading, loadingCategorieObiective,refresTokenFunc]);
  ///////pass loading state to useGETallCategoriiObiective hook/////////////

  ///////loading state/////////////

  ///////////pop up buttons functions////////////////////
  const onDeleteObiectiv = (id, nume) => {
    if (window.confirm(`Stergi ${nume} ?`)) {
      isLoading(true);
      DELETEfunc.DELETEObiectivById(id, token)
        .then(() => {
          console.log("Success");
          isLoading(false);
        })
        .catch((err) => {
          console.log(err);
          isLoading(false);
        });
    } else {
      // Do nothing!
      console.log("Thing was not saved to the database.");
      isLoading(false);
    }
  };

  const onDeleteIMG = (id, photoId, public_id) => {
    if (window.confirm(`Stergi ${public_id} ?`)) {
      isLoading(true);
      DELETEfunc.DELETETPhotoById(token, id, photoId, public_id)
        .then((res) => {
          isLoading(false);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          isLoading(false);
        });
    } else {
      console.log("Thing was not saved to the database.");
    }
  };

  const onEdit = (item) => {
    handleShowEditObiectiv();
    setEditData(item);
    // console.log(item);
  };
  //   console.log(loading);
  useEffect(() => {
    if (showAlert.status) {
      setTimeout(() => handleCloseEditObiectiv(), 1000);
    }
  }, [showAlert]);

  //   console.log(editData);
  ///////////pop up buttons functions////////////////////

  //////////////////////edit functions/////////////////////
  const updateNewPhoto = (token, id, data, nume) => {
    // console.log(data);
    let arrData = [];
    if (data) {
      data.map((item, index) => {
        return arrData.push({
          public_id: item.public_id,
          secure_url: item.secure_url,
        });
      });
    }
    // console.log(arrData);
    if (data.data === "") {
      alert("Nu au fost detectate modificari!");
    } else {
      isLoading(true);
      POSTfunc.POSTupdatePicsObiectiv(token, id, { photo: arrData })
        .then((res) => {
          setShowAlert({ status: true, mess: `modificat cu succes!` });
          isLoading(false);
        })
        .catch((err) => {
          console.log(err);
          isLoading(false);
        });

      setTransferPhotoRes(null);
      setTimeout(() => setShowAlert({ status: false, mess: `` }), 6000);
    }
  };

  const updateNewNume = (token, id, data, nume) => {
    if (data.data === "") {
      alert("Nu au fost detectate modificari!");
    } else {
      isLoading(true);
      POSTfunc.POSTupdateObiectiv(token, id, { nume: data.nume })
        .then((res) => {
          setShowAlert({ status: true, mess: `modificat cu succes!` });
          isLoading(false);
        })
        .catch((err) => {
          console.log(err);
          isLoading(false);
        });
      setNewNume("");
      setTimeout(() => setShowAlert({ status: false, mess: `` }), 6000);
    }
  };

  const updateObs = (token, id, data, nume) => {
    if (data.data === "") {
      alert("Nu au fost detectate modificari!");
    } else {
      isLoading(true);
      POSTfunc.POSTupdateObiectiv(token, id, { obs: data.obs })
        .then((res) => {
          setShowAlert({ status: true, mess: `modificat cu succes!` });
          isLoading(false);
        })
        .catch((err) => {
          console.log(err);
          isLoading(false);
        });
      setNewObs({ data: "", length: 0 });
      setTimeout(() => setShowAlert({ status: false, mess: `` }), 6000);
    }
  };
  const updateObsEn = (token, id, data, nume) => {
    if (data.data === "") {
      alert("Nu au fost detectate modificari!");
    } else {
      isLoading(true);
      POSTfunc.POSTupdateObiectiv(token, id, { obs_en: data.obs_en })
        .then((res) => {
          setShowAlert({ status: true, mess: `modificat cu succes!` });
          isLoading(false);
        })
        .catch((err) => {
          console.log(err);
          isLoading(false);
        });
      setNewObsEn({ data: "", length: 0 });
      setTimeout(() => setShowAlert({ status: false, mess: `` }), 6000);
    }
  };
  const updateObsDe = (token, id, data, nume) => {
    if (data.data === "") {
      alert("Nu au fost detectate modificari!");
    } else {
      isLoading(true);
      POSTfunc.POSTupdateObiectiv(token, id, { obs_de: data.obs_de })
        .then((res) => {
          setShowAlert({ status: true, mess: `modificat cu succes!` });
          isLoading(false);
        })
        .catch((err) => {
          console.log(err);
          isLoading(false);
        });
      setNewObsDe({ data: "", length: 0 });
      setTimeout(() => setShowAlert({ status: false, mess: `` }), 6000);
    }
  };

  /////////////////////edit functions//////////////////////

  let data = categorieObiective.categorii;
  let catLength;
  if (data) {
    catLength = data.length;
  }

  const [showCheck, setShowCheck] = useState(new Array(catLength).fill(false));
  const handleOnChange = (position) => {
    const updatedCheckedState = showCheck.map((item, index) => (index === position ? !item : item));
    setShowCheck(updatedCheckedState);
  };

  if (data) {
    let obiectiv;
    if (editData) {
      obiectiv = editData.obiective[0];
    }

    return (
      <span>
        {loading ? (
          <span
            style={{
              zIndex: "9999",
              position: "fixed",
              left: "45%",
              margin: "auto",
              padding: "10px",
              top: "20px",
              width: "auto",
              height: "auto",
              fontSize: "17px",
            }}
          >
            <Spinner as='span' style={{width:'70px', height:'70px'}}  size='lg' role='status' aria-hidden='true' animation="grow" variant="success" />
          </span>
        ) : null}

        {/*/////////////////////////////////////////////////////////////////EDIT OBIECTIVE////////////////////////////////////////////////////////////  */}
        <span>
          <Offcanvas style={{ width: "30%" }} backdrop={false} show={showEditObiectiv} onHide={handleCloseEditObiectiv}>
            {editData ? (
              <span>
                {/* {console.log(editData.obiective[0])} */}
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>
                    <FaEdit />
                    {obiectiv.nume}
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <div>
                    <span>
                      <Form>
                        <Row>
                          <Form.Label>Titlu Ro</Form.Label>
                          <Col lg={true}>
                            <Form.Control
                              onChange={(e) => {
                                setNewNume({ nume: e.target.value });
                              }}
                              className='mb-2'
                              id='inlineFormInput'
                              placeholder='Nume'
                              defaultValue={obiectiv.nume}
                            />
                          </Col>
                          <Col lg='auto'>
                            <Button
                              type='submit'
                              onClick={(e) => {
                                updateNewNume(token, obiectiv._id, newNume, obiectiv.nume);
                                e.preventDefault();
                              }}
                              className='mb-2'
                            >
                              <FaSave />
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    </span>

                    {/* Obs section */}

                    <Accordion defaultActiveKey='0'>
                      <Accordion.Item eventKey='0'>
                        <Accordion.Header>
                          <FaEnvelopeOpenText size={20} style={{ margin: "5px" }} />
                          Modifica Obs
                        </Accordion.Header>
                        <Accordion.Body>
                          <span>
                            <FloatingLabel style={{ marginBottom: "40px" }} controlId='floatingTextarea2' label='Obs'>
                              <Form.Control
                                as='textarea'
                                maxLength='700'
                                placeholder='Leave a comment here'
                                defaultValue={obiectiv.obs}
                                onChange={(e) => {
                                  setNewObs({
                                    obs: e.target.value,
                                    length: e.target.value.length,
                                  });
                                }}
                                style={{ height: "auto" }}
                              />
                              <span style={{ marginTop: "5px", position: "absolute" }}>
                                <span>
                                  <Button
                                    onClick={() => updateObs(token, obiectiv._id, newObs, obiectiv._id.nume)}
                                    size='sm'
                                  >
                                    <FaSave />
                                  </Button>
                                </span>
                                <span style={{ fontSize: "13px", marginLeft: "4px" }}>
                                  {newObs.length === 0 ? "" : `Caractere:  ${newObs.length} /700 max`}
                                </span>
                              </span>
                            </FloatingLabel>
                          </span>
                          <span>
                            <FloatingLabel
                              style={{ marginBottom: "40px" }}
                              controlId='floatingTextarea2'
                              label='Obs En'
                            >
                              <Form.Control
                                as='textarea'
                                maxLength='700'
                                placeholder='Leave a comment here'
                                defaultValue={obiectiv.obs_en}
                                onChange={(e) => {
                                  setNewObsEn({
                                    obs_en: e.target.value,
                                    length: e.target.value.length,
                                  });
                                }}
                                style={{ height: "auto" }}
                              />
                              <span style={{ marginTop: "5px", position: "absolute" }}>
                                <span>
                                  <Button
                                    onClick={() => updateObsEn(token, obiectiv._id, newObsEn, obiectiv.nume)}
                                    size='sm'
                                  >
                                    <FaSave />
                                  </Button>
                                </span>
                                <span style={{ fontSize: "13px", marginLeft: "4px" }}>
                                  {newObsEn.length === 0 ? "" : `Caractere:  ${newObsEn.length} /700 max`}
                                </span>
                              </span>
                            </FloatingLabel>
                          </span>
                          <span>
                            <FloatingLabel
                              style={{ marginBottom: "40px" }}
                              controlId='floatingTextarea2'
                              label='Obs De'
                            >
                              <Form.Control
                                as='textarea'
                                maxLength='700'
                                placeholder='Leave a comment here'
                                defaultValue={obiectiv.obs_de}
                                onChange={(e) => {
                                  setNewObsDe({
                                    obs_de: e.target.value,
                                    length: e.target.value.length,
                                  });
                                }}
                                style={{ height: "auto" }}
                              />
                              <span style={{ marginTop: "5px", position: "absolute" }}>
                                <span>
                                  <Button
                                    onClick={() => updateObsDe(token, obiectiv._id, newObsDe, obiectiv.nume)}
                                    size='sm'
                                  >
                                    <FaSave />
                                  </Button>
                                </span>
                                <span style={{ fontSize: "13px", marginLeft: "4px" }}>
                                  {newObsDe.length === 0 ? "" : `Caractere:  ${newObsDe.length} /700 max`}
                                </span>
                              </span>
                            </FloatingLabel>
                          </span>
                        </Accordion.Body>
                      </Accordion.Item>

                      {/* Obs section */}
                      {/* Up img section */}

                      <Accordion.Item eventKey='1'>
                        <Accordion.Header>
                          <FaImage size={20} style={{ margin: "5px" }} /> Adauga Poze
                        </Accordion.Header>
                        <Accordion.Body>
                          <AddPhotos response={(data) => setTransferPhotoRes(data)} callBack={transferPhotoRes} />
                          {transferPhotoRes ? (
                            <Button
                              onClick={(e) => {
                                updateNewPhoto(token, obiectiv._id, transferPhotoRes, obiectiv.nume);
                                e.preventDefault();
                              }}
                              variant='success'
                              style={{ margin: "3px", width: "100%" }}
                            >
                              Salveaza
                            </Button>
                          ) : null}
                        </Accordion.Body>
                      </Accordion.Item>

                      {/* Up img section */}
                    </Accordion>
                  </div>
                </Offcanvas.Body>
              </span>
            ) : (
              "Loading"
            )}
          </Offcanvas>
        </span>
        {/*/////////////////////////////////////////////////////////////////EDIT OBIECTIVE////////////////////////////////////////////////////////////  */}
        <span style={{ position: "fixed", zIndex: "7998", top: "100px", left: "-8px" }}>
          {!show ? (
            <Button variant='dark' size='lg' onClick={handleShow}>
              <AiOutlineCaretRight />
            </Button>
          ) : null}
        </span>
        <Offcanvas backdrop={false} show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Lista Obiective Turistice</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {data.map((item, index) =>
              item.obiective.length !== 0 ? (
                <span key={item.categorie._id}>
                  <span className='d-flex p-2'>
                    <span
                      className='badge'
                      style={{
                        background: item.categorie.color,
                        fontSize: "14px",
                      }}
                    >
                      {item.obiective.length}
                    </span>

                    <Form style={{ marginLeft: "5px" }}>
                      <Form.Check
                        type='switch'
                        id={`default-checkbox-${index}`}
                        label={item.categorie.nume}
                        value={item.categorie.nume}
                        checked={showCheck[index]}
                        onChange={(e) => {
                          handleOnChange(index);
                        }}
                      />
                    </Form>
                  </span>
                  {/* ///////////////////////////////////////////////////////// MAP MARKERS /////////////////////////////////////////////// */}
                  <span>
                    {showCheck[index] ? (
                      <div>
                        {item
                          ? item.obiective.map((i) => (
                              <Marker
                                key={i._id}
                                position={i.location.coordinates}
                                icon={obiectivePin.obiectiveIcon(i.categorie[0].color)}
                              >
                                <Popup className='request-popup'>
                                  <div style={popupContent}>
                                    <div className='m-2' style={popupHead}>
                                      {i.nume}
                                    </div>
                                    <hr />
                                    <Carousel interval={null} fade>
                                      {i.photo
                                        ? i.photo.map((x) => (
                                            <Carousel.Item key={x.public_id}>
                                              <div className='containerIMG'>
                                                <Image
                                                  src={x.secure_url}
                                                  style={{ width: "300px", height: "auto" }}
                                                  rounded
                                                />
                                                <div className='middle'>
                                                  <Button
                                                    variant='danger'
                                                    onClick={() => onDeleteIMG(i._id, x._id, x.public_id)}
                                                    className='text'
                                                  >
                                                    <FaTrash />
                                                  </Button>
                                                </div>
                                              </div>
                                            </Carousel.Item>
                                          ))
                                        : `No Photos`}
                                    </Carousel>

                                    <span style={popupText}>{i.obs}</span>
                                    <div className='m-2' style={okText}>
                                      <b>Categorie: </b>
                                      {i.categorie.map((sub, index) => (
                                        <span key={index}>{sub.nume}</span>
                                      ))}
                                      <hr />
                                      <Button
                                        style={{ margin: "3px" }}
                                        variant='danger'
                                        size='sm'
                                        onClick={() => onDeleteObiectiv(i._id, i.nume)}
                                      >
                                        <FaTrash />
                                      </Button>
                                      <Button
                                        style={{ margin: "3px" }}
                                        variant='primary'
                                        size='sm'
                                        onClick={() => onEdit(item)}
                                      >
                                        <FaEdit />
                                      </Button>
                                    </div>
                                  </div>
                                </Popup>
                              </Marker>
                            ))
                          : null}
                      </div>
                    ) : null}
                  </span>
                  {/* ///////////////////////////////////////////////////////// MAP MARKERS /////////////////////////////////////////////// */}
                </span>
              ) : null
            )}
          </Offcanvas.Body>
        </Offcanvas>
      </span>
    );
  } else return null;
}

export default React.memo(Obiective);
