import React, { useEffect, useState, useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import ProgressBar from "react-bootstrap/ProgressBar";
import { UserContext } from "../../UserContext";
const GETfunc = require("../endpoints/getEndPoints");
const SERVER_URL = process.env.REACT_APP_SERVER_URL;

function AddTrackModal(props) {
  const { token } = useContext(UserContext);
  const { user } = useContext(UserContext);
  const [allCatTracks, setAllCatTracks] = useState(null);
  const [catId2send, setCatId2send] = useState();
  const [nume2send, setNume2send] = useState();
  const [loading, isLoading] = useState(false);
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);
  console.log(message);
  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("file", file);
    fd.append("categorie", catId2send);
    fd.append("nume", nume2send);
    fd.append("user", user.email);

    try {
      const res = await axios.post(`${SERVER_URL}/api/v1/obiective/convertTrack`, fd, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          isLoading(true);
          props.refresh(true);
          setUploadPercentage(parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total)));
        },
      });
      // console.log(res);
      // Clear percentage
      setTimeout(() => setUploadPercentage(0), 5000);

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

      setMessage("File Uploaded");
    } catch (err) {
      if (err.response.status === 500) {
        setMessage("There was a problem with the server");
      } else {
        setMessage(err.response.data.msg);
      }
      setUploadPercentage(0);
      isLoading(false);
    }
    isLoading(false);
    props.refresh(false);
  };

  useEffect(() => {
    GETfunc.GETallTrackCategorii(token)
      .then((res) => {
        setAllCatTracks(res.data);
      })
      .catch((err) => console.log(err));
  }, [token]);

  // console.log(allCatTracks);

  return (
    <span>
      <span>
        <Modal show={true}>
          <Modal.Header>
            <Modal.Title>Adauga un track</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Label>Nume</Form.Label>
            <Form.Control
              onChange={(e) => {
                e.preventDefault();
                setNume2send(e.target.value);
              }}
              placeholder='Nume track'
            />
            <Form.Label>Categorie</Form.Label>
            <Form.Select
              onClick={(e) => {
                setCatId2send(e.target.value);
              }}
              defaultValue={"Categorii obiective..."}
            >
              <option disabled={true} key={1}>
                Categorii obiective...
              </option>
              {allCatTracks !== null
                ? allCatTracks.map((item) => (
                    <option style={{ color: item.categorie.color }} value={item.categorie._id} key={item.categorie._id}>
                      {item.categorie.nume}
                    </option>
                  ))
                : `Loading...`}
            </Form.Select>

            <span>
              <ProgressBar style={{ marginTop: "7px" }} animated now={uploadPercentage} />
              <Form.Label>Alege track (numai .gpx)</Form.Label>
              <Form onSubmit={onSubmit}>
                <div className='custom-file mb-4'>
                  <Form.Control
                    type='file'
                    encType='multipart/form-data'
                    className='custom-file-input'
                    // name='file'
                    id='file'
                    onChange={(e) => onChange(e)}
                  />
                </div>
                {filename === "Choose File" ? null : <Button type='submit'>{loading ? "Loading" : "Trimite"}</Button>}
              </Form>
              {uploadedFile ? (
                <div className='row mt-5'>
                  <div className='col-md-6 m-auto'>
                    <h6 className='text-center'>{uploadedFile.fileName}</h6>
                  </div>
                </div>
              ) : null}
            </span>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant='secondary'
              onClick={() => {
                props.closeModal();
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </span>
    </span>
  );
}

export default AddTrackModal;
