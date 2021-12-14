import axios from "axios";
const SERVER_URL = process.env.REACT_APP_SERVER_URL;



async function GETObiectivById (token,id){
  try {
    
    
      const res = await axios.get(`${SERVER_URL}/api/v1/obiective/${id}`,
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




async function GETcategorieObiectivById (id,token){
    try {
      
      
        const res = await axios.get(`${SERVER_URL}/api/v1/categorie/obiective/${id}`,
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
  
  async function GETallcategorieObiective (token){
    try {
      
      
        const res = await axios.get(`${SERVER_URL}/api/v1/categorie/obiective/`,
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


  async function GETonlyCategorii (token){
    try {
      
      
        const res = await axios.get(`${SERVER_URL}/api/v1/categorie/all/`,
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

  async function GETallSate (token){
    try {
      
      
        const res = await axios.get(`${SERVER_URL}/api/v1/categorie/sate/`,
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

  async function GETsatById (token,id){
    try {
      
      
        const res = await axios.get(`${SERVER_URL}/api/v1/categorie/sat/${id}`,
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
  


  async function GETtrackById (id,token){
    try {
        const res = await axios.get(`${SERVER_URL}/api/v1/obiective/getTrack/${id}`,
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

  async function GETallTracks (token){
    // console.log(token);
    try {
        const res = await axios.get(`${SERVER_URL}/api/v1/obiective/getTracks`,
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


  async function GETallTrackCategorii (token){
    
    try {
      
      
        const res = await axios.get(`${SERVER_URL}/api/v1/categorie/catTracks`,
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


  async function GETCatTrackById (id,token){
    try {
        const res = await axios.get(`${SERVER_URL}/api/v1/categorie/catTracks/${id}`,
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


  async function GETallcategorieMestesugari (token){
    try {
      
      
        const res = await axios.get(`${SERVER_URL}/api/v1/categorie/mestesugari`,
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

  async function GETallMestesugari (token,cat,sat){
    try {
        
        // console.log(queryUrl);   
      
        const res = await axios.get(`${SERVER_URL}/api/v1/obiective/mestesugar/view?sat=${sat}&cat=${cat}`,
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

  async function SEARCHallMestesugari (token,nume){
    try {
        
        // console.log(queryUrl);   
      
        const res = await axios.get(`${SERVER_URL}/api/v1/obiective/mestesugar/search?nume=${nume}`,
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


  async function GETindividualIMGS (token,id){
    try {
        
        // console.log(queryUrl);   
      
        const res = await axios.get(`${SERVER_URL}/api/v1/media/image`,
        {
          id
        },
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

  async function GETMestesugarById (token,id){
    try {
        const res = await axios.get(`${SERVER_URL}/api/v1/obiective/mestesugar/${id}`,
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

  export {
    GETcategorieObiectivById,
    GETallcategorieObiective,
    GETallSate,
    GETtrackById,
    GETallTracks,
    GETallTrackCategorii,
    GETCatTrackById,
    GETallcategorieMestesugari,
    GETallMestesugari,
    SEARCHallMestesugari,
    GETindividualIMGS,
    GETObiectivById,
    GETsatById,
    GETMestesugarById,
    GETonlyCategorii
  }
  


  

