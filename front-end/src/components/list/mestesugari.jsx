import React, { useEffect, useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { BiInfoCircle, BiSearch } from "react-icons/bi";
import { UserContext } from "../../UserContext";
import { AiOutlineCaretRight } from "react-icons/ai";
import { HiLocationMarker } from "react-icons/hi";
const GETfunc = require("../endpoints/getEndPoints");

function Mestesugari(props) {
  const { token } = useContext(UserContext);
  const [show, setShow] = useState(true);
  const [showSate, setShowSate] = useState(true);
  const [key, setKey] = useState("cat");

  const [searchKey, setSearchKey] = useState(null);
  const [searchResult, setSearchResult] = useState(null);

  const [showCat, setShowCat] = useState(true);
  const [mestesugar, setMestesugar] = useState(null);
  const [sate, setSate] = useState(null);
  const [categorii, setCategorii] = useState(null);
  const [catQ, setCatQ] = useState("");
  const [satQ, setSatQ] = useState("");
  const [selectedSat, setSelectedSat] = useState();
  const [selectedCategorie, setSelectedCategorie] = useState();
  const [authCheck, setAuthCheck] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    GETfunc.SEARCHallMestesugari(token, searchKey)
      .then((res) => {
        if (searchKey) {
          setSearchResult(res);
        } else {
          setSearchResult(null);
        }
      })
      .catch((err) => console.log(err));
  }, [token, searchKey, props.loading, props.loadingMestesugar]);

  useEffect(() => {
    GETfunc.GETallSate(token)
      .then((res) => {
        setSate(res);
      })
      .catch((err) => console.log(err));
  }, [token]);

  useEffect(() => {
    GETfunc.GETallcategorieMestesugari(token)
      .then((res) => {
        setCategorii(res);
      })
      .catch((err) => console.log(err));
  }, [token, props.loading, props.loadingMestesugar]);

  useEffect(() => {
    GETfunc.GETallMestesugari(token, catQ, satQ)
      .then((res) => {
        if (res.response) {
          setAuthCheck(res.response);
        } else {
          setMestesugar(res);
        }
      })
      .catch((err) => console.log(err));
  }, [token, catQ, satQ, props.loading, props.loadingMestesugar,props.triggerMestesugar]);

  const onChangeSat = () => {
    setShowSate(!showSate);
    if (showSate === false) {
      setSatQ("");
    }
  };

  const onChangeCat = () => {
    setShowCat(!showCat);
    if (showCat === false) {
      setCatQ("");
    }
  };
  if (authCheck) {
  }
  return (
    <span>

      <span style={{ position: "fixed", zIndex: "2998", top: "100px", left: "-8px" }}>
        
        {!show ? (
          <Button variant='light' size='lg' onClick={handleShow}>
            <AiOutlineCaretRight />
          </Button>
        ) : null}
      </span>
      <span>
        <Offcanvas backdrop={false} style={{ zIndex: "8000" }} show={show} onHide={handleClose}>
          {authCheck ? (
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Neautoizat</Offcanvas.Title>
            </Offcanvas.Header>
          ) : (
            <Tabs
              style={{ backgroundColor: "#ededed" }}
              id='controlled-tab-example'
              activeKey={key}
              onSelect={(k) => setKey(k)}
              className='mb-3'
            >
              <Tab eventKey='cat' title='Categorii'>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>
                    {mestesugar ? `Mestesugari/Artizani (${mestesugar.lengthMestesugari})` : `Loading`}
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  Filtreaza dupa:{" "}
                  {!showSate && !showCat
                    ? "Loc&Cat"
                    : !showSate && showCat
                    ? "Loc"
                    : showSate && !showCat
                    ? "Cat"
                    : "Arata tot"}
                  <Form.Group className='d-flex' as={Col} controlId='formGridState'>
                    <Form.Check
                      type='switch'
                      id={`default-checkbox`}
                      label={`localitati`}
                      checked={!showSate}
                      onChange={onChangeSat}
                    />
                    <Form.Check
                      style={{ marginLeft: "7px" }}
                      type='switch'
                      id={`default-checkbox`}
                      label={`categorii`}
                      checked={!showCat}
                      onChange={onChangeCat}
                    />
                  </Form.Group>
                  <Form.Group className='d-flex' as={Col} controlId='formGridState'>
                    <Form.Select
                      defaultValue={"DEFAULT"}
                      disabled={showSate ? true : false}
                      onChange={(e) => {
                        setSatQ(e.target.value.split("-")[0]);
                        setSelectedSat(e.target.value.split("-")[1]);
                      }}
                    >
                      <option value='DEFAULT' disabled>
                        alege localitate ...
                      </option>
                      {sate
                        ? sate.noOfMestesugari.map((item) => (
                            <option value={`${item._id[0]._id}-${item._id[0].nume}`} key={item._id[0]._id}>
                              ({item.no}) {item._id[0].nume}
                            </option>
                          ))
                        : null}
                    </Form.Select>
                    <Form.Select
                      defaultValue={"DEFAULT"}
                      disabled={showCat ? true : false}
                      onChange={(e) => {
                        setCatQ(e.target.value.split("-")[0]);
                        setSelectedCategorie(e.target.value.split("-")[1]);
                      }}
                    >
                      <option value='DEFAULT' disabled>
                        alege categorie ...
                      </option>
                      {categorii
                        ? categorii.categorii.map((item) => (
                            <option style={{ color: item.color }} value={`${item._id}-${item.nume}`} key={item._id}>
                              {item.nume}
                            </option>
                          ))
                        : null}
                    </Form.Select>
                  </Form.Group>
                </Offcanvas.Body>
                {mestesugar ? (
                  <div
                    style={{
                      marginTop: "5px",
                      overflowY: "scroll",
                      width: "100%",
                      height: "75%",
                      position: "absolute",
                    }}
                  >
                    <ListGroup as='ul'>
                      {mestesugar.mestesugari.length === 0 ? (
                        <span style={{ fontSize: "13px" }}>
                          <BiInfoCircle /> Nimic de aratat in: <b>{selectedSat}</b> pentru categoria:{" "}
                          <b>{selectedCategorie}</b>
                        </span>
                      ) : (
                        <span>
                          {mestesugar.mestesugari.map((item, index) => (
                            <ListGroup.Item key={`mester-${index}`} action as='li'>
                              <Button
                                onClick={(e) => {
                                  e.preventDefault();
                                  props.transferHereMaps(null);
                                  props.transferShowMestesugariOnMap(item);
                                }}
                                type='submit'
                                size='sm'
                                variant='outline-secondary'
                              >
                                <HiLocationMarker style={{ fontSize: "25px", color: item.categorie[0].color }} />
                              </Button>{" "}
                              <span style={{ fontSize: "12px" }}>
                                {item.nume}/{item.sat[0].nume}
                              </span>
                            </ListGroup.Item>
                          ))}
                        </span>
                      )}
                    </ListGroup>
                  </div>
                ) : null}
              </Tab>
              <Tab eventKey='search' title='Cauta Mestesugar'>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>
                    {mestesugar ? (
                      <span>Cauta mesteri/artizani ({searchResult ? searchResult.length : "0"})</span>
                    ) : (
                      `Loading`
                    )}
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Form require='true' className='d-flex'>
                    <InputGroup className='mb-2'>
                      <InputGroup.Text>
                        <BiSearch />
                      </InputGroup.Text>
                      <FormControl
                        type='search'
                        placeholder='Search'
                        className='me-2'
                        aria-label={`Cauta`}
                        onChange={(e) => {
                          e.preventDefault();
                          setSearchKey(e.target.value);
                        }}
                      />
                    </InputGroup>
                  </Form>
                  {searchResult ? (
                    <span>
                      <ListGroup style={{ marginTop: "5px" }} as='ul'>
                        {searchResult.result.map((item, index) => (
                          <ListGroup.Item key={`mesterSearch-${index}`} action as='li'>
                            <Button
                              onClick={(e) => {
                                e.preventDefault();
                                props.transferHereMaps(null);
                                props.transferShowMestesugariOnMap(item);
                              }}
                              type='submit'
                              size='sm'
                              variant='outline-secondary'
                            >
                              <HiLocationMarker style={{ fontSize: "25px", color: item.categorie[0].color }} />
                            </Button>{" "}
                            <span style={{ fontSize: "12px" }}>
                              {item.nume}/{item.sat[0].nume}
                            </span>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </span>
                  ) : null}
                </Offcanvas.Body>
              </Tab>
            </Tabs>
          )}
        </Offcanvas>
      </span>
    </span>
  );
}

export default Mestesugari;
