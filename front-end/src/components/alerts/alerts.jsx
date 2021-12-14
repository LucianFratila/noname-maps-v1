import React, { useState,useEffect } from 'react';
import Alert from 'react-bootstrap/Alert'




function ShowAlert(props) {
    const [show, setShow] = useState(false);
    // console.log(props.statusShow);
    useEffect(()=>{
        if (props.statusShow) {
            setShow(true)
        }
    },[props.statusShow])
    
if (show) {
    return (
        <Alert show={props.statusShow} variant={props.variant} onClose={() => setShow(false)} dismissible>
        <Alert.Heading>{props.title}</Alert.Heading>
        <p>
        {props.mess}
          
        </p>
      </Alert> 
      );
}
return null 
}


export default ShowAlert;



