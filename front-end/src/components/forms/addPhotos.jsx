import React, { useState, useContext } from "react";
import { UserContext } from "../../UserContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ProgressBar from "react-bootstrap/ProgressBar";
import Image from "react-bootstrap/Image";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import axios from "axios";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
function AddPhotos(props) {
  const { token } = useContext(UserContext);
  const [file, setFile] = useState([]);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [responseUpload, setResponseUpload] = useState(null);
  const [imgUpLoading, isImgUpLoading] = useState({ state: false });
  const [succesUp, setSuccessUp] = useState({ state: false, mess: "" });

  const onChange = (e) => {
    var filesArr = Array.prototype.slice.call(e.target.files);
    setFile(filesArr);
  };

  // useEffect(() => {
  //   if (!props.callBack) {
  //     setTimeout(() => setResponseUpload(null), 6000);
  //   }
  // }, [props.callBack]);

  const uploadImage = async (e) => {
    e.preventDefault();
    let fd = new FormData();
    file.map((item) => {
      return fd.append(`images`, item);
    });
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
      // setTimeout(() => {
      //   setUploadPercentage(0);
      //   setSuccessUp({ state: false, mess: "Incarca imagini" });
      // }, 10000);
      isImgUpLoading({ state: false });
      setSuccessUp({ state: true, mess: "Imagini incarcate" });
      setResponseUpload(response.data.getItems);
      props.response(response.data.getItems);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <span>
      <div>
        <div>
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
              <Button style={{ margin: "5px" }} disabled={imgUpLoading.state} onClick={uploadImage}>
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
