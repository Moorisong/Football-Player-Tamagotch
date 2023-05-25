import cx from 'classnames'
import styles from './LogIn.module.css'
import { useMemo, useState } from 'react'
import { doReqPost } from '../../Util/Api'
import { useNavigate } from 'react-router'

import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'


export default function LogIn() {
  const navigate = useNavigate()
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')

  const invailidMsg = useMemo(() => {
    if (!id && !pw) return 'none'
    if (id && !pw) return '비밀번호를 입력해주세요.'
    if (!id && pw) return 'ID를 입력해주세요.'
    if (id.length > 20) return 'ID는 20자 이하로 생성 가능합니다.'
    if (pw.length < 3) return '비밀번호는 3자 이상으로 설정해주세요.'
    return ''
  }, [id, pw])

  function submitLogIn() {

    const param = {
      id: id,
      pw: pw,
    }

    doReqPost('http://localhost:3001/logIn', param).then(result => {

      if (result.resultMsg === 'notFoundID' || result.resultMsg === 'notFoundPw') return alert('ID나 비밀번호가 올바르지 않습니다.')
      if (result.resultMsg === 'logIn_success') return navigate('/main')
      if (result.errorCode === 'internal error') {
        alert('에러가 발생하였습니다')
        return console.log('Error--> ', result.errorCode)
      }
    })
  }

  return (
    <div className={styles.bobyContainer}>
      <div className={styles.card}>
        <div className={styles.cardContainer}>
          <p>Log in</p>

          <div className={styles.inputWrap}>
            <p> ID</p>
            <FaceOutlinedIcon className={styles.inputIcon} />
            <input type="text" onChange={e => setId(e.target.value)} className={cx(styles.input, {[styles.inputBorderActive]: id}) } />
            { invailidMsg.indexOf('ID') > -1 && <p className={styles.inputTextUnder}> {invailidMsg} </p> }

          </div>
          <div className={styles.inputWrap}>
            <p> PW</p>
            <LockOutlinedIcon className={styles.inputIcon} />
            <input type="password" onChange={e => setPw(e.target.value)} className={cx(styles.input, {[styles.inputBorderActive]: pw}) }  />
            { invailidMsg.indexOf('비밀번호') > -1 && <p className={styles.inputTextUnder}> {invailidMsg} </p> }

          </div>

          <button
            className={cx(styles.applyBtn, { [styles.applyBtnInvalid]: invailidMsg })}
            type="button"
            onClick={submitLogIn}>
            Log In
          </button>
        </div>
      </div>
    </div>
  )
}
