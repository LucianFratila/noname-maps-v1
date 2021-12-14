import React, { useContext } from "react";
import { UserContext } from "../../UserContext";
import Layout from "../menus/mainMenu";
import Spinner from "react-bootstrap/esm/Spinner";


function HomeScreen() {
  const { token } = useContext(UserContext);

  

  if (token) {
    return (
      <span>
        <Layout   />
      </span>
    );
  } else
    return (
      <div style={{ width: "100%", height: "100%", position: "absolute", margin: "auto" }}>
        <Spinner
          animation='border'
          style={{ color: "green", width: "400px", height: "400px", left: "40%", top: "30%", position: "fixed" }}
        />
      </div>
    );
}

export default HomeScreen;
