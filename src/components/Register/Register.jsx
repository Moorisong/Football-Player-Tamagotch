import styles from './Register.module.css'
import { useRef, useState } from 'react'
import Main from '../Main/Main'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [idAdded, setIdAdded] = useState(false)
  const navigate = useNavigate()

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

    let check = /^[0-9]+$/

    if (!id || !pw || !age || !sex || !nickName || !club) {
      alert('모든 항목을 입력해주세요.')
      return false
    }

    if (id.length > 20) {
      alert('ID는 20글자까지 허용됩니다. 현재 글자수 : ' + id.length)
      return false
    } else if (pw.length < 3) {
      alert('패스워드는 3글자 이상으로 설정해주세요.')
      return false
    } else if (!check.test(age)) {
      alert('나이는 숫자로 입력해주세요.')
      return false
    } else if (check.test(sex)) {
      alert('성별은 문자로 입력해주세요.')
      return false
    }

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
    })
      .then(res => {
        if (res.status == 200) {
          console.log('res---> ', res)
          return res.json()
        }
      })
      .then(result => {
        console.log('result--> ', result)
        if (result.resultMsg == 'success') {
          setIdAdded(true)
          navigate('/FormationBoard')
        } else {
          console.log('에러---->', result.errorMsg)
        }
      })
  }

  return (
    <>
      {!idAdded && (
        <div className={styles.textBoxWrap}>
          <input
            type="text"
            placeholder="ID 입력"
            ref={input_id}
            className={styles.textBox}
          />
          <input
            type="text"
            placeholder="PW 입력"
            ref={input_pw}
            className={styles.textBox}
          />
          <input
            type="text"
            placeholder="나이 입력"
            ref={input_age}
            className={styles.textBox}
          />
          <input
            type="text"
            placeholder="성별 입력"
            ref={input_sex}
            className={styles.textBox}
          />
          <input
            type="text"
            placeholder="닉네임 입력"
            ref={input_nickName}
            className={styles.textBox}
          />
          <input
            type="text"
            placeholder="클럽 입력"
            ref={input_club}
            className={styles.textBox}
          />

          <button onClick={submitRegister} className={styles.RegisterBtn}>
            가입하기
          </button>
        </div>
      )}
    </>
  )
}
