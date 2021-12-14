import React, { useState, useEffect, useContext } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { FaEnvelopeOpenText, FaImage, FaPlusCircle } from "react-icons/fa";
import Accordion from "react-bootstrap/Accordion";
import { MdAddLocationAlt } from "react-icons/md";
import ProgressBar from "react-bootstrap/ProgressBar";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { UserContext } from "../../UserContext";
import Leaflet from "leaflet";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const POSTfunc = require("../endpoints/postEndPoints");

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

let selectPin = new MyCustomPin();

function AddObiective({ sate, categorieObiective, loadingCategorieObiective }) {
  // console.log(sate);
  // console.log(categorieObiective);

  //////img up state/////
  const [file, setFile] = useState([]);
  const [imgUpLoading, isImgUpLoading] = useState({ state: false });
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [succesUp, setSuccessUp] = useState({ state: false, mess: "" });
  const [responseUpload, setResponseUpload] = useState();
  //////img up state/////

  const { token } = useContext(UserContext);
  const { user } = useContext(UserContext);
  const [clickPos, setClickPos] = useState(null);
  const [loading, isLoading] = useState(false);
  ///form state////
  const [nume2send, setNume2send] = useState();
  const [sat2send, setSate2send] = useState("");
  const [cat2send, setCat2send] = useState("");
  const [nume_en2send, setNume_en2send] = useState();
  const [nume_de2send, setNume_de2send] = useState();
  const [adresa2send, setAdresa2send] = useState();
  const [tel2send, setTel2send] = useState();
  const [obs2send, setObs2send] = useState();
  const [obs_en2send, setObs_en2send] = useState();
  const [obs_de2send, setObs_de2send] = useState();

  const [nume, setNume] = useState();
  const [nume_en, setNumeEn] = useState();
  const [nume_de, setNumeDe] = useState();
  const [color, setColor] = useState();
  ///form state////
  useEffect(() => {
    loadingCategorieObiective(loading);
  }, [loading, loadingCategorieObiective]);
  ///off canvas controls////
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  ///off canvas controls////

  //////img upload/////////
  const uploadImage = async (e) => {
    e.preventDefault();
    // console.log(file);
    let fd = new FormData();
    file.map((item) => {
      return fd.append(`images`, item);
    });

    // console.log(data);
    try {
      isImgUpLoading({ state: true });
      const response = await axios.post(`${SERVER_URL}/api/v1/media/image_upload`, fd, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)));
        },
      });
      setTimeout(() => {
        setUploadPercentage(0);
        setSuccessUp({ state: false, mess: "Incarca imagini" });
      }, 10000);
      isImgUpLoading({ state: false });
      setSuccessUp({ state: true, mess: "Imagini incarcate" });
      setResponseUpload(response.data.getItems);
    } catch (error) {
      console.log(error);
    }
  };

  ////////img upload///////

  const onChangeIMGup = (e) => {
    var filesArr = Array.prototype.slice.call(e.target.files);
    setFile(filesArr);
    // console.log(e.target.files);
  };
  //////img upload////////

  const sendForm = (e) => {
    e.preventDefault();
    isLoading(true);
    POSTfunc.POSTcreateObiectiv(
      token,
      nume2send,
      sat2send,
      cat2send,
      nume_en2send,
      nume_de2send,
      adresa2send,
      tel2send,
      responseUpload,
      obs2send,
      obs_en2send,
      obs_de2send,
      clickPos.lat,
      clickPos.lng,
      user.email
    ).then((res) => {
      // console.log(res);
      isLoading(false);
    });
  };

  const sendFormCat = (e) => {
    e.preventDefault();
    isLoading(true);

    POSTfunc.POSTcreateObiectivCat(token, {
      nume: nume,
      nume_en: nume_en,
      nume_de: nume_de,
      color: color,
    })
      .then((res) => {
        // console.log(res);
        isLoading(false);
      })
      .catch((err) => {
        console.log(err);
        isLoading(false);
      });
  };

  useMapEvents({
    click: (e) => {
      setClickPos(e.latlng);
    },
  });

  if (true) {
    return (
      <span>
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
            backgroundColor: "white",
            fontSize: "17px",
          }}
        >
          Adauga obiectiv pe harta
        </span>
        <Offcanvas style={{ width: "30%" }} show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <MdAddLocationAlt size='30' />
              {clickPos ? ` ${clickPos.lat.toFixed(2)},${clickPos.lng.toFixed(2)}` : null}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {/* add categorie */}
            <Accordion defaultActiveKey='1'>
              <Accordion.Item style={{ margin: "3px", width: "100%" }} eventKey='0'>
                <Accordion.Header>
                  <FaPlusCircle size={20} style={{ margin: "5px" }} /> Adauga Categorie
                </Accordion.Header>
                <Accordion.Body>
                  <Form onSubmit={sendFormCat}>
                    <Form.Group>
                      <Row className='align-items-center'>
                        <Col sm={5} className='my-1'>
                          <Form.Control
                            required
                            onChange={(e) => {
                              e.preventDefault();
                              setNume(e.target.value);
                            }}
                            id='inlineFormInputName'
                            placeholder={"ro"}
                          />
                          <Form.Control
                            required
                            onChange={(e) => {
                              e.preventDefault();
                              setNumeEn(e.target.value);
                            }}
                            id='inlineFormInputName'
                            placeholder={"en"}
                          />
                          <Form.Control
                            required
                            onChange={(e) => {
                              e.preventDefault();
                              setNumeDe(e.target.value);
                            }}
                            id='inlineFormInputName'
                            placeholder={"de"}
                          />
                        </Col>
                        <>
                          <Form.Control
                            type='color'
                            id='exampleColorInput'
                            defaultValue='#563d7c'
                            title='Choose your color'
                            onChange={(e) => setColor(e.target.value)}
                          />
                        </>
                        <Col xs='auto' className='my-1'>
                          <Button type='submit'>{loading ? `Loading` : "Trimite"}</Button>
                        </Col>
                      </Row>
                    </Form.Group>
                  </Form>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>

            {/* add categorie */}

            <Accordion defaultActiveKey='1'>
              <Accordion.Item style={{ margin: "3px", width: "100%" }} eventKey='1'>
                <Accordion.Header>
                  <FaImage size={20} style={{ margin: "5px" }} /> Adauga Poze
                </Accordion.Header>
                <Accordion.Body>
                  <div>
                    <div>
                      <ProgressBar style={{ marginTop: "7px" }} animated now={uploadPercentage} />
                      <Form.Group className='d-flex p-2'>
                        <Form.Control
                          type='file'
                          multiple={true}
                          // required
                          name='images'
                          onChange={(e) => onChangeIMGup(e)}
                        />
                        {/* <input type="file" onChange= {(e)=> setImage(e.target.files[0])}></input> */}
                        <OverlayTrigger
                          show={succesUp.state}
                          placement='top'
                          overlay={<Tooltip id={`tooltip`}>{succesUp.mess}</Tooltip>}
                        >
                          <Button disabled={imgUpLoading.state} onClick={uploadImage}>
                            {imgUpLoading.state === true ? `Loading` : `Incarca`}
                          </Button>
                        </OverlayTrigger>
                      </Form.Group>
                    </div>
                    <div>{/* <Image src={urlImg.url} style={{width:'100%',height:'auto'}} rounded /> */}</div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Form onSubmit={sendForm}>
              <Row>
                <Form.Group style={{ margin: "3px", width: "100%" }} as={Row} controlId='formGridCity'>
                  <Form.Control
                    // required
                    onChange={(e) => {
                      e.preventDefault();
                      setNume2send(e.target.value);
                    }}
                    placeholder='Nume obiectiv ro'
                  />
                </Form.Group>
                <Form.Group style={{ margin: "3px", width: "100%" }} as={Row} controlId='formGridCity'>
                  <Form.Control
                    // required
                    onChange={(e) => {
                      e.preventDefault();
                      setNume_en2send(e.target.value);
                    }}
                    placeholder='Nume obiectiv en'
                  />
                </Form.Group>
                <Form.Group style={{ margin: "3px", width: "100%" }} as={Row} controlId='formGridCity'>
                  <Form.Control
                    // required
                    onChange={(e) => {
                      e.preventDefault();
                      setNume_de2send(e.target.value);
                    }}
                    placeholder='Nume obiectiv de'
                  />
                </Form.Group>
                <Form.Group style={{ margin: "3px", width: "100%" }} as={Row} controlId='formGridCity'>
                  <Form.Control
                    // required
                    onChange={(e) => {
                      e.preventDefault();
                      setAdresa2send(e.target.value);
                    }}
                    placeholder='Adresa'
                  />
                </Form.Group>
                <Form.Group style={{ margin: "3px", width: "100%" }} as={Row} controlId='formGridCity'>
                  <Form.Control
                    type='tel'
                    onChange={(e) => {
                      e.preventDefault();
                      setTel2send(e.target.value);
                    }}
                    placeholder='Telefon'
                  />
                </Form.Group>
                <Accordion defaultActiveKey='1'>
                  <Accordion.Item style={{ margin: "3px", width: "100%" }} eventKey='1'>
                    <Accordion.Header>
                      <FaEnvelopeOpenText size={20} style={{ margin: "5px" }} /> Adauga Obs
                    </Accordion.Header>
                    <Accordion.Body>
                      <span style={{ height: "auto", margin: "3px", width: "100%", marginBottom: "40px" }}>
                        <Form.Control
                          as='textarea'
                          maxLength='700'
                          placeholder='Obs ro'
                          onChange={(e) => {
                            e.preventDefault();
                            setObs2send(e.target.value);
                          }}
                        />
                        <span style={{ marginTop: "1px", position: "absolute" }}>
                          <span style={{ fontSize: "13px", marginLeft: "4px" }}>
                            {obs2send ? (obs2send.length === 0 ? "" : `Caractere:  ${obs2send.length} /700 max`) : null}
                          </span>
                        </span>
                      </span>
                      <span style={{ height: "auto", margin: "3px", width: "100%", marginBottom: "40px" }}>
                        <Form.Control
                          as='textarea'
                          maxLength='700'
                          placeholder='Obs en'
                          onChange={(e) => {
                            e.preventDefault();
                            setObs_en2send(e.target.value);
                          }}
                        />
                        <span style={{ marginTop: "1px", position: "absolute" }}>
                          <span style={{ fontSize: "13px", marginLeft: "4px" }}>
                            {obs_en2send
                              ? obs_en2send.length === 0
                                ? ""
                                : `Caractere:  ${obs_en2send.length} /700 max`
                              : null}
                          </span>
                        </span>
                      </span>
                      <span style={{ height: "auto", margin: "3px", width: "100%", marginBottom: "40px" }}>
                        <Form.Control
                          as='textarea'
                          maxLength='700'
                          placeholder='Obs de'
                          onChange={(e) => {
                            e.preventDefault();
                            setObs_de2send(e.target.value);
                          }}
                        />
                        <span style={{ marginTop: "1px", position: "absolute" }}>
                          <span style={{ fontSize: "13px", marginLeft: "4px" }}>
                            {obs_de2send
                              ? obs_de2send.length === 0
                                ? ""
                                : `Caractere:  ${obs_de2send.length} /700 max`
                              : null}
                          </span>
                        </span>
                      </span>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Row>
              <Row style={{ margin: "3px", width: "100%" }}>
                {/* Categorii select */}
                <Form.Group as={Col} controlId='formGridState'>
                  <Form.Select
                    onClick={(e) => {
                      setCat2send(e.target.value);
                    }}
                    defaultValue={"Categorii obiective..."}
                  >
                    <option disabled={true} key={1}>
                      Categorii obiective...
                    </option>
                    {categorieObiective
                      ? categorieObiective.categorii.map((item) => (
                          <option
                            style={{ color: item.categorie.color }}
                            value={item.categorie._id}
                            key={item.categorie._id}
                          >
                            {item.categorie.nume}
                          </option>
                        ))
                      : null}
                  </Form.Select>
                </Form.Group>

                <Form.Group className='d-flex' as={Col} controlId='formGridState'>
                  <Form.Select
                    required={true}
                    onClick={(e) => {
                      setSate2send(e.target.value);
                    }}
                    defaultValue={"Localitate..."}
                  >
                    <option disabled={true} key={1}>
                      Localitate...
                    </option>
                    {sate
                      ? sate.sat.map((item) => (
                          <option value={item._id} key={item._id}>
                            {item.nume}
                          </option>
                        ))
                      : null}
                  </Form.Select>
                </Form.Group>
              </Row>
              <Button variant='success' style={{ margin: "3px", width: "100%" }} type='submit'>
                {loading ? "Se incarca" : "Trimite"}
              </Button>
            </Form>
          </Offcanvas.Body>
        </Offcanvas>

        {clickPos !== null ? (
          <Marker position={clickPos} icon={selectPin.obiectiveIcon("red")}>
            <Popup>
              <span>
                <h5>Adauga obiectiv in acest loc</h5>
                <p>{`Punct GPS: ${clickPos.lat.toFixed(2)} lat & ${clickPos.lng.toFixed(2)} lng`}</p>
                <Button variant='primary' style={{ margin: "3px", width: "100%" }} onClick={handleShow}>
                  <MdAddLocationAlt size='20' /> Adauga obiectiv
                </Button>
              </span>
            </Popup>
          </Marker>
        ) : null}
      </span>
    );
  } else return null;
}

export default AddObiective;
