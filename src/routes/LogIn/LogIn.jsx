import styles from './LogIn.module.css'
import { useEffect, useState } from 'react'
import { doReqPost } from '../../Util/Api'
import { useNavigate } from 'react-router'

import styled from 'styled-components'
import { ApplyBtn } from '../../components/Bottons'
import { Input, TextWithInput } from '../../components/Input'

import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi'

export default function LogIn() {
  const navigate = useNavigate()
  const [loginState, setLoginState] = useState(false)
  const [valCheckState, setValCheckState] = useState([false, ''])
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

  function getStyledCpnInfo(value) {
    // console.log('value---', value)
    return {
      TextWithInput_1: {
        color: value === '' ? '#535353' : '#3058C0',
        fontSize: '12px',
        top: '1rem',
        right: '0',
        bottom: '0',
        left: '0',
      },
      TextWithInput_2: {
        color: 'red',
        fontSize: '12px',
        top: '1rem',
        right: '0',
        bottom: '0',
        left: '0',
      },
      Input: {
        width: '90%',
        height: '3.5rem',
        display: 'block',
        background_color: '#fcfcfc',
        border: '1px solid #eeeeee',
        border_radius: '4px',
        padding: '0 0 0 3rem',
        border_bottom: value
          ? '2.5px solid #3058C0'
          : '1px solid #eeeeee',
      },
      // ApplyBtn: {
      //   bg:
      //     value[0] || value[1]
      //       ? '#3058C0'
      //       : '#e8e9eb',
      //   color:
      //   value[0] || value[1] ? '#fff' : '#a7a7a7',
      //   width: '84%',
      //   height: '3.5rem',
      //   top: '4.5rem',
      //   left: '0',
      //   right: '0.6rem',
      //   bottom: '0',
      //   fontSize: '1.7rem',
      //   fontWeight: '500',
      // }
    }
  }

  function valueCheck() {
    const id = loginInfo[0].value
    const pw = loginInfo[1].value

    if (!id || !pw) {
      setValCheckState([false, '모든 항목을 작성해주세요!!'])
      return
    }
    if (id.length > 20) {
      return setValCheckState([
        false,
        `ID는 20글자까지 허용됩니다. 현재 글자수 : ${id.length}`,
      ])
    }
    if (pw.length < 3) {
      return setValCheckState([
        false,
        '비밀번호는 3글자 이상으로 설정해주세요.',
      ])
    }

    // 유효성 검사 통과되면 valCheckState 스테이트 변경
    setValCheckState([true, ''])
  }

  function submitLogIn() {
    const param = {
      id: loginInfo[0].value,
      pw: loginInfo[1].value,
    }

    // Submit 전에 유효성 검사 진행
    valueCheck()
    console.log('r--> ', valCheckState[1])

    if (valCheckState[0]) {
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
                <TextWithInput
                  info={getStyledCpnInfo(ele.value).TextWithInput_1}>
                  {ele.name === 'id' ? 'ID' : 'Password'}
                </TextWithInput>
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
                  info={getStyledCpnInfo(ele.value).Input}
                />
                {valCheckState[1].indexOf('모든') > -1 && !ele.value ? (
                  <div>
                    <TextWithInput
                      info={getStyledCpnInfo().TextWithInput_2}
                      style={{ display: 'inline-block' }}>
                      {valCheckState[1]}
                    </TextWithInput>
                  </div>
                ) : (valCheckState[1].indexOf('id') > -1 &&
                    ele.name === 'id') ||
                  (valCheckState[1].indexOf('비밀번호') > -1 &&
                    ele.name === 'pw') ? (
                  <div>
                    <TextWithInput
                      info={getStyledCpnInfo().TextWithInput_2}
                      style={{ display: 'inline-block' }}>
                      {valCheckState[1]}
                    </TextWithInput>
                  </div>
                ) : null}
              </div>
            ))}

          {!loginState && (
            <ApplyBtn
              onClick={() => {
                submitLogIn()
              }}
              // info={getStyledCpnInfo([loginInfo[0].value, loginInfo[1].value]).ApplyBtn}>

              info={{
                bg:
                loginInfo[0].value || loginInfo[1].value
                    ? '#3058C0'
                    : '#e8e9eb',
                color:
                loginInfo[0].value || loginInfo[1].value ? '#fff' : '#a7a7a7',
                width: '84%',
                height: '3.5rem',
                top: '4.5rem',
                left: '0',
                right: '0.6rem',
                bottom: '0',
                fontSize: '1.7rem',
                fontWeight: '500',
              }}>

              Log in
            </ApplyBtn>
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
