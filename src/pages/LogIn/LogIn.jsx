import { useRef, useState } from "react";
import Register from "../../components/Register/Register";
import styles from './LogIn.module.css'
import axios from 'axios';
import { useCookies } from "react-cookie";
import { Const } from '../../components/Const/Const'
import Board from "../../components/Board/Board";


export default  function LogIn() {
  const [registerClicked, setRegisterClicked] = useState(false);
  const [logInState, setLogInState] = useState(false)
  const [cookies, setCookie] = useCookies(['id']);
  const nodeRef = useRef(null)

  const input_id = useRef(null)
  const input_pw = useRef(null)

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
        setCookie('_id', res.data.token)

        const token = res.data.token

        axios
        .post('http://localhost:3001/auth', {token: token})
        .then(res => {
          alert(`${res.data.nickName}님 환영합니다.`);
          return setLogInState(true)
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
    .post('http://localhost:3001/logOut')
    .then(res => {
      if(res.data.resultMsg == 'logOut_success'){
        alert('로그아웃 되었습니다.')
        return setLogInState(false)
      }
    })
    }

  return (
    <>
    {!logInState && <div>
      <input type='text' placeholder='ID' ref={input_id}></input>
      <input type='text' placeholder='Password' ref={input_pw}></input>
      <button className={styles.register_btn}onClick={clickLogInBtn}>로그인</button>
      <button className={styles.register_btn}onClick={clickRegisterBtn}>회원가입</button>
      {registerClicked && <Register/>}
      </div>}

    {logInState && <button onClick={onClickLogOut}>로그아웃</button>}
    {logInState && <Board />}
    </>
  )
}
