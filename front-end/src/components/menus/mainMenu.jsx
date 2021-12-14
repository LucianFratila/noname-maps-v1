import React, { useState, useContext } from "react";
import "./index.scss";
import { UserContext } from "../../UserContext";
import LogoutButton from "../buttons/logout";
import { FaUserAlt } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import MainMap from "../screens/mainMap";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
// import FormControl from 'react-bootstrap/FormControl';
// import Button from 'react-bootstrap/Button';
import Container from "react-bootstrap/Container";
import Collapse from "react-bootstrap/Collapse";
import AddTrackModal from "../modals/addTracks";
import SearchHereApi from "../forms/searchHereApi";

import { GiTrail } from "react-icons/gi";

function Layout(props) {
  const { user } = useContext(UserContext);
  const [showObiective, setShowObiective] = useState(false);
  const [showAddSate, setAddShowSate] = useState(false);
  const [showAddMestesugari, setShowAddMestesugari] = useState(false);
  const [showObiectiveSeparat, setShowObiectiveSeparat] = useState(false);
  const [openCat, setOpenCat] = useState(false);
  const [adauga, setAdauga] = useState(false);
  const [addTrack, setAddTrack] = useState(false);
  const [showGps, setShowGps] = useState(false);
  const [showSate, setShowSate] = useState(false);
  const [showMestesugari, setShowMestesugari] = useState(false);
  const [refreshTrackUpload, setRefreshTrackUpload] = useState(false);
  const [hereMapSearch, setHereMapSearch] = useState(null);
  const [mestesugariOnMap, setMestesugariOnMap] = useState(null);

  return (
    <div style={{ height: "auto" }}>
      <div style={{ position: "absolute", zIndex: 999 }}>
        <Navbar bg='light' expand={false}>
          <Container fluid>
            <Navbar.Brand href='#'>
              NoNameApp-BackEnd v.1{" "}
              <h6 style={{ fontSize: "15px" }}>
                <FaUserAlt size={10} /> {user.email}
              </h6>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='offcanvasNavbar' />
            <Navbar.Offcanvas id='offcanvasNavbar' aria-labelledby='offcanvasNavbarLabel' placement='end'>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id='offcanvasNavbarLabel'>
                  Data: {new Date().toLocaleDateString("en-US")}{" "}
                  <span>
                    <LogoutButton />
                  </span>{" "}
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className='justify-content-end flex-grow-1 pe-3'>
                  <Nav.Link onClick={() => setAdauga(!adauga)}>Adauga pe harta</Nav.Link>
                  <Collapse in={adauga}>
                    <div>
                      <Form.Check
                        type='switch'
                        id={`default-checkbox`}
                        label={`obiective pe harta`}
                        checked={showObiective}
                        onChange={() => {
                          setShowObiective(!showObiective);
                          setAddShowSate(false);
                          setShowAddMestesugari(false);
                        }}
                      />
                      <Form.Check
                        type='switch'
                        id={`default-checkbox`}
                        label={`localitati pe harta`}
                        checked={showAddSate}
                        onChange={() => {
                          setAddShowSate(!showAddSate);
                          setShowObiective(false);
                          setShowAddMestesugari(false);
                        }}
                      />
                      <Form.Check
                        type='switch'
                        id={`default-checkbox`}
                        label={`mestesugari pe harta`}
                        checked={showAddMestesugari}
                        onChange={() => {
                          setShowAddMestesugari(!showAddMestesugari);
                          setShowObiective(false);
                          setShowObiective(false);
                          setAddShowSate(false);
                        }}
                      />
                    </div>
                  </Collapse>
                  <NavDropdown title='Adauga diverse' id='offcanvasNavbarDropdown'>
                    <NavDropdown.Item onClick={() => setAddTrack(addTrack ? false : true)}>
                      <GiTrail /> track gps
                    </NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link
                    onClick={() => {
                      setOpenCat(!openCat);
                    }}
                  >
                    Categorii
                  </Nav.Link>
                  <Collapse in={openCat}>
                    <div>
                      <Form.Check
                        type='switch'
                        id={`default-checkbox`}
                        label={`trackuri gps`}
                        checked={showGps}
                        onChange={() => {
                          setShowGps(!showGps);
                          setShowObiectiveSeparat(false);
                          setShowSate(false);
                          setShowMestesugari(false);
                        }}
                      />
                      <Form.Check
                        type='switch'
                        id={`default-checkbox`}
                        label={`obiective turistice`}
                        checked={showObiectiveSeparat}
                        onChange={() => {
                          setShowObiectiveSeparat(!showObiectiveSeparat);
                          setShowGps(false);
                          setShowSate(false);
                          setShowMestesugari(false);
                        }}
                      />
                      <Form.Check
                        type='switch'
                        id={`default-checkbox`}
                        label={`localitati`}
                        checked={showSate}
                        onChange={() => {
                          setShowSate(!showSate);
                          setShowGps(false);
                          setShowObiectiveSeparat(false);
                          setShowMestesugari(false);
                        }}
                      />
                      <Form.Check
                        type='switch'
                        id={`default-checkbox`}
                        label={`mestesugari/artizani`}
                        checked={showMestesugari}
                        onChange={() => {
                          setShowMestesugari(!showMestesugari);
                          setShowGps(false);
                          setShowObiectiveSeparat(false);
                          setShowSate(false);
                        }}
                      />
                    </div>
                  </Collapse>
                  <SearchHereApi
                    transfer={(data) => {
                      setHereMapSearch(data);
                    }}
                    transferShowMestesugariOnMap={(data) => setMestesugariOnMap(data)}
                  />
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </div>

      <div style={{ height: "auto" }}>
        {addTrack ? (
          <AddTrackModal refresh={(data) => setRefreshTrackUpload(data)} closeModal={() => setAddTrack(false)} />
        ) : null}
        <MainMap
          transferHereMaps={(data) => {
            setHereMapSearch(data);
          }}
          transferShowMestesugariOnMap={(data) => setMestesugariOnMap(data)}
          showAddMestesugari={showAddMestesugari}
          hereMapSearch={hereMapSearch}
          mestesugariOnMap={mestesugariOnMap}
          refresh={props.refresh}
          tracksRefresh={refreshTrackUpload}
          showGps={showGps}
          showAddSate={showAddSate}
          showSate={showSate}
          categorii={props.categorii}
          showObiective={showObiective}
          showObiectiveSeparat={showObiectiveSeparat}
          showMestesugari={showMestesugari}
          refreshTop={props.refreshTop}
        />
      </div>
    </div>
  );
}

export default Layout;
