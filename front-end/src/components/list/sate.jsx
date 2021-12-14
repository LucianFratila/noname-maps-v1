import React, { useContext, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { UserContext } from "../../UserContext";
import Leaflet from "leaflet";
import Button from "react-bootstrap/esm/Button";
import Spinner from "react-bootstrap/esm/Spinner";
import { FaTrash, FaEdit } from "react-icons/fa";
import Image from "react-bootstrap/Image";
import Carousel from "react-bootstrap/Carousel";

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

function SateList({ sate, data2EditSate, showEditSate, triggerSate, sateLoading }) {
  const { token } = useContext(UserContext);
  const [loading, isLoading] = useState(false);
  // const { sate } = useSate(token, loading,props.refreshTop);

  const deleteIMG = (id, photoId, public_id) => {
    if (window.confirm(`Stergi ${public_id} ?`)) {
      triggerSate(true);
      DELETEfunc.DELETETSatPhotoById(token, id, photoId, public_id)

        .then((res) => {
          console.log(res);
          triggerSate(false);
        })
        .catch((err) => {
          console.log(err);
          triggerSate(false);
        });
    } else {
      console.log("Thing was not saved to the database.");
    }
  };
  // console.log(props.refreshTop);
  const onDelete = (id, nume) => {
    if (window.confirm(`Stergi ${nume} ?`)) {
      isLoading(true);
      triggerSate(true);
      DELETEfunc.DELETETSatById(id, token)
        .then(() => {
          console.log("Success");
          isLoading(false);
          triggerSate(false);
        })
        .catch((err) => {
          console.log(err);
          isLoading(false);
          triggerSate(false);
        });
    } else {
      // Do nothing!
      console.log("Thing was not saved to the database.");
    }
  };

  const onEdit = (id, nume) => {
    data2EditSate({ id, nume });
    showEditSate();
  };

  if (sate) {
    // console.log(sate);
    return (
      <span>
        {sate.sat.map((item) => (
          <Marker key={item._id} position={item.location.coordinates} icon={selectPin.obiectiveIcon("orange")}>
            <Popup className='request-popup'>
              <div style={popupContent}>
                <div className='m-2' style={popupHead}>
                  {item.nume}
                </div>
                <hr />
                <Carousel fade>
                  {item.photo
                    ? item.photo.map((i) => (
                        <Carousel.Item key={i.public_id}>
                          <div className='containerIMG'>
                            <Image src={i.secure_url} style={{ width: "300px", height: "auto" }} rounded />
                            <div className='middle'>
                              <Button
                                variant='danger'
                                onClick={() => deleteIMG(item._id, i._id, i.public_id)}
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
                <span style={popupText}>{item.obs}</span>
                <div className='m-2' style={okText}>
                  <hr />
                  <Button
                    style={{ margin: "3px" }}
                    variant='danger'
                    size='sm'
                    onClick={() => onDelete(item._id, item.nume)}
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
                    onClick={() => onEdit(item._id, item.nume)}
                  >
                    <FaEdit />
                  </Button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </span>
    );
  }
  return null;
}

export default SateList;
