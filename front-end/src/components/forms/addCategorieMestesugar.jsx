import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const POSTfunc = require('../endpoints/postEndPoints')


function SmallFormAddCatMester(props){
    
    const [loading,isLoading] = useState(false)
    const [nume, setNume] = useState('')
    const [nume_en2send,setNume_en2send] = useState('')
    const [nume_de2send,setNume_de2send] = useState('')
    const [color,setColor] = useState('green')
    const sendForm = (e) => {
        e.preventDefault()
        isLoading(true)
        props.refreshCatList(true)
        POSTfunc.POSTcreateCategorieMestesugar(props.token,nume,nume_en2send,nume_de2send,color)
            .then(()=>{
                props.refreshCatList(false)
                isLoading(false)
            }).catch(err=>{
                console.log(err)
                props.refreshCatList(false)
                isLoading(false)
            }) 
    }


    return(
        <Form onSubmit={sendForm}>
        <Form.Group >
            <Row className="align-items-center">
            <Col sm={8} className="my-1">
                
            <Form.Control required onChange={(e)=>{e.preventDefault();setNume(e.target.value)}} id="inlineFormInputName" placeholder={props.placeholderName} />
            <Form.Control required onChange={(e)=>{e.preventDefault();setNume_en2send(e.target.value)}} id="inlineFormInputName" placeholder={'en'} />
            <Form.Control required onChange={(e)=>{e.preventDefault();setNume_de2send(e.target.value)}} id="inlineFormInputName" placeholder={'de'} />
            </Col>
            <>
            
            <Form.Control
                type="color"
                id="exampleColorInput"
                defaultValue="#563d7c"
                title="Choose your color"
                onChange={e=>setColor(e.target.value)}
            />
            </>
            <Col xs="auto" className="my-1">
            
                <Button  type="submit">{loading?`Loading`:props.numeBtn}</Button>
            </Col>
            </Row>
        </Form.Group>
        </Form>
    )
}

export default SmallFormAddCatMester

