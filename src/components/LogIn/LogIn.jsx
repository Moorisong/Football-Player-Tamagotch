import { useRef, useState } from "react";
import Register from "../Register/Register";
import { useNavigate } from 'react-router-dom'
import styles from './LogIn.module.css'
import axios from 'axios';
import { useCookies } from "react-cookie";

export default  function LogIn() {
  const [registerClicked, setRegisterClicked] = useState(false);
  const [cookies, setCookie] = useCookies(['id']);
  const navigate = useNavigate()

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
          navigate('/FormationBoard');
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

  return (
    <>
      <input type='text' placeholder='ID' ref={input_id}></input>
      <input type='text' placeholder='Password' ref={input_pw}></input>
      <button className={styles.register_btn}onClick={clickLogInBtn}>로그인</button>
      <button className={styles.register_btn}onClick={clickRegisterBtn}>회원가입</button>
      {registerClicked && <Register/>}
    </>
  )
}
