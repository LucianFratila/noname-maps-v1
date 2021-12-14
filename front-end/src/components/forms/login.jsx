import React, { useState } from "react";
import firebaseConfig from "../../config/firebase-config";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
const POSTfunc = require("../endpoints/postEndPoints");
function LoginForm(props) {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();

    try {
      await firebaseConfig
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          res.user.getIdToken().then((token) => {
            POSTfunc.POSTauthLogin(token)
          });
        });

      props.history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const emailHandler = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };
  return (
    <div
      style={{ margin: "0 auto", width: "50%", position: "absolute", left: "0", right: "0", top: "40%", bottom: "0" }}
    >
      <Form>
        <Form.Group className='mb-3' controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control type='email' onChange={emailHandler} placeholder='Enter email' />
          <Form.Text className='text-muted'>We'll never share your email with anyone else.</Form.Text>
        </Form.Group>

        <Form.Group className='mb-3' controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' onChange={passwordHandler} placeholder='Password' />
        </Form.Group>
        <Button onClick={login} variant='primary'>
          Go
        </Button>
      </Form>
    </div>
  );
}

export default LoginForm;
