import {useState,useEffect} from "react";
const GETfunc=require('../endpoints/getEndPoints')

const useGETallCategoriiObiective=(token,trigger)=>{
    const [categorieObiective,setCategorieObiective] = useState(null)
    const [allCategoriiObiectiveLoading,isLoading] =useState(false)
    

    const fetchAllCategoriiObiective = async(token) =>{
        isLoading(true)
        
        GETfunc.GETallcategorieObiective(token).then(res=>{
            setCategorieObiective(res);
            // console.log(res);
         isLoading(false)
        })
    }


    useEffect(()=>{
        
        let mount=true
        if(mount)fetchAllCategoriiObiective(token) 
        
        return ()=>{
            mount=false
        } 
        },[token,trigger])

    return {categorieObiective,allCategoriiObiectiveLoading,fetchAllCategoriiObiective}
}

export default useGETallCategoriiObiective