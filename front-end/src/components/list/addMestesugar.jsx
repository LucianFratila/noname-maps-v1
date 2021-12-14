import React, { useState, useEffect, useContext } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import Leaflet from "leaflet";
import Button from "react-bootstrap/Button";
import SmallFormAddCatMester from "../forms/addCategorieMestesugar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { MdAddLocationAlt } from "react-icons/md";
import { UserContext } from "../../UserContext";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Accordion from "react-bootstrap/esm/Accordion";
const GETfunc = require("../endpoints/getEndPoints");
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

function AddMestesugar({ sate, triggerMestesugar }) {
  const { token } = useContext(UserContext);
  const { user } = useContext(UserContext);
  const [clickPos, setClickPos] = useState(null);
  const [show, setShow] = useState(false);
  const [loading, isLoading] = useState(false);
  const [refreshCatList, setRefreshCatList] = useState(false);
  const [categorii, setCategorii] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [nume2send, setNume2send] = useState();
  const [cat2send, setCat2send] = useState(null);
  const [sat2send, setSate2send] = useState(null);
  const [obs2send, setObs2send] = useState();
  const [obs_en2send, setObs_en2send] = useState();
  const [obs_de2send, setObs_de2send] = useState();
  const [meserie2send, setMeserie2send] = useState();
  const [meserie_en2send, setMeserie_en2send] = useState();
  const [meserie_de2send, setMeserie_de2send] = useState();
  const [adresa2send, setAdresa2send] = useState();
  const [tel2send, setTel2send] = useState();

  const sendForm = (e) => {
    e.preventDefault();
    isLoading(true);
    triggerMestesugar(true);
    if (!cat2send || !sat2send) {
      alert(`"Alege: ${!cat2send ? `categorie` : ``}  ${!sat2send ? `localitate` : ``}`);
    } else {
      POSTfunc.POSTcreateMestesugar(
        token,
        nume2send,
        sat2send,
        cat2send,
        obs2send,
        obs_en2send,
        obs_de2send,
        meserie2send,
        meserie_en2send,
        meserie_de2send,
        adresa2send,
        tel2send,
        clickPos.lat,
        clickPos.lng,
        user.email
      )
        .then(() => {
          isLoading(false);
          triggerMestesugar(false);
        })
        .catch((err) => {
          console.log(err);
          isLoading(false);
          triggerMestesugar(false);
        });
    }
  };

  useMapEvents({
    click: (e) => {
      setClickPos(e.latlng);
    },
  });

  useEffect(() => {
    GETfunc.GETallcategorieMestesugari(token)
      .then((res) => {
        setCategorii(res.categorii);
      })
      .catch((err) => console.log(err));
  }, [token, refreshCatList]);

  return (
    <div>
      <span
        style={{
          zIndex: "2999",
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
        Adauga mestesugar/artizan pe harta
      </span>

      <Offcanvas style={{ zIndex: "10000" }} show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <MdAddLocationAlt size='30' /> {clickPos ? ` ${clickPos.lat.toFixed(2)},${clickPos.lng.toFixed(2)}` : null}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Accordion >
            <Accordion.Item eventKey='0'>
              <Accordion.Header>Adauga categorie noua</Accordion.Header>
              <Accordion.Body>
                <SmallFormAddCatMester
                  token={token}
                  refreshCatList={(data) => setRefreshCatList(data)}
                  numeBtn={"Adauga categorie"}
                />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          <Form onSubmit={sendForm}>
            <Row className='mb-3'>
              <Form.Group as={Col} controlId='formGridCity'>
                <Form.Label>Nume</Form.Label>
                <Form.Control
                  required
                  onChange={(e) => {
                    e.preventDefault();
                    setNume2send(e.target.value);
                  }}
                  placeholder='Nume mestesugar/artizan'
                />
              </Form.Group>
              <Form.Group as={Col} controlId='formGridCity'>
                <Form.Label>Adresa</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    e.preventDefault();
                    setAdresa2send(e.target.value);
                  }}
                  placeholder='Strada,nr,cod postal,etc'
                />
              </Form.Group>
              <Form.Group as={Col} controlId='formGridCity'>
                <Form.Label>Tel</Form.Label>
                <Form.Control
                  type='tel'
                  onChange={(e) => {
                    e.preventDefault();
                    setTel2send(e.target.value);
                  }}
                  placeholder='0722 222 333'
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
                <Form.Label>Obs</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    e.preventDefault();
                    setObs2send(e.target.value);
                  }}
                  as='textarea'
                  rows={3}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
                <Form.Label>Obs en</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    e.preventDefault();
                    setObs_en2send(e.target.value);
                  }}
                  as='textarea'
                  rows={3}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
                <Form.Label>Obs de</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    e.preventDefault();
                    setObs_de2send(e.target.value);
                  }}
                  as='textarea'
                  rows={3}
                />
              </Form.Group>
              <Form.Group as={Col} controlId='formGridCity'>
                <Form.Label>Meserie</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    e.preventDefault();
                    setMeserie2send(e.target.value);
                  }}
                  placeholder='Meserie'
                />
              </Form.Group>
              <Form.Group as={Col} controlId='formGridCity'>
                <Form.Label>Meserie En</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    e.preventDefault();
                    setMeserie_en2send(e.target.value);
                  }}
                  placeholder='Meserie en'
                />
              </Form.Group>
              <Form.Group as={Col} controlId='formGridCity'>
                <Form.Label>Meserie De</Form.Label>
                <Form.Control
                  onChange={(e) => {
                    e.preventDefault();
                    setMeserie_de2send(e.target.value);
                  }}
                  placeholder='Meserie de'
                />
              </Form.Group>
            </Row>
            <Row className='mb-3'>
              <Form.Label>Categorie mestesug/Localitati</Form.Label>
              <Form.Group className='d-flex' as={Col} controlId='formGridState'>
                <Form.Select
                  onClick={(e) => {
                    setCat2send(e.target.value);
                  }}
                  defaultValue={"Categorii mestesugari..."}
                >
                  {categorii
                    ? categorii.map((item) => (
                        <option style={{ color: item.color }} value={item._id} key={item._id}>
                          {item.nume}
                        </option>
                      ))
                    : null}
                </Form.Select>
                <Form.Select
                  onClick={(e) => {
                    setSate2send(e.target.value);
                  }}
                  defaultValue={"Localitate..."}
                >
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
              <h5>Adauga mestesugar/artizan in acest loc</h5>
              <p>{`Punct GPS: ${clickPos.lat.toFixed(2)} lat & ${clickPos.lng.toFixed(2)} lng`}</p>
              <Button variant='primary' onClick={handleShow}>
                Launch
              </Button>
            </span>
          </Popup>
        </Marker>
      ) : null}
    </div>
  );
}

export default AddMestesugar;
