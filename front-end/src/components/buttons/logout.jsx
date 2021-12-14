import React, { useState,useEffect,useContext } from 'react';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { getAuth, signOut } from "firebase/auth";
import { UserContext } from '../../UserContext';
import { FaSignOutAlt } from 'react-icons/fa';
const auth = getAuth();

function LogoutButton (props){
    const token = useContext(UserContext);
    const {user} = useContext(UserContext);
    const [loading,isLoading] = useState(false)
  
    const [showLogout,setShowlogout] = useState(false)
    const logout = async()=>{
    
        try {
          isLoading(true)
          await signOut(auth)
          
        } catch (error) {
          console.log(error);
        }
        isLoading(false)
    
      }

      useEffect(() => {
          if (token.token) {
            setShowlogout(true)
            
          }
      }, [token.token])

    if (showLogout) {

        return(
            
          <OverlayTrigger
          key={'bottom'}
          placement={'bottom'}
          overlay={
            <Tooltip id={`tooltip-bottom`}>
              {loading?`loading`:<span>Sign out: <strong>{user.email}</strong>.</span>}
            </Tooltip>
          }
        >
          <Button size="sm" variant="outline-dark" onClick={logout}><FaSignOutAlt/></Button>
        </OverlayTrigger>
                
             
            
        )
        
    } else {

        return null
        
    }

    
}

export default LogoutButton