import axios from "axios";


 async function GETphotos (){
    try {
      
        
        const res = await axios.get(`https://728531564655896:-GHnhb3ATaPaT3PqXRFQX9M2yXU@api.cloudinary.com/v1_1/sirtitish/resources/image`,
        {
            headers: {
               authorization: ' xxxxxxxxxx' ,
               'Content-Type': 'application/json'
            } 
         }
        
        )
        return res.data

    } catch (error) {
      return error
    }
    
  }

  export {GETphotos} 