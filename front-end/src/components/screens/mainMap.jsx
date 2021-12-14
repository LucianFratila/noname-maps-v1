import React, { useRef, useEffect, useState, useContext } from "react";
import {
  MapContainer,
  TileLayer,
  ZoomControl,
  LayersControl,
  useMapEvents,
  Polyline,
  Marker,
  Popup,
  Tooltip,
  Polygon,
} from "react-leaflet";
import AddObiective from "../list/addObiective";

import Obiective from "../list/obiective";

import Tracks from "../list/tracks";
import AddSate from "../list/addSate";
import AddMestesugar from "../list/addMestesugar";
import SateList from "../list/sate";
import Mestesugari from "../list/mestesugari";
import EditSat from "../list/editSat";
import EditMestesugar from "../list/editMestesugar";
import Leaflet from "leaflet";
import Button from "react-bootstrap/esm/Button";
import Spinner from "react-bootstrap/esm/Spinner";
import { FaTrash, FaEdit } from "react-icons/fa";
import { UserContext } from "../../UserContext";
import { ScaleControl } from "react-leaflet";
import { BsRulers } from "react-icons/bs";
import { RiDeleteBin7Fill } from "react-icons/ri";
//////////IMPORT HOOKS///////////
import useGETMestesugarById from "../hooks/useGETMestesugarById";
import useGETallCategoriiObiective from "../hooks/useGETallCategoriiObiective";
import useSate from "../hooks/useSate";
// import useGETallOnlyCategorii from "../hooks/useGETallOnlyCategorii"
//////////IMPORT HOOKS///////////
import Image from "react-bootstrap/Image";
import Carousel from "react-bootstrap/Carousel";
var geojsonArea = require("@mapbox/geojson-area");

const DELETEfunc = require("../endpoints/delEndPoints");

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

  obiectiveIcon(x, width, height, iAx, iaY, br) {
    return Leaflet.divIcon({
      className: "my-custom-pin",
      iconAnchor: [iAx, iaY],
      labelAnchor: [0, 0],
      popupAnchor: [0, -36],
      html: `<span style="background-color: ${x};
        width: ${width}rem;
        height: ${height}rem;
        display: block;
        left: -1.5rem;
        top: -1.5rem;
        position: relative;
        border-radius: ${br};
        transform: rotate(45deg);
        border: 1px solid #FFFFFF" ></span>`,
    });
  }
}
let obiectivePin = new MyCustomPin();
function LineMap({ arr }) {
  const [data, setData] = useState([]);
  // console.log(data);

  useEffect(() => {
    if (arr.length >= 1) {
      setData(arr);
    }
  }, [arr]);
  if (data) {
    return (
      <span>
        {arr.length >= 1 ? (
          <Polyline
            pathOptions={{ color: "black", weight: "1", dashArray: "5, 5", dashOffset: "40" }}
            positions={[arr]}
          ></Polyline>
        ) : null}
      </span>
    );
  } else return null;
}

function MeasureRuler({ myRef }) {
  const [clickPos, setClickPos] = useState(null);
  const [posArray, setPosArray] = useState([]);
  const [initDist, setInitDist] = useState(0);
  const [totalDist, setTotalDist] = useState([]);
  const [area, setArea] = useState(0);

  useEffect(() => {
    if (posArray.length > 1) {
      let latlonArr = [];
      posArray.forEach((element) => {
        latlonArr.push(Leaflet.latLng(element));
      });
      let lastElement = latlonArr[latlonArr.length - 1];
      let penElement = latlonArr[latlonArr.length - 2];
      setInitDist(penElement.distanceTo(lastElement));
      totalDist.push(penElement.distanceTo(lastElement));
      let polygon = Leaflet.polygon([posArray]).toGeoJSON();
      let res = geojsonArea.geometry(polygon.geometry);
      setArea(res);
    }
  }, [posArray, clickPos, totalDist]);
  let total = 0;
  if (totalDist.length !== 0) {
    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    total = totalDist.reduce(reducer);
  }

  useMapEvents({
    click: (e) => {
      setClickPos(e.latlng);

      function name() {
        if (e) {
          posArray.push([e.latlng.lat, e.latlng.lng]);
        }
      }
      name();
    },
  });

  if (clickPos) {
    return (
      <span>
        <Button
          onClick={() => {
            setPosArray([]);
            setClickPos(null);
            setTotalDist([]);
            setInitDist(0);
          }}
          size='sm'
          variant='success'
          style={{ zIndex: "9999", position: "absolute", bottom: "50px", left: "50px" }}
        >
          <RiDeleteBin7Fill />
        </Button>
        {posArray.length >= 1 ? <Polygon pathOptions={{ color: "green", weight: "0" }} positions={[posArray]} /> : null}
        <LineMap arr={posArray} />
        {posArray.length !== 0
          ? posArray.map((item, index) => (
              <Marker
                key={index}
                position={item}
                icon={obiectivePin.obiectiveIcon("red", 0.7, 0.7, -18, -18, "1rem 1rem 1rem")}
              ></Marker>
            ))
          : null}
        <Marker position={clickPos} icon={obiectivePin.obiectiveIcon("green", 0.7, 0.7, -18, -18, "1rem 1rem 1rem")}>
          <Tooltip direction='bottom' offset={[0, 20]} opacity={1} permanent>
            Lat {clickPos.lat.toFixed(2)}, Lng {clickPos.lng.toFixed(2)}
            <br />
            Last segment: {(initDist / 1000).toFixed(0)} km
            <br />
            Total Dist: <b>{(total / 1000).toFixed(0)} km</b>
            <br />
            Area : <b>{(area / 1000000).toFixed(0)}</b> km2
          </Tooltip>
        </Marker>
      </span>
    );
  } else return null;
}

function MainMap(props) {
  const mapRef = useRef();
  const [loading, isLoading] = useState(false);

  // const [showEditObiective, setShowEditObiective] = useState(false);
  const [showEditSate, setShowEditSate] = useState(false);
  const [showEditMestesugar, setShowEditMestesugar] = useState(false);
  // const [data2EditObiective, setData2EditObiective] = useState(null);
  const [data2EditSate, setData2EditSate] = useState(null);
  const [showRuler, setShowRuler] = useState(false);
  const { token } = useContext(UserContext);
  const {refresTokenFunc} =  useContext(UserContext);
  

  /////////////Refresh Components///////////////
  const [triggerMestesugar, setTriggerMestesugar] = useState(false); ////isLoading for edit mestesugar
  const [loadingCategorieObiective, setLoadingCategorieObiective] = useState(false); ////isLoading for add obiectiv/cat
  const [triggerSate, setTriggerSate] = useState(false); ////isLoading for sate
  // console.log("loadingCategorieObiective ", loadingCategorieObiective);
  /////////////Refresh Components///////////////
  let idMestesugar;
  if (props.mestesugariOnMap) {
    idMestesugar = props.mestesugariOnMap._id;
  }
  /////////////////HOOKS for data///////////////////
  const { mestesugar, fetchLoad } = useGETMestesugarById(token, idMestesugar, triggerMestesugar, loading); /////brings mestesugar
  const { sate, sateLoading } = useSate(token, triggerSate); /////brings sate
  const { categorieObiective } = useGETallCategoriiObiective(token, loadingCategorieObiective); /////brings all obiective by cat mestesugar
  // const{onlyCategorii} =useGETallOnlyCategorii(token,loadingCategorieObiective)
  // console.log(onlyCategorii);
  // console.log('main map',loadingSate);
  // console.log(sateLoading);
  /////////////////HOOKS for data///////////////////

  useEffect(() => {
    if (props.hereMapSearch) {
      mapRef.current.flyTo(props.hereMapSearch.position, 14);
    }
    if (props.mestesugariOnMap) {
      mapRef.current.flyTo(props.mestesugariOnMap.location.coordinates, 14);
    }
  }, [mapRef, props.hereMapSearch, props.mestesugariOnMap, props]);

  const onEdit = (id, nume) => {
    setShowEditMestesugar(true);
  };
  const onDeleteMestesugar = (id, nume) => {
    if (window.confirm(`Stergi ${nume} ?`)) {
      isLoading(true);
      DELETEfunc.DELETETMestesugarById(id, token)
        .then(() => {
          console.log("Success");
          isLoading(false);
        })
        .catch((err) => {
          console.log(err);
          isLoading(false);
        });
      props.transferShowMestesugariOnMap(null);
    } else {
      console.log("Thing was not saved to the database.");
    }
  };
  const deleteMestesugarIMG = (id, photoId, public_id) => {
    if (window.confirm(`Stergi ${public_id} ?`)) {
      isLoading(true);
      DELETEfunc.DELETETMestesugarPhotoById(token, id, photoId, public_id)
        .then((res) => {
          isLoading(false);
        })
        .catch((err) => console.log(err));
    } else {
      console.log("Thing was not saved to the database.");
    }
  };
  // console.log(props.categorii);
  return (
    <span>
      <span>
        {/* /////////////////////////////////  MESTESUGARI  //////////////////////////////////// */}
        {props.showMestesugari ? (
          <Mestesugari
            loading={loading}
            transferShowMestesugariOnMap={props.transferShowMestesugariOnMap} //flyto
            iDOfMestesugar={props.iDOfMestesugar}
            transferHereMaps={props.transferHereMaps}
            triggerMestesugar={triggerMestesugar}
          />
        ) : null}

        {/* /////////////////////////////////  EDIT MESTESUGAR  //////////////////////////////////// */}
        {showEditMestesugar ? (
          <EditMestesugar
            show={showEditMestesugar}
            data={{ mestesugar, fetchLoad }}
            showEditMestesugar={() => setShowEditMestesugar(!showEditMestesugar)}
            loading={(data) => setTriggerMestesugar(data)}
          />
        ) : null}
        {/* /////////////////////////////////  EDIT OBIECTIV  //////////////////////////////////// */}

        {/* /////////////////////////////////  MAIN MAP  //////////////////////////////////// */}
        <MapContainer
          whenCreated={(mapInstance) => {
            mapRef.current = mapInstance;
          }}
          style={{ height: "100vh", width: "100%", zIndex: "1" }}
          center={[45.9655, 24.7797]}
          zoomControl={false}
          zoom={11}
          scrollWheelZoom={true}
        >
          {/* ///////////////////////////////// ADD MESTESUGAR ON MAP  //////////////////////////////////// */}
          {props.showAddMestesugari ? (
            <AddMestesugar
              sate={sate}
              triggerMestesugar={(data) => {
                setTriggerMestesugar(data);
              }}
            />
          ) : null}
          {/* /////////////////////////////////  ADD OBIECTIV ON MAP  //////////////////////////////////// */}
          {props.showObiective ? (
            <AddObiective
              sate={sate}
              categorieObiective={categorieObiective}
              loadingCategorieObiective={(data) => setLoadingCategorieObiective(data)}
            />
          ) : null}
          {/* /////////////////////////////////  ADD SATE ON MAP  //////////////////////////////////// */}
          {props.showAddSate ? <AddSate triggerSate={(data) => setTriggerSate(data)} /> : null}

          {/* /////////////////////////////////  OBIECTIVE ON MAP  //////////////////////////////////// */}

          {props.showObiectiveSeparat ? (
            <Obiective
              categorieObiective={categorieObiective}
              loadingCategorieObiective={(data) => setLoadingCategorieObiective(data)}
              refresTokenFunc={refresTokenFunc}
            />
          ) : null}
          {/* /////////////////////////////////  TRACKS ON MAP  //////////////////////////////////// */}
          {props.showGps ? <Tracks tracksRefresh={props.tracksRefresh} /> : null}
          {/* /////////////////////////////////  EDIT SAT  //////////////////////////////////// */}
          {showEditSate ? (
            <EditSat
              data2EditSate={data2EditSate}
              show={showEditSate}
              showEditSate={() => setShowEditSate(!showEditSate)}
              triggerSate={(data) => setTriggerSate(data)}
            />
          ) : null}
          {/* ///////////////////////////////// EDIT SATE   //////////////////////////////////// */}
          {props.showSate ? (
            <SateList
              triggerSate={(data) => setTriggerSate(data)}
              sate={sate}
              sateLoading={sateLoading}
              data2EditSate={(data) => setData2EditSate(data)}
              showEditSate={() => setShowEditSate(!showEditSate)}
            />
          ) : null}

          {props.hereMapSearch ? (
            <Marker
              position={props.hereMapSearch.position}
              icon={obiectivePin.obiectiveIcon("blue", 1, 1, -18, -18, "3rem 3rem 0rem")}
            >
              <Popup className='request-popup'>{props.hereMapSearch.title}</Popup>
            </Marker>
          ) : null}

          {/* ///////////////////////////////// MESTESUGAR ON MAP  //////////////////////////////////// */}
          {props.mestesugariOnMap ? (
            <Marker
              position={props.mestesugariOnMap.location.coordinates}
              icon={obiectivePin.obiectiveIcon(props.mestesugariOnMap.categorie[0].color, 2, 2, 0, 0, "3rem 3rem 0rem")}
            >
              {mestesugar ? (
                <Popup className='request-popup'>
                  {!fetchLoad ? (
                    <div style={popupContent}>
                      <div className='m-2' style={popupHead}>
                        {mestesugar.nume}
                      </div>
                      <hr />
                      <Carousel fade>
                        {mestesugar.photo
                          ? mestesugar.photo.map((i) => (
                              <Carousel.Item key={i.public_id}>
                                <div className='containerIMG'>
                                  <Image src={i.secure_url} style={{ width: "300px", height: "auto" }} rounded />
                                  <div className='middle'>
                                    <Button
                                      variant='danger'
                                      onClick={() => deleteMestesugarIMG(mestesugar._id, i._id, i.public_id)}
                                      className='text'
                                    >
                                      <FaTrash />
                                    </Button>
                                  </div>
                                </div>
                              </Carousel.Item>
                            ))
                          : null}
                      </Carousel>
                      <span style={popupText}>{mestesugar.obs}</span>
                      <div className='m-2' style={okText}>
                        <b>Categorie: </b>
                        {props.mestesugariOnMap.categorie.map((sub, index) => (
                          <span key={index}>{sub.nume}</span>
                        ))}
                        <hr />
                        <span>
                          <Button
                            variant='danger'
                            size='sm'
                            onClick={() => onDeleteMestesugar(props.mestesugariOnMap._id, props.mestesugariOnMap.nume)}
                          >
                            {loading ? (
                              <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' />
                            ) : (
                              <FaTrash />
                            )}
                          </Button>
                          <Button
                            style={{ margin: "3px" }}
                            variant='primary'
                            size='sm'
                            onClick={() => onEdit(props.mestesugariOnMap._id, props.mestesugariOnMap.nume)}
                          >
                            <FaEdit />
                          </Button>
                        </span>
                      </div>
                    </div>
                  ) : (
                    <span>
                      <Spinner as='span' animation='border' size='lg' role='status' aria-hidden='true' />
                    </span>
                  )}
                </Popup>
              ) : null}
            </Marker>
          ) : null}

          <ScaleControl position='bottomleft' />
          {showRuler ? <MeasureRuler myRef={mapRef} /> : null}

          <Button
            onClick={() => setShowRuler(!showRuler)}
            size='sm'
            variant={showRuler ? "dark" : "success"}
            style={{ zIndex: "9999", position: "absolute", bottom: "50px", left: "10px" }}
          >
            <BsRulers />
          </Button>

          <LayersControl position='topright'>
            <LayersControl.BaseLayer checked name='Osm.LightMap(fast load)'>
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                // url="./tile/{z}/{x}/{y}.jpg"
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name='MapTiler.Satelit'>
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://api.maptiler.com/maps/hybrid/256/{z}/{x}/{y}.jpg?key=EDfjpnSXEZcv2Rb7xVX3'
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name='MapTiler.Topo'>
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='https://api.maptiler.com/maps/topo/256/{z}/{x}/{y}.png?key=EDfjpnSXEZcv2Rb7xVX3'
              />
            </LayersControl.BaseLayer>
          </LayersControl>

          <ZoomControl position='bottomright' />
        </MapContainer>
      </span>
    </span>
  );
}

export default React.memo(MainMap);
