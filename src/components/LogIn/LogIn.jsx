import { useState } from "react";
import Register from "../Register/Register";
import styles from './LogIn.module.css'

export default function LogIn() {
  const [registerClicked, setRegisterClicked] = useState(false);

  function clickRegisterBtn(){
    setRegisterClicked(true);
  }

  function clickLogInBtn(){
    console.log("로그인 버튼 눌렀음");
  }

  return (
    <>
      <input type='text' placeholder='ID'></input>
      <input type='text' placeholder='Password'></input>
      <button className={styles.register_btn}onClick={clickLogInBtn}>로그인</button>
      <button className={styles.register_btn}onClick={clickRegisterBtn}>회원가입</button>
      {registerClicked && <Register/>}
    </>
  )
}
