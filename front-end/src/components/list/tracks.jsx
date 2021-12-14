import React,{useState,useEffect,useContext} from "react";
import { UserContext } from '../../UserContext';
import {Popup, GeoJSON,Marker} from 'react-leaflet'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import Spinner from 'react-bootstrap/esm/Spinner';
import {FaTrash} from "react-icons/fa";
import Leaflet from 'leaflet';



const GETfunc = require('../endpoints/getEndPoints')
const DELETEfunc = require('../endpoints/delEndPoints')


class MyCustomPin {
  constructor(color) {
    this.color = color;
  }

  

  obiectiveIcon(x){
   return Leaflet.divIcon({
      className: "my-custom-pin",
      iconAnchor: [-6, 15],
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
      border: 1px solid #FFFFFF" />`
    })
  }

}
let obiectivePin = new MyCustomPin()


const popupContent = {
    textAlign: "center",
    height: "100%",
    marginTop: "30px"
  };
  const popupHead = {
    fontWeight: "bold",
    fontSize: "22px"
  };
  
  const popupText = {
    fontSize: "15px",
    marginBottom: "20px"
  };
  
  const okText = {
    fontSize: "15px"
  };

function MapLayer(props){
  const [popToggle,setPopToggle] = useState(null)
  // props.data.trasee.map((item,index)=>{
  //   console.log(item.track.features[0].geometry.coordinates);
  // })


  return(
    <span>
      {
        props.data.trasee.map((item,index)=>(
              <span key={item._id}>
        <Marker  position={[item.track.features[0].geometry.coordinates[0][1],item.track.features[0].geometry.coordinates[0][0]]}  icon={obiectivePin.obiectiveIcon('green')}>
           <CustomPopUp type={'Start traseu'}  item={item} togglePopUp={(data)=>setPopToggle(data)}/>
           </Marker>
           <Marker  position={[item.track.features[0].geometry.coordinates[item.track.features[0].geometry.coordinates.length-1][1],item.track.features[0].geometry.coordinates[item.track.features[0].geometry.coordinates.length-1][0]]}  icon={obiectivePin.obiectiveIcon(item.categorie[0].color)}>
           <CustomPopUp type={'Finish traseu'}  item={item} togglePopUp={(data)=>setPopToggle(data)}/>
       </Marker>
       <GeoJSON  pathOptions={{color: item.categorie[0].color,fillColor:'red', weight:popToggle===item._id?13:3, lineCap:'round'}} data={item.track.features[0]}>
           <CustomPopUp token={props.token} refresh={props.refresh} index={index} type={null} show={true}  item={item} togglePopUp={(data)=>setPopToggle(data)}/> 
       </GeoJSON>
       
      </span>

        ))
      }
    </span>
    
    
  )
}




function TracksCatList(props){
  
  let catLength 
  if (props.catTracks) {
    catLength = props.catTracks.length
    
  }
  
  const[show,setShow]=useState(
    new Array(catLength).fill(false)
  )
  const handleOnChange = (position)=>{
    const updatedCheckedState = show.map((item, index) =>
    index === position ? !item : item
    
  );
  setShow(updatedCheckedState);
  
  }
  
  
  return (

    
    <div  style={{zIndex:'99999',position:'fixed', top:'100px', height:'auto', overflowY:'auto', backgroundColor:'white', fontSize:'17px'}}>
          <span style={{fontSize:'15px',padding:'3px'}} >{props.catTracks?`Categorii trackuri`:`Loading`}</span>
          
          {
            props.catTracks.map((item,index)=>(
              <span key={item.categorie._id} >
                  
  
                  
                    {
                      item.trasee.length!==0
                      ?
                      <span className='d-flex p-2'>
                      <span className="badge" style={{background:item.categorie.color,fontSize:'14px'}}>{item.trasee.length}</span>
                      <Form style={{marginLeft:'5px'}} >
                      <Form.Check
                      type='switch'
                      id={`${index}`}
                      label={item.categorie.nume}
                      value={item.categorie.nume}
                      checked={show[index]}
                      onChange={(e)=>{
                        handleOnChange(index) 
                        
                      }}
                      />
                    </Form>
                    </span> 
                    :null
                    }
                    
                      
                  
                
                  <span>
                    {show[index]?<MapLayer refresh={props.refresh} token={props.token} id={item.categorie._id} data={item}/>:null} 
                  </span>
                </span>
            ))
          }
          
            
        </div>
        
  )
}


function Tracks(props){
    
    const {token} = useContext(UserContext)
    const [catTracks,setCatTracks] = useState(null)
    const [refresh,setRefresh] = useState(false)
    

    

    useEffect(()=>{

      let mount = true
      
      GETfunc.GETallTrackCategorii(token).then((res=>{
        if(mount)  setCatTracks(res.data)

      })).catch(err=>console.log(err))  
    return ()=>{
      mount=false
    }  
        
    },[token,refresh,props.tracksRefresh])

  
    
    if (catTracks) {

      
     
        
        return(
          <div>
            <TracksCatList refresh={()=>setRefresh(!refresh)} token={token} catTracks={catTracks}/>
            
          </div>
        )  
    }
    else{return(
      <div style={{width:'100%',height:'100%', position:'absolute',margin:'auto',zIndex:'99999'}}>
      <Spinner  animation="border" style={{color: "green",width:'400px',height:'400px',left:'40%',top:'30%',position:'fixed'}} />
      
    </div>
    )}
    

}



function CustomPopUp({item,togglePopUp,type,show,token,refresh}){
  
  const [loading,isLoading]=useState(false)
  const onDelete=()=>{
    if (window.confirm(`Stergi ${item.nume} ?`)) {

      isLoading(true)
      DELETEfunc.DELETETracksById(item._id,token).then(()=>{isLoading(false);refresh()}).catch(err=>{console.log(err);isLoading(false)})
      
    } else {
      // Do nothing!
      console.log('Thing was not saved to the database.');
    }
  }
  
  return(

    <Popup onOpen={(e)=>{togglePopUp(item._id)}} onClose={()=>{togglePopUp(null)}} className="request-popup">

      
                                
      <div style={popupContent}>
        <div className="m-2" style={popupHead}>
            {item.nume}
        </div>
        <h6>{!type?null:type}</h6>
        <hr/>  
        <span style={popupText}>
            {/* {item.obs} */}
        </span>
        <div className="m-2" style={okText}>
        <b>Categorie: </b>
            {
              item.categorie.map((sub,index)=>(
                  <span key={index}>{sub.nume}</span>
              ))
            }
        <hr/>
         {
        show?
        <Button variant='danger' size='sm' onClick={()=>onDelete(item._id,item.nume)}>
            {loading? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>:<FaTrash/>}
        </Button>
        :
        null  
        } 
             
        </div>
      </div>

    </Popup>

  )
}

export default Tracks