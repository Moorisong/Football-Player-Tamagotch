import { useEffect, useRef, useState } from "react";
import Register from "../../components/Register/Register";
import styles from './Main.module.css'
import axios from 'axios';
import { useCookies } from "react-cookie";
import { Const } from '../../components/Const/Const'
import Board from "../../components/Board/Board";
import { CookieSharp, SystemSecurityUpdateWarningSharp } from "@mui/icons-material";


export default  function Main() {
  const [registerClicked, setRegisterClicked] = useState(false);
  const [logInState, setLogInState] = useState(()=>JSON.parse(window.localStorage.getItem("logInState")))
  const [cookies, setCookie, removeCookie] = useCookies(['_id']);
  const [userID, setUserID] = useState(null)
  const nodeRef = useRef(null)

  const input_id = useRef(null)
  const input_pw = useRef(null)


  useEffect(()=>{
    window.localStorage.setItem("logInState", JSON.stringify(logInState))
  },[logInState])


  function clickRegisterBtn(){
    setRegisterClicked(true);
  }

function clickLogInBtn(){
    const id = input_id.current.value
    const pw = input_pw.current.value

    if(!id || !pw) return alert('아이디와 비밀번호를 입력해주세요.')

    axios
    .post('http://localhost:3001/logIn', { "id": id, "pw": pw })
    .then(res => {
      if(res.data.resultMsg == 'logIn_success'){
        setCookie('_id'+'_damagotch_'+ id , res.data.token)

        const token = res.data.token

        if(!token) alert('예기치 못한 에러가 발생했습니다.')

        axios
        .post('http://localhost:3001/auth', {token: token})
        .then(res => {

          if(res.data.result == 'success' ) {
            setUserID(res.data.id)
            alert(`${res.data.nickName}님 환영합니다.`);
            return setLogInState(true)
          }
          else alert('로그인에 실패하였습니다.')
          return
          })
        }
      }
  )
    .catch((err)=>{
      if(err.response){
        if(err.response.data.resultMsg == 'notFoundID') {
          return alert("해당 ID 정보가 존재하지 않습니다")
        } else if(err.response.data.resultMsg == 'notFoundPw'){
          return alert("패스워드가 알치하지 않습니다. 다시 입력해주세요.");
        }
       }
      }
    )
}
const onClickLogOut = e => {
  axios
    .post('http://localhost:3001/logOut', {id: userID})
    .then(res => {
      if(res.data.resultMsg == 'logOut_success'){
         alert('로그아웃 되었습니다.')
         removeCookie('_id_damagotch_'+userID)
        return setLogInState(false)
      }
    })
    }

const onClickMakeNewPlayer = e => {
  axios
    .post('http://localhost:3001/makeNewPlayer')
    .then(res => {
      return console.log('res--->',res)
      // if(res.data.resultMsg == 'logOut_success'){
      //    alert('로그아웃 되었습니다.')
      //    removeCookie('_id')
        // return setLogInState(false)
      // }
    })
}

  return (
    <>
    {!logInState&& <div>
      <input type='text' placeholder='ID' ref={input_id}></input>
      <input type='text' placeholder='Password' ref={input_pw}></input>
      <button className={styles.register_btn}onClick={clickLogInBtn}>로그인</button>
      <button className={styles.register_btn}onClick={clickRegisterBtn}>회원가입</button>
      {registerClicked && <Register/>}
      </div>}

    {logInState && <button onClick={onClickLogOut}>로그아웃</button>}
    {logInState && <button onClick={onClickMakeNewPlayer}>선수 생성</button>}

    {logInState && <Board />}
    </>
  )
}
