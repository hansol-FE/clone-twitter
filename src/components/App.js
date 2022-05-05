import { useState, useEffect } from "react"
import AppRouter from 'components/Router'

import { authService } from "fbase"

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(authService.currentUser);
  
  useEffect(()=>{
    authService.onAuthStateChanged((user) => {
      if(user){
        setLoggedIn(user);
      }else{
        setLoggedIn(false);
      }
      setInit(true);
    });
  },[])
  return (
  <>
    {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "initializing..." }
    <footer>&copy; {new Date().getFullYear()} twitter</footer>
  </>
  )
}

export default App;
