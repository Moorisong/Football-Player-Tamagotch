import styles from './LogOut.module.css'
import * as util from '../../Util/Api'
import { useNavigate } from 'react-router'

export default function LogOut() {
  const nav = useNavigate()

  function submitLogOut() {
    const param = {
      // id 값 넣어주기 --- ksh
      id: 'lim',
    }
      util.doReqPost('http://localhost:3001/logOut', param).then(result => {
        if (result.resultMsg === 'logOut_success') {
          alert('로그아웃 되었습니다.')
          nav('/LogIn')
        }else {
          alert('에러가 발생하였습니다')
          console.log('Error---->', result.errorMsg)
        }
      })
  }

  return (
    <>
      <button onClick={submitLogOut} className={styles.submitBtn}>
        로그아웃하기
      </button>



    </>
  )
}
