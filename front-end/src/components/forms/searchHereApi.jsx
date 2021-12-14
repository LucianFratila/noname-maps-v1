import React, { useEffect, useState } from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { BiCurrentLocation, BiSearch } from "react-icons/bi";




//Import the below modules using "npm i -save request oauth-1.0a crypto"
const request = require('request')
const OAuth = require('oauth-1.0a')
const crypto = require('crypto') // depenency package for OAuth-1.0a






function SearchHereApi(props){

const[tokenHere,setTokenHere]=useState(null)
const[search,setSearch]=useState(null)
const[searchResult,setSearchResult]=useState(null)


// console.log(search);

useEffect(()=>{
    let mount = true
    if(mount){
        let result
        // Token request function
        function generateToken() {
            // #1 Initialize OAuth with your HERE OAuth credentials from the credentials file that you downloaded above
            const oauth = OAuth({
                consumer: {
                    key: 'jJ9LFAJVVFf8UpxCrL07wg', //Access key
                    secret: 'Fux6DpPPprAlDzn4r9bRC9OledG6Y9mkWD9cshw6qRZa2C3qkfCVjKMg78xJLEPgm9jROuo84FNxksR1FiAtCw', //Secret key
                },
                signature_method: 'HMAC-SHA256',
                hash_function(base_string, key) {
                    return crypto
                        .createHmac('sha256', key)
                        .update(base_string)
                        .digest('base64')
                },
            });
            // #2 Building the request object.
            const request_data = {
                url: 'https://account.api.here.com/oauth2/token',
                method: 'POST',
                data: { grant_type: 'client_credentials' },
            };
            // #3 Sending the request to get the access token
            request(
                {
                    url: request_data.url,
                    method: request_data.method,
                    form: request_data.data,
                    headers: oauth.toHeader(oauth.authorize(request_data)),
                },
                function (error, response, body) {

                    if (response.statusCode === 200) {
                        result = JSON.parse(response.body);
                        setTokenHere(result)
                        // console.log('Token', result);
                    }
                }
            );
        }
        generateToken()

    }
    
    return ()=>{
        mount=false
    }


},[])

;

function onSubmitSearch(e){
    e.preventDefault()
    props.transferShowMestesugariOnMap(null)
    if (tokenHere) {
        // console.log(tokenHere);
        var token = tokenHere.access_token; // passing the access_token 
        var requestHeaders = { // Preparing the headers
            'Authorization': 'Bearer ' + token
        };
        var url = `https://geocode.search.hereapi.com/v1/geocode?q=${search}`
        axios(url, { // making a request 
            method: 'get',
            headers: requestHeaders
        })
        .then(function(response) {
            setSearchResult(response.data);
            
        })
        .catch(function(e) {
            console.log('Error:', e);
        });
        
    }

}






if (true) {
    
    return(
            <span>
                <hr/>
                <span style={{fontSize:'13px'}}> <BiSearch/> Cauta locatie</span>
            <Form require='true'  onSubmit={onSubmitSearch} className="d-flex">
                <FormControl
                  
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label={searchResult?`Results:${searchResult.items.length}`:`Search`}
                  onChange={(e)=>{e.preventDefault();setSearch(e.target.value)}}
                />
                
                <Button type='submit'  variant="outline-success">{searchResult?`Res:${searchResult.items.length}`:<BiSearch/>}</Button>
            </Form>
            {
            searchResult
            ?
            <span>
            
            <ListGroup style={{marginTop:'5px'}} as="ul">
                {
                    searchResult.items.map((item,index)=>(
                        <ListGroup.Item key={`searchApiHereList-${index}`} action  as="li" >
                            <Button onClick={(e)=>{e.preventDefault(); props.transfer(item);props.transferShowMestesugariOnMap(null)}} type='submit' size="sm"  variant="outline-success"><BiCurrentLocation/></Button> <span style={{fontSize:'12px'}}>{item.title}</span> 
                        </ListGroup.Item>
                    ))
                }
            </ListGroup>
            </span>
            
            :
            null
            }
            
            
            </span>
            
    
)
    
}else return null

   
}

export default SearchHereApi