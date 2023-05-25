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
    let obj = {
      id: '',
      pw: ''
    }
    if (!id && !pw) { obj.id = ''; obj.pw = '' }
    if (id && !pw) obj.pw = '비밀번호를 입력해주세요.'
    if (!id && pw) obj.id = 'ID를 입력해주세요.'
    if (id.length > 20) obj.id = 'ID는 20자 이하로 입력해주세요.'
    if (pw && pw.length < 3) obj.pw = '비밀번호는 3자 이상으로 입력해주세요.'

    if (!obj.id && !obj.pw) return false
    return obj
  }, [id, pw])

  function submitLogIn() {

    const param = { id, pw }

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
          <p>Sign in</p>

          <div className={styles.inputWrap}>
            <p>ID</p>
            <FaceOutlinedIcon className={styles.inputIcon} />
            <input type="text" onChange={e => setId(e.target.value)} className={cx(styles.input, { [styles.inputBorderActive]: id })} />
            {invailidMsg.id && <p className={styles.inputTextUnder}> {invailidMsg.id} </p>}

          </div>
          <div className={styles.inputWrap}>
            <p>PW</p>
            <LockOutlinedIcon className={styles.inputIcon} />
            <input type="password" onChange={e => setPw(e.target.value)} className={cx(styles.input, { [styles.inputBorderActive]: pw })} />
            {invailidMsg.pw && <p className={styles.inputTextUnder}> {invailidMsg.pw} </p>}

          </div>

          <button
            className={cx(styles.applyBtn, { [styles.applyBtnInvalid]: invailidMsg })}
            type="button"
            onClick={submitLogIn}>
            Sign in
          </button>
        </div>
      </div>
    </div>
  )
}
