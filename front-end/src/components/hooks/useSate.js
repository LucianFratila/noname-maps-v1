import {useState,useEffect} from "react";
const GETfunc=require('../endpoints/getEndPoints')

const useSate=(token,trigger)=>{
    const [sate,setSate] = useState(null)
    const [sateLoading,isLoading] =useState(false)
    // console.log(trigger);

    const fetchSate = async(token) =>{
        isLoading(true)
        GETfunc.GETallSate(token).then(res=>{
         setSate(res);
         isLoading(false)
        })
    }

    useEffect(()=>{

        let mount=true
        if(mount)fetchSate(token) 
        
        return ()=>{
            mount=false
        } 
        },[token,trigger])

    return {sate,sateLoading,fetchSate}
}

export default useSate