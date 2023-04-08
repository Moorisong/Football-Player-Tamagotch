import styles from './Register.module.css'
import { useRef, useState } from 'react'
import * as util from '../../Util/Api'

export default function Register() {
  const [idAdded, setIdAdded] = useState(false)

  let id, pw, age, sex, nickName, club

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
    // const eleArr = ['id', 'pw', 'age', 'sex', 'nickName', 'club']

    inputInfo.forEach((ele)=>{
      // 에러난다 송현아
      const val = ele.ref.current.value
      if(!val){
        alert('모든 항목을 입력해주세요.')
        return false
      }
      if(ele.name === 'id' && val.length > 20){
        alert('ID는 20글자까지 허용됩니다. 현재 글자수 : ' + id.length)
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
      if(ele.name === 'sex' && !check.test(val)){
        alert('성별은 문자로 입력해주세요.')
        return false
      }

    })

    // id = input_id.current.value
    // pw = input_pw.current.value
    // age = input_age.current.value
    // sex = input_sex.current.value
    // nickName = input_nickName.current.value
    // club = input_club.current.value

    // if (!id || !pw || !age || !sex || !nickName || !club) {
    //   alert('모든 항목을 입력해주세요.')
    //   return false
    // }

    // if (id.length > 20) {
    //   alert('ID는 20글자까지 허용됩니다. 현재 글자수 : ' + id.length)
    //   return false
    // } else if (pw.length < 3) {
    //   alert('패스워드는 3글자 이상으로 설정해주세요.')
    //   return false
    // } else if (!check.test(age)) {
    //   alert('나이는 숫자로 입력해주세요.')
    //   return false
    // } else if (check.test(sex)) {
    //   alert('성별은 문자로 입력해주세요.')
    //   return false
    // }
  }

  function submitRegister() {



    valueCheck()

    const param = {
      id: id,
      pw: pw,
      age: age,
      sex: sex,
      nickName: nickName,
      club: club,
    }

    util.doReqPost('http://localhost:3001/register', param).then(result => {
      if (result.resultMsg === 'success') {
        setIdAdded(true)
        alert('회원 가입 완료! 로그인 해주시기 바랍니다.')
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
      <div className={styles.textBoxWrap}>
        {!idAdded && inputInfo?.map((ele, idx) =>
            <input key = {ele.ref+idx}
              type="text"
              placeholder={ele.placeholder}
              ref={ele.ref}
              className={styles.textBox}
            />
        )}
        <button onClick={submitRegister} className={styles.RegisterBtn}>
          가입하기
        </button>
      </div>
    </>
  )
}
