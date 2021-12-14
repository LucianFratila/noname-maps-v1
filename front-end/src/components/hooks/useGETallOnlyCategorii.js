import {useState,useEffect} from "react";
const GETfunc=require('../endpoints/getEndPoints')

const useGETallOnlyCategorii=(token,trigger)=>{
    const [onlyCategorii,setOnlyCategorii] = useState(null)
    const [onlyCategoriiLoading,isLoading] =useState(false)
    
    console.log(trigger);
    const fetchOnlyCategorii = async(token) =>{
        isLoading(true)
        GETfunc.GETonlyCategorii(token).then(res=>{
            setOnlyCategorii(res);
            // console.log(res);
         isLoading(false)
        })
    }

    useEffect(()=>{

        let mount=true
        if(mount)fetchOnlyCategorii(token) 
        
        return ()=>{
            mount=false
        } 
        },[token,trigger])

    return {onlyCategorii,onlyCategoriiLoading,fetchOnlyCategorii}
}

export default useGETallOnlyCategorii