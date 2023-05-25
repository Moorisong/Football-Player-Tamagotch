import styles from './Register.module.css'
import { useMemo, useState } from 'react'
import * as util from '../../Util/Api'
import { useNavigate } from 'react-router'
import cx from 'classnames'

export default function Register() {
  const [idAdded, setIdAdded] = useState(false)
  const nav = useNavigate()

  const [inputInfo, setInputInfo] = useState([
    {
      name: 'id',
      value: '',
      inputName: 'ID'
    },
    {
      name: 'pw',
      value: '',
      inputName: 'PW'
    },
    {
      name: 'age',
      value: '',
      inputName: 'Age'
    },
    {
      name: 'sex',
      value: '',
      inputName: 'Gender'
    },
    {
      name: 'nickName',
      value: '',
      inputName: 'Nickname'
    },
    {
      name: 'club',
      value: '',
      inputName: 'Club'
    },
  ])

  const invailidMsg = useMemo(() => {
    let obj = {
      id: '',
      pw: '',
      age: '',
      sex: '',
      nick: '',
      club: '',
      invalid: true
    }
    let check = /^[0-9]+$/
    const emptyIdx = inputInfo.findIndex((e) => e.value === '')

    if (emptyIdx > -1) obj[inputInfo[emptyIdx].name] = '모든 항목을 입력해주세요.'

    inputInfo.forEach((ele) => {
      const val = ele.value
      if (ele.name === 'id' && val.length > 20) obj.id = 'ID는 20글자까지 허용됩니다';
      if (ele.name === 'pw' && val.length < 3) obj.pw = '패스워드는 3글자 이상으로 설정해주세요.';
      if (ele.name === 'age' && !check.test(val)) obj.age = '나이는 숫자로 입력해주세요.';
      if (ele.name === 'sex' && check.test(val)) obj.sex = '성별은 문자로 입력해주세요.';
    })

    for(const v of Object.values(obj)){
      if(v==='') obj.invalid = false
    }
    return obj;

  })

  function submitRegister() {
    const param = {
      id: inputInfo[0].value,
      pw: inputInfo[1].value,
      age: inputInfo[2].value,
      sex: inputInfo[3].value,
      nickName: inputInfo[4].value,
      club: inputInfo[5].value
    }

    util.doReqPost('http://localhost:3001/register', param).then(result => {
      if (result.resultMsg === 'success') {
        setIdAdded(true)
        alert('회원 가입 완료! 로그인 해주시기 바랍니다.')
        return nav('/LogIn')
      }
      if (result.resultMsg === 'duplicated ID') return alert('이미 존재하는 ID입니다.')
      if(result.resultMsg === 'internal error') return alert('에러가 발생하였습니다.')
    })
  }

  return (
    <div className={styles.bodyContainer}>
      <button className={styles.cancelBtn} onClick={()=>{ nav('/login') }}>Cancel</button>

      <div className={styles.card}>
        <div className={styles.cardContainer}>
          <p>Sign up</p>
          <div className={styles.inputWrap}>

            {
              !idAdded && inputInfo?.map((ele, idx) =>
                <div key={idx} className={styles.inputWrap}>
                  <p>{ele.inputName}</p>
                  <input
                    type='text'
                    className={cx({[styles.inputBorderActive]: ele.value })}
                    onChange={(e) => {
                      let copy = [...inputInfo]
                      copy[idx].value = e.target.value
                      return setInputInfo(copy)
                    }}
                  />
                  <p className={styles.inputTextUnder}>{invailidMsg[ele.name]}</p>
                </div>
              )
            }
          </div>
          {!idAdded && <button onClick={submitRegister} className={cx(styles.applyBtn, { [styles.applyBtnInvalid]: invailidMsg.invalid })} >

            Sign up
          </button>}
        </div>
      </div>
    </div>
  )
}
