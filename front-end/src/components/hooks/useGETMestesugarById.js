import {useState,useEffect} from "react";
const GETfunc=require('../endpoints/getEndPoints')

const useGetMestesugarById=(token,id,refresh,loadingParent)=>{
    const [mestesugar,setMestesugar] = useState(null)
    const [fetchLoad,setFetchLoad] = useState(false)
    
    
    const fetchMestesugar = (token,id) =>{
        setFetchLoad(true)
        if (id) {
            
            GETfunc.GETMestesugarById(token,id).then(res=>{
                setMestesugar(res.data.mestesugar);
                setFetchLoad(false)
                }).catch(err=>console.log(err)) 
        }
        
        
    }

    useEffect(()=>{

        let mount=true
        
        if(mount)fetchMestesugar(token,id) 
        
        return ()=>{
            mount=false
            
        } 
        },[token,id,refresh,loadingParent])

    return {mestesugar,fetchMestesugar,fetchLoad}
}

export default useGetMestesugarById