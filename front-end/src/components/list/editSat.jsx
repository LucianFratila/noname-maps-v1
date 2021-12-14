import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import { FaSave } from "react-icons/fa";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import useSat from "../hooks/useSateById";
import { UserContext } from "../../UserContext";
import Spinner from "react-bootstrap/esm/Spinner";
import ShowAlert from "../alerts/alerts";
import Accordion from "react-bootstrap/esm/Accordion";
import { FaEdit, FaEnvelopeOpenText,FaImage } from "react-icons/fa";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import AddPhotos from "../forms/addPhotos";

const POSTfunc = require("../endpoints/postEndPoints");

function EditSat({data2EditSate,show,showEditSate,triggerSate}) {

  const { token } = useContext(UserContext);
  const [transferPhotoRes, setTransferPhotoRes] = useState(null);
  const [newObs, setNewObs] = useState({ obs: "", length: 0 });
  const [newObsEn, setNewObsEn] = useState({ obs_en: "", length: 0 });
  const [newObsDe, setNewObsDe] = useState({ obs_de: "", length: 0 });
  const [showAlert, setShowAlert] = useState({ status: false, mess: "" });
  const [loading, isLoading] = useState(false);
  const [newNume, setNewNume] = useState("");
  const { sat, fetchLoad } = useSat(token, data2EditSate.id, loading);
  // console.log(loading);
  const handleClose = () => {
    showEditSate();
  };
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
      isLoading(true)
      triggerSate(true)
      POSTfunc.POSTupdatePicsSat(token, id, { photo: arrData })
        .then((res) => {
          setShowAlert({ status: true, mess: `${nume}, modificat cu succes!` });
          isLoading(false)
          triggerSate(false)
        })
        .catch((err) => {
          console.log(err);
          isLoading(false)
          triggerSate(false)
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
      triggerSate(true)
      POSTfunc.POSTupdateSat(token, id, { nume: data.nume })
        .then((res) => {
          setShowAlert({ status: true, mess: `${nume}, modificat cu succes!` });
          isLoading(false);
          triggerSate(false)
        })
        .catch((err) => {
          console.log(err);
          isLoading(false);
          triggerSate(false)
        });
      setNewNume("");
      setTimeout(() => setShowAlert({ status: false, mess: `` }), 6000);
      
    }
  };
  const updateObs = (token, id, data, nume) => {
    if (data.data === "") {
      alert("Nu au fost detectate modificari!");
    } else {
      isLoading(true)
      triggerSate(true)
      POSTfunc.POSTupdateSat(token, id, { obs: data.obs })
        .then((res) => {
          setShowAlert({ status: true, mess: `${nume}, modificat cu succes!` });
          isLoading(false)
          triggerSate(false)
        })
        .catch((err) => {
          console.log(err);
          isLoading(false)
          triggerSate(false)
        });
      setNewObs({ data: "", length: 0 });
      setTimeout(() => setShowAlert({ status: false, mess: `` }), 6000);
      
    }
  };
  const updateObsEn = (token, id, data, nume) => {
    if (data.data === "") {
      alert("Nu au fost detectate modificari!");
    } else {
      isLoading(true)
      triggerSate(true)
      POSTfunc.POSTupdateSat(token, id, { obs_en: data.obs_en })
        .then((res) => {
          setShowAlert({ status: true, mess: `${nume}, modificat cu succes!` });
          isLoading(false)
          triggerSate(false)
        })
        .catch((err) => {
          console.log(err);
          isLoading(false)
          triggerSate(false)
        });
      setNewObsEn({ data: "", length: 0 });
      setTimeout(() => setShowAlert({ status: false, mess: `` }), 6000);
      
    }
  };
  const updateObsDe = (token, id, data, nume) => {
    if (data.data === "") {
      alert("Nu au fost detectate modificari!");
    } else {
      isLoading(true)
      triggerSate(true)
      POSTfunc.POSTupdateSat(token, id, { obs_de: data.obs_de })
        .then((res) => {
          setShowAlert({ status: true, mess: `${nume}, modificat cu succes!` });
          isLoading(false)
          triggerSate(false)
        })
        .catch((err) => {
          console.log(err);
          isLoading(false)
          triggerSate(false)
        });
      setNewObsDe({ data: "", length: 0 });
      setTimeout(() => setShowAlert({ status: false, mess: `` }), 6000);
      
    }
  };

  if (sat) {
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

        <Offcanvas style={{ width: "30%" }} backdrop={false} show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title><FaEdit/> {fetchLoad ? "Loading" : sat.sat.nume}</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
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
                      defaultValue={sat.sat.nume}
                    />
                  </Col>
                  <Col lg='auto'>
                    <Button
                      type='submit'
                      onClick={(e) => {
                        updateNewNume(token, sat.sat._id, newNume, sat.sat.nume);
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
                            defaultValue={sat.sat.obs}
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
                                onClick={() => updateObs(token, sat.sat._id, newObs, sat.sat.nume)}
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
                            defaultValue={sat.sat.obs_en}
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
                                onClick={() => updateObsEn(token, sat.sat._id, newObsEn, sat.sat.nume)}
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
                            defaultValue={sat.sat.obs_de}
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
                                onClick={() => updateObsDe(token, sat.sat._id, newObsDe, sat.sat.nume)}
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
                            updateNewPhoto(token, sat.sat._id, transferPhotoRes, sat.sat.nume);
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
            
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    );
  } else {
    return (
      <div style={{ width: "100%", height: "100%", position: "absolute", margin: "auto", zIndex: "99999" }}>
        <Spinner
          animation='border'
          style={{ color: "green", width: "400px", height: "400px", left: "40%", top: "30%", position: "fixed" }}
        />
      </div>
    );
  }
}

export default EditSat;
