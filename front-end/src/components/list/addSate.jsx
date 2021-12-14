import React, { useState, useContext,useEffect } from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import Leaflet from "leaflet";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { UserContext } from "../../UserContext";
import Offcanvas from "react-bootstrap/Offcanvas";
import { MdAddLocationAlt } from "react-icons/md";
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

function AddSate({triggerSate}) {
  const { token } = useContext(UserContext);
  const { user } = useContext(UserContext);
  const [loading, isLoading] = useState(false);
  const [nume2send, setNume2send] = useState();
  const [obs2send, setObs2send] = useState();
  const [obs_en2send, setObs_en2send] = useState();
  const [obs_de2send, setObs_de2send] = useState();
  const [clickPos, setClickPos] = useState(null);
  const [show, setShow] = useState(false);
  const [newItem,setNewItem] = useState(null)
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    triggerSate(loading);
  }, [loading, triggerSate]);

  useMapEvents({
    click: (e) => {
      setClickPos(e.latlng);
    },
  });
  const sendForm = (e) => {
    e.preventDefault()
    isLoading(true);
    POSTfunc.POSTcreateSat(
      token,
      nume2send,
      obs2send,
      obs_en2send,
      obs_de2send,
      clickPos.lat,
      clickPos.lng,
      user.email
    ).then((res) => {
      isLoading(false);
      setNewItem(res);
      setClickPos(null)
    });
    
  };

  if (token) {
    return (
      <div>
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
          Adauga localitate pe harta
        </span>
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <MdAddLocationAlt size='30' />
              {clickPos ? ` ${clickPos.lat.toFixed(2)},${clickPos.lng.toFixed(2)}` : null}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
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
                    placeholder='Nume localitate'
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
                <h5>Adauga localitate in acest loc</h5>
                <p>{`Punct GPS: ${clickPos.lat.toFixed(2)} lat & ${clickPos.lng.toFixed(2)} lng`}</p>
                <Button variant='primary' onClick={handleShow}>
                  Adauga localitate
                </Button>
              </span>
            </Popup>
          </Marker>
        ) : null}
        {newItem  ? (
          
          <Marker position={newItem.data.sat.location.coordinates} icon={selectPin.obiectiveIcon("green")}>
            <Popup>
              <span>
                <h5>{newItem.data.sat.nume}</h5>
              </span>
            </Popup>
          </Marker>
        ) : null}
      </div>
    );
  } else return null;
}

export default AddSate;
