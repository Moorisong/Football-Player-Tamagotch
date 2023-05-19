import styles from './LogIn.module.css'
import { useState } from 'react'
import { doReqPost } from '../../Util/Api'
import { useNavigate } from 'react-router'

export default function LogIn() {

  const navigate = useNavigate()
  const [loginState, setLoginState] = useState(false)
  const [valCheckState, setValCheckState] = useState(false)
  let [loginInfo, setLoginInfo] = useState([
    {
      name: 'id',
      placeholder: 'ID 입력',
      value: ''
    },
    {
      name: 'pw',
      placeholder: 'PW 입력',
      value: ''
    },
  ])

  function valueCheck () {
    loginInfo.forEach((e) => {
      if(e.value === '') alert('모든 항목을 입력해주세요.')
      else if(e.name === 'id' && e.value.length > 20) alert('ID는 20글자까지 허용됩니다. 현재 글자수 : ' + e.val.length)
      else if(e.name === 'pw' && e.value.length < 3) alert('패스워드는 3글자 이상으로 설정해주세요.')
      else return setValCheckState(true)

      // ksh --- 항목 하나 안적고 로그인하기 클릭 -> 패스워드 3글자 안되게 입력 -> 경고창 한번 뜨고 로그인 실행됨, 로그인 실행되면 안됨
    })
  }

  function submitLogIn() {
    const param = {
      id: loginInfo[0].value,
      pw: loginInfo[1].value
    }

    setLoginState(valueCheck())

    if(valCheckState){

      doReqPost('http://localhost:3001/logIn', param).then(result => {
        if (result.resultMsg === 'logIn_success') {
          setLoginState(true)
          alert('로그인 완료!')
          return navigate('/Main')
        }

        if(result.resultMsg === 'notFoundID') alert('일치하는 ID가 없습니다.')
        else if(result.resultMsg === 'notFoundPw') alert('비밀번호를 다시 입력해주세요.')
        else{
          alert('에러가 발생하였습니다')
          console.log('Error---->', result.errorMsg)
        }

      })
    }
  }

  function clickRgisterBtn(){
    return navigate('/Register')
  }

  return (
    <>
      <p>로그인 페이지</p>
      <div className={styles.textBoxWrap}>
        {!loginState && loginInfo?.map((ele, idx) =>
          <input key = {ele.ref+idx}
            type="text"
            placeholder={ele.placeholder}
            className={styles.textBox}
            onChange={(e)=>{
              let copy = [...loginInfo]
              copy[idx].value = e.target.value
              setLoginInfo(copy)
            }}
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
