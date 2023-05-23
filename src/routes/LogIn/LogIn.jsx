import cx from 'classnames'
import styles from './LogIn.module.css'
import { useMemo, useState } from 'react'
import { doReqPost } from '../../Util/Api'
import { useNavigate } from 'react-router'

import FaceOutlinedIcon from '@mui/icons-material/FaceOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import SportsKabaddiIcon from '@mui/icons-material/SportsKabaddi'
import { styled } from '@mui/system'

export default function LogIn() {
  const navigate = useNavigate()
  const [id, setId] = useState('')
  const [pw, setPw] = useState('')

  const invailidMsg = useMemo(() => {
    if (!id || !pw) return '다 써라'
    if (id.lenth <= 20) return '20자 이하로'
    if (pw.length < 3) return '3자 이상 써라'
    return ''
  }, [id, pw])

  function submitLogIn() {
    if (invailidMsg) return alert(invailidMsg)

    const param = {
      id: id,
      pw: pw,
    }

    doReqPost('http://localhost:3001/logIn', param).then(result => {
      if (result.resultMsg === 'logIn_success') {
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

  return (
    <div className={styles.bobyContainer}>
      <div className={styles.card}>
        <div className={styles.cardContainer}>
          <p>Log in</p>

          <div className={styles.inputWrap}>
            <p> ID</p>
            <input type="text" onChange={e => setId(e.target.value)} />
          </div>
          <div className={styles.inputWrap}>
            <p> PW</p>
            <input type="password" onChange={e => setPw(e.target.value)} />
          </div>

          <button
            className={cx(styles.applyBtn, { [styles.invalid]: invailidMsg })}
            type="button"
            onClick={submitLogIn}>
            Log In
          </button>
        </div>
      </div>
    </div>
  )
}
