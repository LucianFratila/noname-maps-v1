import {useState,useEffect} from "react";
const GETfunc=require('../endpoints/getEndPoints')

const useSat=(token,id,trigger)=>{
    const [sat,setSat] = useState(null)
    const [fetchLoad,setFetchLoad] = useState(false)
    

    const fetchSat = (token,id) =>{
        setFetchLoad(true)
        if (id) {
            
            GETfunc.GETsatById(token,id).then(res=>{
                setSat(res);
                setFetchLoad(false)
                }).catch(err=>console.log(err)) 
        }
        
        
    }

    useEffect(()=>{

        let mount=true
        
        if(mount)fetchSat(token,id) 
        
        return ()=>{
            mount=false
            
        } 
        },[token,id,trigger])

    return {sat,fetchSat,fetchLoad}
}

export default useSat