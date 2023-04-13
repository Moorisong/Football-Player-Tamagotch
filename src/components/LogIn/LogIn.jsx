import styles from './LogIn.module.css'
import { useRef, useState } from 'react'
import * as util from '../../Util/Api'
import { useNavigate } from 'react-router'

export default function LogIn() {
  const [loginState, setLoginState] = useState(false)
  const [valCheckState, setValCheckState] = useState(false)
  const nav = useNavigate()

  const input_id = useRef(null)
  const input_pw = useRef(null)
  const input_age = useRef(null)
  const input_sex = useRef(null)
  const input_nickName = useRef(null)
  const input_club = useRef(null)

  const inputInfo = [
    {
      name: 'id',
      placeholder: 'ID 입력',
      ref: input_id,
    },
    {
      name: 'pw',
      placeholder: 'PW 입력',
      ref: input_pw,
    },

  ]

  function valueCheck() {
    let check = /^[0-9]+$/
    const emptyIdx = inputInfo.findIndex((e)=> e.ref.current.value === '')

    if(emptyIdx > -1){
      alert('모든 항목을 입력해주세요.')
      return false
    }

    inputInfo.forEach((ele)=>{
      const val = ele.ref.current.value

      if(ele.name === 'id' && val.length > 20){
        alert('ID는 20글자까지 허용됩니다. 현재 글자수 : ' + val.length)
        return false
      }
      if(ele.name === 'pw' && val.length < 3){
        alert('패스워드는 3글자 이상으로 설정해주세요.')
        return false
      }
    })

    setValCheckState(true)
  }

  function submitLogIn() {
    const param = {
      id: input_id.current.value,
      pw: input_pw.current.value,
    }

    valueCheck()
    if(valCheckState){
      util.doReqPost('http://localhost:3001/logIn', param).then(result => {
        if (result.resultMsg === 'logIn_success') {
          setLoginState(true)
          alert('로그인 완료!')
        } else if(result.resultMsg === 'notFoundID'){
          alert('일치하는 ID가 없습니다.')
          return false
        } else if(result.resultMsg === 'notFoundPw'){
          alert('비밀번호를 다시 입력해주세요.')
          return false
        }else {
          alert('에러가 발생하였습니다')
          console.log('Error---->', result.errorMsg)
        }
      })
    }
  }

  function clickRgisterBtn(){
    return nav('/Register')
  }

  return (
    <>
      <div className={styles.textBoxWrap}>
        {!loginState && inputInfo?.map((ele, idx) =>
          <input key = {ele.ref+idx}
            type="text"
            placeholder={ele.placeholder}
            ref={ele.ref}
            className={styles.textBox}
          />
        )}
        { !loginState && <button onClick={submitLogIn} className={styles.submitBtn}>
          로그인하기
        </button>}

        { !loginState && <button onClick={clickRgisterBtn} className={styles.submitBtn}>
          가입하기
        </button>}

      </div>
    </>
  )
}
