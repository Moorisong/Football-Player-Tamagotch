import { useRef, useState } from "react";
import Register from "../Register/Register";
import { useNavigate } from 'react-router-dom'
import styles from './LogIn.module.css'

export default function LogIn() {
  const [registerClicked, setRegisterClicked] = useState(false);
  const navigate = useNavigate()

  const input_id = useRef(null)
  const input_pw = useRef(null)

  function clickRegisterBtn(){
    setRegisterClicked(true);
  }

  function clickLogInBtn(){
    const id = input_id.current.value
    const pw = input_pw.current.value

    fetch('http://localhost:3001/logIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        pw: pw,
      }),
    })
    .then(res => {
      if(res.status == 200){
        console.log('res--->', res)
        return res.json()
      }
    })
    .then(result => {
      if(result.resultMsg == 'notFoundID') {
        return alert("해당 ID 정보가 존재하지 않습니다");
      }else if(result.resultMsg == 'notFoundPw'){
        return alert("패스워드가 알치하지 않습니다. 다시 입력해주세요.");
      }else if(result.resultMsg == 'logIn_success'){
        alert('로그인 완료! 메인 화면으로 이동합니다.');
        return navigate('/FormationBoard');
      }
    })

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
