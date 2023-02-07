import React, { useState } from 'react';
import {loginAsync, selectLogged, logout} from './loginSlice';
import {useAppDispatch, useAppSelector} from '../../app/hooks'


export function Login() {
  const [password, setpassword] = useState(0)
  const [username, setusername] = useState("")
  const logged = useAppSelector(selectLogged);
  const dispatch = useAppDispatch();

  function refreshPage() {
    window.location.reload();
  }
  // const [incrementAmount, setIncrementAmount] = useState('2');


  return (
    <div>
      {!logged ?
      <div>
     login
     username: <input onChange={(e)=>setusername(e.target.value)}  ></input>
     password: <input type={"password"} onChange={(e)=>setpassword(+ e.target.value)}  ></input>
     <button onClick={()=>dispatch(loginAsync({username, password}))}>Login</button>
     </div>
     : <div> 
     hello {username}!
     <br></br>
     <button onClick={() => {dispatch(logout());refreshPage()}}>Logout</button>

     </div>}
     </div>
  );
}
