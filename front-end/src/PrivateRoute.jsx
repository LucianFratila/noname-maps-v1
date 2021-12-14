import React,{useContext} from 'react'
import { Redirect, Route } from 'react-router-dom'
import { UserContext } from './UserContext'








const PrivateRoute = ({ component: Component, ...rest }) => {
  const {user} = useContext(UserContext)
  // console.log(user);
    
    return (
      <Route
        {...rest}
        render={
          (props)=>{
            if (user) {
              return <Component {...props}/>
            } else {
              return <Redirect to={
                {
                  pathname: '/login',
                  
                }

              }/>
            }
            
          }
        }
      />
    )
  
  
  
}

export default PrivateRoute