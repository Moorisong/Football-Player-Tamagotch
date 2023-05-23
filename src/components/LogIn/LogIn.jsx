import styles from './LogIn.module.css'
import { useState } from 'react'
import { doReqPost } from '../../Util/Api'
import { useNavigate } from 'react-router'
import styled from 'styled-components'
import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

let SubmitBtn = styled.button`
  background-color: ${props => props.bg};
  color: ${props => props.color};
  width: 84%;
  height: 3.5rem;
  margin: auto;
  position: relative;
  top: 4.5rem;
  right: 0.6rem;
  border-radius: 4px;
  font-size: 1.7rem;
  font-weight: 500;
`

let InputTitleText = styled.p`
  font-size: 12px;
  position: relative;
  top: 1rem;
  left: 0.4rem;
  color: ${props => props.color}
`

let Input = styled.input`
  width: 90%;
  height: 3.5rem;
  display: block;
  background-color: #fcfcfc;
  border: 1px solid #eeeeee;
  border-radius: 4px;
  padding-left: 3rem;
  border-bottom: ${props => props.borderbottom}
`

export default function LogIn() {
  const navigate = useNavigate()
  const [loginState, setLoginState] = useState(false)
  const [valCheckState, setValCheckState] = useState(false)
  let [loginInfo, setLoginInfo] = useState([
    {
      name: 'id',
      value: '',
    },
    {
      name: 'pw',
      value: '',
    },
  ])

  function valueCheck() {
    const id = loginInfo[0].value
    const pw = loginInfo[1].value

    if (!id || !pw) {
      return alert('모든 항목을 입력해주세요.')
    }
    if (id.length > 20) {
      return alert(`ID는 20글자까지 허용됩니다. 현재 글자수 : ${id.length}`)
    }
    if (pw.length < 3) {
      return alert('패스워드는 3글자 이상으로 설정해주세요.')
    }

    // 유효성 검사 통과되면 valCheckState 스테이트 변경
    setValCheckState(true)
  }

  function submitLogIn() {
    const param = {
      id: loginInfo[0].value,
      pw: loginInfo[1].value,
    }

    // Submit 전에 유효성 검사 진행
    valueCheck()

    if (valCheckState) {
      doReqPost('http://localhost:3001/logIn', param).then(result => {
        if (result.resultMsg === 'logIn_success') {
          setLoginState(true)
          alert('로그인 완료!')
          return navigate('/Main')
        }

        if (result.resultMsg === 'notFoundID') {
          return alert('일치하는 ID가 없습니다.')
        }

        if (result.resultMsg === 'notFoundPw')
          alert('비밀번호를 다시 입력해주세요.')

        if (result.resultMsg === 'internal error') {
          alert('에러가 발생하였습니다')
          console.log('Error---->', result.errorMsg)
        }
      })
    }
  }

  return (
    <div className={styles.bobyContainer}>
      <div className={styles.card}>
        <div className={styles.cardContainer}>
          <p>Log in</p>
          {!loginState &&
            loginInfo?.map((ele, idx) => (
              <div className={styles.inputWrap} key={idx}>
                <InputTitleText
                  color={
                    ele.value ? '#3058C0' : '#535353'
                  }>
                  {ele.name === 'id' ? 'ID' : 'Password'}
                </InputTitleText>
                {ele.name === 'id' ? (
                  <FaceOutlinedIcon
                    fontSize="medium"
                    className={styles.inputIcon}
                  />
                ) : (
                  <LockOutlinedIcon
                    fontSize="medium"
                    className={styles.inputIcon}
                  />
                )}
                <Input
                  onChange={e => {
                    let copy = [...loginInfo]
                    copy[idx].value = e.target.value
                    setLoginInfo(copy)
                  }}
                  borderbottom={
                    ele.value ? '2.5px solid #3058C0' : '1px solid #eeeeee'
                  }
                 />
              </div>
            ))}

          {!loginState && (
            <SubmitBtn
              onClick={() => {
                submitLogIn()
              }}
              bg={
                loginInfo[0].value || loginInfo[1].value ? '#3058C0' : '#e8e9eb'
              }
              color={
                loginInfo[0].value || loginInfo[1].value ? '#fff' : '#a7a7a7'
              }>
              Log in
            </SubmitBtn>
          )}
        </div>

        {/* {!loginState && (
          <button
            onClick={() => {
              return navigate('/Register')
            }}
            className={styles.submitBtn}>
            가입하기
          </button>
        )} */}
      </div>
    </div>
  )
}
