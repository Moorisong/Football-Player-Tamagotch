import cx from 'classnames'
import styles from './LogIn.module.css'

import { useMemo, useState } from 'react'
import { doReqPost } from '../../Util/Api'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

export default function LogIn() {
  const nav = useNavigate()
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')

  const invailidMsg = useMemo(() => {
    let errorMsg = {
      id: '',
      pw: '',
    }

    if (id && !pw) errorMsg.pw = '비밀번호를 입력해주세요.'
    if (!id && pw) errorMsg.id = 'ID를 입력해주세요.'
    if (id.length > 20) errorMsg.id = 'ID는 20자 이하로 입력해주세요.'
    if (pw && pw.length < 3)
      errorMsg.pw = '비밀번호는 3자 이상으로 입력해주세요.'

    if (!id && !pw) return errorMsg
    if (!errorMsg.id && !errorMsg.pw) return false
    return errorMsg
  }, [id, pw])

  function submitLogIn() {
    const param = { id, pw }

    doReqPost('http://localhost:3001/logIn', param).then(result => {
      if (
        result.resultMsg === 'notFoundID' ||
        result.resultMsg === 'notFoundPw'
      )
        return alert('ID나 비밀번호가 올바르지 않습니다.')
      if (result.resultMsg === 'logIn_success') return nav('/main')
      if (result.errorCode === 'internal error') alert('에러가 발생하였습니다')
    })
  }

  return (
    <div className={styles.bodyContainer}>
      <Link className={styles.registerBtn} to='/register'>가입하기</Link>
      <div className={styles.card}>
        <div className={styles.cardContainer}>
          <p>로그인</p>

          <div className={styles.inputWrap}>
            <p>아이디</p>
            <FaceOutlinedIcon className={styles.inputIcon} />
            <input
              type="text"
              onChange={e => setId(e.target.value)}
              className={cx(styles.logInInput, {
                [styles.inputBorderActive]: id,
              })}
            />
            {invailidMsg.id && (
              <p className={styles.inputTextUnder}> {invailidMsg.id} </p>
            )}
          </div>
          <div className={styles.inputWrap}>
            <p>비밀번호</p>
            <LockOutlinedIcon className={styles.inputIcon} />
            <input
              type="password"
              onChange={e => setPw(e.target.value)}
              className={cx(styles.logInInput, {
                [styles.inputBorderActive]: pw,
              })}
            />
            {invailidMsg.pw && (
              <p className={styles.inputTextUnder}> {invailidMsg.pw} </p>
            )}
          </div>

          <button
            className={cx(styles.applyBtn, {
              [styles.applyBtnInvalid]: invailidMsg,
            })}
            type="button"
            onClick={submitLogIn}>
            로그인 하기
          </button>
        </div>
      </div>
    </div>
  )
}
