import axios from "axios";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;




async function DELETEObiectivById (id,token){
    try {
      
      
        const res = await axios.delete(`${SERVER_URL}/api/v1/obiective/obiectiv/delete/${id}`,
        {
          headers: {
            'Authorization': `token ${token}`
          }
        }
        )
        return res.data

    } catch (error) {
      return error
    }
    
  }
  

  async function DELETETracksById (id,token){
    try {
      
      
        const res = await axios.delete(`${SERVER_URL}/api/v1/obiective/track/delete/${id}`,
        {
          headers: {
            'Authorization': `token ${token}`
          }
        }
        )
        return res.data

    } catch (error) {
      return error
    }
    
  }
  

  async function DELETETSatById (id,token){
    try {
      
      
        const res = await axios.delete(`${SERVER_URL}/api/v1/categorie/sat/delete/${id}`,
        {
          headers: {
            'Authorization': `token ${token}`
          }
        }
        )
        return res.data

    } catch (error) {
      return error
    }
    
  }


  async function DELETETMestesugarById (id,token){
    try {
      
      
        const res = await axios.delete(`${SERVER_URL}/api/v1/obiective/mestesugar/delete/${id}`,
        {
          headers: {
            'Authorization': `token ${token}`
          }
        }
        )
        return res.data

    } catch (error) {
      return error
    }
    
  }
  async function DELETETPhotoById (token,id,photoId,public_id){
    try {
      
        // console.log(id);
        // console.log(photoId);
        const res = await axios.delete(`${SERVER_URL}/api/v1/obiective/obiectiv/${id}/delete/${photoId}/photo/${public_id}`,
        {
          headers: {
            'Authorization': `token ${token}`
          }
        }
        )
        return res.data

    } catch (error) {
      return error
    }
    
  }

  async function DELETETSatPhotoById (token,id,photoId,public_id){
    try {
      
        // console.log(id);
        // console.log(photoId);
        const res = await axios.delete(`${SERVER_URL}/api/v1/categorie/sat/${id}/delete/${photoId}/photo/${public_id}`,
        {
          headers: {
            'Authorization': `token ${token}`
          }
        }
        )
        return res.data

    } catch (error) {
      return error
    }
    
  }

  async function DELETETMestesugarPhotoById (token,id,photoId,public_id){
    try {
      
        // console.log(id);
        // console.log(photoId);
        const res = await axios.delete(`${SERVER_URL}/api/v1/obiective/mestesugar/${id}/delete/${photoId}/photo/${public_id}`,
        {
          headers: {
            'Authorization': `token ${token}`
          }
        }
        )
        return res.data

    } catch (error) {
      return error
    }
    
  }

  export {DELETEObiectivById,DELETETracksById,DELETETSatById,DELETETMestesugarById,DELETETPhotoById,DELETETSatPhotoById,DELETETMestesugarPhotoById}
  


  

