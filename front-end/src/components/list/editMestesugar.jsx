import React, { useContext, useState,useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Spinner from "react-bootstrap/esm/Spinner";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import { FaEdit,FaEnvelopeOpenText, FaSave,FaImage } from "react-icons/fa";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { UserContext } from "../../UserContext";
import ShowAlert from "../alerts/alerts";
import Accordion from "react-bootstrap/esm/Accordion"; 
import AddPhotos from "../forms/addPhotos";

const POSTfunc = require("../endpoints/postEndPoints");

function EditMestesugar(props) {
  // console.log(props);
  const { token } = useContext(UserContext);
  const [newNume, setNewNume] = useState("");
  const [showAlert, setShowAlert] = useState({ status: false, mess: "" });
  const [loading, isLoading] = useState(false);
  const [newObs, setNewObs] = useState({ obs: "", length: 0 });
  const [newObsEn, setNewObsEn] = useState({ obs_en: "", length: 0 });
  const [newObsDe, setNewObsDe] = useState({ obs_de: "", length: 0 });
  const [transferPhotoRes, setTransferPhotoRes] = useState(null);
  const handleClose = () => props.showEditMestesugar();
  // props.loading(loading)
  // console.log(loading);
  useEffect(() => {
    props.loading(loading)

  }, [loading,props])
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

    if (data.data === "") {
      alert("Nu au fost detectate modificari!");
    } else {
      isLoading(true);
      POSTfunc.POSTupdatePicsMestesugar(token, id, { photo: arrData })
        .then((res) => {
          setShowAlert({ status: true, mess: `${nume}, modificat cu succes!` });
          isLoading(false)
        })
        .catch((err) => {
          console.log(err);
          isLoading(false)
        });

      setTransferPhotoRes(null);
      setTimeout(() => setShowAlert({ status: false, mess: `` }), 4000);
      
    }
  };
  const updateNewNume = (token, id, data, nume) => {
    // console.log(data);
    if (data === "") {
      alert("Nu au fost detectate modificari!");
    } else {
      isLoading(true);
      POSTfunc.POSTupdateMestesugar(token, id, { nume: data.nume })
        .then((res) => {
          setShowAlert({ status: true, mess: `${nume}, modificat cu succes!` });
          isLoading(false);
        })
        .catch((err) => {
          console.log(err);
          isLoading(false);
        });
      setNewNume("");
      setTimeout(() => setShowAlert({ status: false, mess: `` }), 2000);
      
    }
  };
  const updateObs = (token, id, data, nume) => {
    if (data.data === "") {
      alert("Nu au fost detectate modificari!");
    } else {
      isLoading(true);
      POSTfunc.POSTupdateMestesugar(token, id, { obs: data.obs })
        .then((res) => {
          setShowAlert({ status: true, mess: `${nume}, modificat cu succes!` });
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
    console.log(data);
    if (data.data === "") {
      alert("Nu au fost detectate modificari!");
    } else {
      isLoading(true);
      POSTfunc.POSTupdateMestesugar(token, id, { obs_en: data.obs_en })
        .then((res) => {
          setShowAlert({ status: true, mess: `${nume}, modificat cu succes!` });
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
      POSTfunc.POSTupdateMestesugar(token, id, { obs_de: data.obs_de })
        .then((res) => {
          setShowAlert({ status: true, mess: `${nume}, modificat cu succes!` });
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

  if (props.data) {
    let data = props.data.mestesugar;

    // console.log(data);
    return (
      <div>
        <span
          style={{
            zIndex: "10000",
            position: "absolute",
            top: "10px",
            left: "45%",
          }}
        >
          <ShowAlert title={"Mesaj"} statusShow={showAlert.status} mess={showAlert.mess} variant={"success"} />
        </span>
        <span>
          <Offcanvas style={{ zIndex: "19999", width: "30%" }} backdrop={false} show={props.show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>
                <FaEdit /> {!props.data.fetchLoad ? data.nume : "Loading"}
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              {!props.data.fetchLoad ? (
                <span>
                  <span>
                  <Form>
                    <Row>
                      <Form.Label>Titlu</Form.Label>
                      <Col lg={true}>
                        <Form.Control
                          onChange={(e) => {
                            setNewNume({ nume: e.target.value });
                          }}
                          className='mb-2'
                          id='inlineFormInput'
                          placeholder='Nume'
                          defaultValue={data.nume}
                        />
                      </Col>
                      <Col lg='auto'>
                        <Button
                          type='submit'
                          onClick={(e) => {
                            updateNewNume(token, data._id, newNume, data.nume);
                            e.preventDefault();
                          }}
                          className='mb-2'
                        >
                          {loading?'':<FaSave />}
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                  </span>
                  <span>
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
                            defaultValue={data.obs}
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
                                onClick={() => updateObs(token, data._id, newObs, data.nume)}
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
                        <FloatingLabel style={{ marginBottom: "40px" }} controlId='floatingTextarea2' label='Obs En'>
                          <Form.Control
                            as='textarea'
                            maxLength='700'
                            placeholder='Leave a comment here'
                            defaultValue={data.obs_en}
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
                                onClick={() => updateObsEn(token, data._id, newObsEn, data.nume)}
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
                        <FloatingLabel style={{ marginBottom: "40px" }} controlId='floatingTextarea2' label='Obs De'>
                          <Form.Control
                            as='textarea'
                            maxLength='700'
                            placeholder='Leave a comment here'
                            defaultValue={data.obs_de}
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
                                onClick={() => updateObsDe(token, data._id, newObsDe, data.nume)}
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
                            updateNewPhoto(token, data._id, transferPhotoRes, data.nume);
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
                  </span>
                </span>
                
              ) : (
                <Spinner
                  animation='border'
                  style={{
                    color: "green",
                    width: "4rem",
                    height: "4rem",
                    margin:'auto',
                    position: "absolute",
                  }}
                />
              )
              }
            </Offcanvas.Body>
          </Offcanvas>
        </span>
      </div>
    );
  } else {
    <div style={{ width: "100%", height: "100%", position: "absolute", margin: "auto", zIndex: "99999" }}>
      <Spinner
        animation='border'
        style={{ color: "green", width: "400px", height: "400px", left: "40%", top: "30%", position: "fixed" }}
      />
    </div>;
  }
}

export default EditMestesugar;
