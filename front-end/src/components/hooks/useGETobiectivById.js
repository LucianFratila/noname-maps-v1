import {useState,useEffect} from "react";
const GETfunc=require('../endpoints/getEndPoints')

const useGETobiectivById=(token,id,trigger)=>{
    const [obiectiv,setObiectiv] = useState(null)
    const [fetchLoad,setFetchLoad] = useState(false)
    

    const fetchObiectiv = (token,id) =>{
        setFetchLoad(true)
        if (id) {
            
            GETfunc.GETObiectivById(token,id).then(res=>{
                setObiectiv(res);
                setFetchLoad(false)
                }).catch(err=>console.log(err)) 
        }
        
        
    }

    useEffect(()=>{

        let mount=true
        
        if(mount)fetchObiectiv(token,id) 
        
        return ()=>{
            mount=false
            
        } 
        },[token,id,trigger])

    return {obiectiv,fetchObiectiv,fetchLoad}
}

export default useGETobiectivById