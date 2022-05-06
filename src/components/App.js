import { useState, useEffect } from "react"
import AppRouter from 'components/Router'

import { authService } from "fbase"

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setLoggedIn] = useState(authService.currentUser);
  /*  
    처음 App.js가 렌더링될때 authService.currentUser가 null이다. 
    파이어베이스에서 정보를 가져올때까지 시간이 좀 걸리기 때문임. 따라서 useEffect를 사용해서 렌더링 초기에
    authService.onAuthStateChanged 함수를 이용해서 걸리는 시간동안 화면에 표시될 로딩화면을 만듬.

    onAuthStateChanged : 유저의 상태가 변화가 있을때마다 자동으로 함수 실행시킴
  */
  useEffect(()=>{
    console.log("App.js useEffect");
    authService.onAuthStateChanged((user) => {
      console.log("onAuthStateChanged");
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
