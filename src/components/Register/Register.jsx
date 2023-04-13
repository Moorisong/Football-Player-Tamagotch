import styles from './Register.module.css'
import { useRef, useState } from 'react'
import * as util from '../../Util/Api'
import { useNavigate } from 'react-router'

export default function Register() {
  const [idAdded, setIdAdded] = useState(false)
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
    {
      name: 'age',
      placeholder: '나이 입력',
      ref: input_age,
    },
    {
      name: 'sex',
      placeholder: '성별 입력',
      ref: input_sex,
    },
    {
      name: 'nickName',
      placeholder: '닉네임 입력',
      ref: input_nickName,
    },
    {
      name: 'club',
      placeholder: '클럽 입력',
      ref: input_club
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
      if(ele.name === 'age' && !check.test(val)){
        alert('나이는 숫자로 입력해주세요.')
        return false
      }
      if(ele.name === 'sex' && check.test(val)){
        alert('성별은 문자로 입력해주세요.')
        return false
      }
    })
  }

  function submitRegister() {
    const param = {
      id: input_id.current.value,
      pw: input_pw.current.value,
      age: input_age.current.value,
      sex: input_sex.current.value,
      nickName: input_nickName.current.value,
      club: input_club.current.value,
    }

    valueCheck()

    util.doReqPost('http://localhost:3001/register', param).then(result => {
      if (result.resultMsg === 'success') {
        setIdAdded(true)
        alert('회원 가입 완료! 로그인 해주시기 바랍니다.')
        nav('/Main')

      } else if (result.resultMsg === 'duplicated ID') {
        alert('이미 존재하는 ID입니다.')
        return false
      } else {
        alert('에러가 발생하였습니다')
        console.log('Error---->', result.errorMsg)
      }
    })
  }

  return (
    <>
      <p>가입 페이지</p>
      <div className={styles.textBoxWrap}>
        {!idAdded && inputInfo?.map((ele, idx) =>
          <input key = {ele.ref+idx}
            type="text"
            placeholder={ele.placeholder}
            ref={ele.ref}
            className={styles.textBox}
          />
        )}
        {!idAdded && <button onClick={submitRegister} className={styles.submitBtn}>
          가입하기
        </button>}
      </div>
    </>
  )
}
