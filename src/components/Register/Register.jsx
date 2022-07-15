import styles from './Register.module.css'
import { useRef, useState } from 'react'
import Main from '../Main/Main'

export default function Register() {
  const [id_forMain, setId_forMain] = useState(null)
  const input_id = useRef(null)
  const input_pw = useRef(null)
  const input_age = useRef(null)
  const input_sex = useRef(null)
  const input_nickName = useRef(null)
  const input_club = useRef(null)

  function submitRegister() {
    const id = input_id.current.value
    const pw = input_pw.current.value
    const age = input_age.current.value
    const sex = input_sex.current.value
    const nickName = input_nickName.current.value
    const club = input_club.current.value

    fetch('http://localhost:3001/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        pw: pw,
        age: age,
        sex: sex,
        nickName: nickName,
        club: club,
      }),
    }).then(res => {
      if (res.status == 200) {
        setId_forMain(id)
        console.log(`[${id_forMain}]님 가입 완료!`)
      }
    })
  }

  return (
    <>
      <div>
        <input type="text" placeholder="ID 입력" ref={input_id} />
        <input type="text" placeholder="PW 입력" ref={input_pw} />
        <input type="text" placeholder="나이 입력" ref={input_age} />
        <input type="text" placeholder="성별 입력" ref={input_sex} />
        <input type="text" placeholder="닉네임 입력" ref={input_nickName} />
        <input type="text" placeholder="클럽 입력" ref={input_club} />

        <button className={styles.RegisterBtn} onClick={submitRegister}>
          가입하기
        </button>
      </div>
      {id_forMain && <Main id={id_forMain} />}
    </>
  )
}
