import axios from "axios";

import { getAuth, signOut } from "firebase/auth";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;
const auth = getAuth();
const logout = async (e) => {
  signOut(auth)
    .then(() => {})
    .catch((error) => {
      console.log(error);
    });
};

async function POSTcreateObiectiv(
  token,
  nume2send,
  sat2send,
  cat2send,
  nume_en2send,
  nume_de2send,
  adresa2send,
  tel2send,
  urlImg,
  obs2send,
  obs_en2send,
  obs_de2send,
  lat,
  lng,
  email
) {
  try {
    await axios.post(
      `${SERVER_URL}/api/v1/obiective/obiectiv/add`,
      {
        nume: nume2send,
        sat: sat2send,
        categorie: cat2send,
        nume_en: nume_en2send,
        nume_de: nume_de2send,
        adresa: adresa2send,
        tel: tel2send,
        photo: urlImg,
        obs: obs2send,
        obs_en: obs_en2send,
        obs_de: obs_de2send,
        location: {
          coordinates: [lat, lng],
        },
        user: email,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (err) {
    console.log("Some error, please stop that!!!");
    console.log("--------------------------------");
    console.log(err);
  }
}

async function POSTcreateSat(token, nume2send, obs2send, obs_en2send, obs_de2send, lat, lng, email) {
  try {
    const res = await axios.post(
      `${SERVER_URL}/api/v1/categorie/sat/add`,
      {
        nume: nume2send,
        obs: obs2send,
        obs_en: obs_en2send,
        obs_de: obs_de2send,
        location: {
          coordinates: [lat, lng],
        },
        user: email,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  } catch (err) {
    console.log("Some error, please stop that!!!");
    console.log("--------------------------------");
    console.log(err);
  }
}

async function POSTcreateTrack(token, nume, categorie, obs, obs_en, obs_de, email, track) {
  try {
    const data = new FormData();
    data.append("file", track);
    console.log(track);
    await axios({
      method: "post",
      url: `${SERVER_URL}/api/v1/obiective/convertTrack`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        nume,
        obs,
        obs_en,
        obs_de,
        categorie,
        user: email,
        data: track,
      },
    });
  } catch (err) {
    console.log("Some error, please stop that!!!");
    console.log("--------------------------------");
    console.log(err);
  }
}

async function POSTcreateTrackTest(track) {
  try {
    console.log(track);
    await axios({
      method: "post",
      url: `${SERVER_URL}/api/v1/obiective/convertTrack`,

      data: {
        track,
      },
    });
  } catch (err) {
    console.log("Some error, please stop that!!!");
    console.log("--------------------------------");
    console.log(err);
  }
}

async function POSTcreateMestesugar(
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
  lat,
  lng,
  email
) {
  try {
    await axios.post(
      `${SERVER_URL}/api/v1/obiective/mestesugar/add`,
      {
        nume: nume2send,
        sat: sat2send,
        categorie: cat2send,
        obs: obs2send,
        obs_en: obs_en2send,
        obs_de: obs_de2send,
        meserie: meserie2send,
        meserie_en: meserie_en2send,
        meserie_de: meserie_de2send,
        adresa: adresa2send,
        tel: tel2send,
        location: {
          type: "Point",
          coordinates: [lat, lng],
        },
        user: email,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (err) {
    console.log("Some error, please stop that!!!");
    console.log("--------------------------------");
    console.log(err);
  }
}

async function POSTcreateCategorieMestesugar(token, nume2send, nume_en2send, nume_de2send, color2send) {
  try {
    await axios.post(
      `${SERVER_URL}/api/v1/categorie/mestesugar/add`,
      {
        nume: nume2send,
        nume_en: nume_en2send,
        nume_de: nume_de2send,
        color: color2send,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (err) {
    alert(JSON.stringify(err.response.data.status));
    console.log(err.response.data.status);
  }
}

async function POSTuploadIMG(token, files) {
  try {
    await axios.post(`${SERVER_URL}/api/v1/media/image_upload`, files, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (err) {
    console.log("Some error, please stop that!!!");
    console.log("--------------------------------");
    console.log(err);
  }
}

async function POSTupdateObiectiv(token, id, data) {
  try {
    await axios.post(
      `${SERVER_URL}/api/v1/obiective/obiectiv/update/${id}`,
      {
        data,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (err) {
    console.log("Some error, please stop that!!!");
    console.log("--------------------------------");
    console.log(err);
  }
}

async function POSTupdatePicsObiectiv(token, id, data) {
  try {
    await axios.post(
      `${SERVER_URL}/api/v1/obiective/obiectiv/updatepics/${id}`,
      {
        data,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (err) {
    console.log("Some error, please stop that!!!");
    console.log("--------------------------------");
    console.log(err);
  }
}

async function POSTupdateSat(token, id, data) {
  // console.log(token,id,data);

  try {
    await axios.post(
      `${SERVER_URL}/api/v1/categorie/sat/update/${id}`,
      {
        nume: data.nume,
        obs: data.obs,
        obs_en: data.obs_en,
        obs_de: data.obs_de,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (err) {
    console.log("Some error, please stop that!!!");
    console.log("--------------------------------");
    console.log(err);
  }
}
async function POSTupdatePicsSat(token, id, data) {
  try {
    await axios.post(
      `${SERVER_URL}/api/v1/categorie/sat/updatepics/${id}`,
      {
        data,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (err) {
    console.log("Some error, please stop that!!!");
    console.log("--------------------------------");
    console.log(err);
  }
}

async function POSTupdateMestesugar(token, id, data) {
  // console.log(token,id,data);

  try {
    await axios.post(
      `${SERVER_URL}/api/v1/obiective/mestesugar/update/${id}`,
      {
        nume: data.nume,
        obs: data.obs,
        obs_en: data.obs_en,
        obs_de: data.obs_de,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (err) {
    console.log("Some error, please stop that!!!");
    console.log("--------------------------------");
    console.log(err);
  }
}

async function POSTupdatePicsMestesugar(token, id, data) {
  try {
    await axios.post(
      `${SERVER_URL}/api/v1/obiective/mestesugar/updatepics/${id}`,
      {
        data,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (err) {
    console.log("Some error, please stop that!!!");
    console.log("--------------------------------");
    console.log(err);
  }
}

async function POSTauthLogin(token) {
  try {
    const res = await axios.get(`${SERVER_URL}/api/v1/auth/login`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res;
  } catch (err) {
    console.log(err);

    // console.log(err.response.data.message);
    logout().then(alert(err.response.data.message));
  }
}

async function POSTcreateObiectivCat(token, data) {
  try {
    const res = await axios.post(
      `${SERVER_URL}/api/v1/categorie/obiective/add`,
      {
        data,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res;
  } catch (error) {
    console.log(error);
  }
}

export {
  POSTcreateObiectivCat,
  POSTcreateObiectiv,
  POSTcreateTrack,
  POSTcreateTrackTest,
  POSTcreateSat,
  POSTcreateMestesugar,
  POSTcreateCategorieMestesugar,
  POSTuploadIMG,
  POSTupdateObiectiv,
  POSTupdatePicsObiectiv,
  POSTupdateSat,
  POSTupdatePicsSat,
  POSTupdateMestesugar,
  POSTupdatePicsMestesugar,
  POSTauthLogin,
};
