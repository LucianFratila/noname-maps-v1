import React, { useState, useContext } from "react";
import { UserContext } from "../../UserContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ProgressBar from "react-bootstrap/ProgressBar";
import Image from "react-bootstrap/Image";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;
function DiskErr({ show, setSizeErr, setShowErrModal, setFile }) {
  console.log(show);
  const close = () => {
    setSizeErr({ status: false, mess: "" });
    setShowErrModal(false);
    setFile([]);
  };
  return (
    <span>
      <Modal show={show} onHide={close}>
        <Modal.Header closeButton>
          <Modal.Title>Eroare !</Modal.Title>
        </Modal.Header>
        <Modal.Body>Imagine prea mare, max 1,5Mb</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={close}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </span>
  );
}
function AddPhotos(props) {
  const { token } = useContext(UserContext);
  const [file, setFile] = useState([]);
  const [sizeErr, setSizeErr] = useState({ status: false, mess: "" });
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [responseUpload, setResponseUpload] = useState(null);
  const [imgUpLoading, isImgUpLoading] = useState({ state: false });
  const [succesUp, setSuccessUp] = useState({ state: false, mess: "" });
  const [showErrModal, setShowErrModal] = useState(false);

  const onChange = async (e) => {
    var filesArr = Array.prototype.slice.call(e.target.files);

    filesArr.map((item) => {
      if (item.size > 1500000) {
        setSizeErr({ status: true, mess: "Imagini prea mari !" });
        setShowErrModal(true);
      }

      return item.size;
    });
    setFile(filesArr);
  };
  console.log(sizeErr);
  console.log(file);
  const uploadImage = async (e) => {
    e.preventDefault();
    let fd = new FormData();
    file.map((item) => {
      return fd.append(`images`, item);
    });
    if (sizeErr.status) {
    } else {
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
        isImgUpLoading({ state: false });
        setSuccessUp({ state: true, mess: "Imagini incarcate" });
        setResponseUpload(response.data.getItems);
        props.response(response.data.getItems);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <span>
      <div>
        <div>
          <DiskErr
            setFile={(data) => setFile(data)}
            show={showErrModal}
            setSizeErr={(data) => setSizeErr(data)}
            setShowErrModal={(data) => {
              setShowErrModal(data);
            }}
          />
          <ProgressBar style={{ marginTop: "7px" }} animated now={uploadPercentage} />
          <Form.Group className='d-flex p-2'>
            <Form.Control
              style={{ margin: "5px" }}
              type='file'
              multiple={true}
              required
              name='images'
              onChange={(e) => onChange(e)}
            />
            <OverlayTrigger
              show={succesUp.state}
              placement='top'
              overlay={<Tooltip id={`tooltip`}>{succesUp.mess}</Tooltip>}
            >
              <Button
                style={{ margin: "5px" }}
                disabled={imgUpLoading.state || file.length === 0}
                onClick={uploadImage}
              >
                {imgUpLoading.state === true ? `Loading` : `Incarca`}
              </Button>
            </OverlayTrigger>
            <hr />
          </Form.Group>
        </div>
        <div>
          {responseUpload
            ? responseUpload.map((item) => (
                <span key={item.public_id}>
                  <Image style={{ margin: "3px" }} rounded src={item.secure_url} fluid />
                </span>
              ))
            : null}
        </div>
      </div>
    </span>
  );
}

export default AddPhotos;
