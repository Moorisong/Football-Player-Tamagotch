import styles from './Register.module.css'
import { useMemo, useState } from 'react'
import * as util from '../../Util/Api'
import { useNavigate } from 'react-router'

export default function Register() {
  const [idAdded, setIdAdded] = useState(false)
  const nav = useNavigate()

  const [inputInfo, setInputInfo] = useState([
    {
      name: 'id',
      value: ''
    },
    {
      name: 'pw',
      value: ''
    },
    {
      name: 'age',
      value: ''
    },
    {
      name: 'sex',
      value: ''
    },
    {
      name: 'nickName',
      value: ''
    },
    {
      name: 'club',
      value: ''
    },
  ])

  const invailidMsg = useMemo(() => {
    let obj = {
      id: '',
      pw: '',
      age: '',
      sex: ''
    }
    let check = /^[0-9]+$/
    const emptyIdx = inputInfo.findIndex((e) => e.value === '')

    if (emptyIdx > -1) return '모든 항목을 입력해주세요.'

    inputInfo.forEach((ele) => {
      const val = ele.value

      if (ele.name === 'id' && val.length > 20) obj.id = 'ID는 20글자까지 허용됩니다';
      if (ele.name === 'pw' && val.length < 3) obj.pw = '패스워드는 3글자 이상으로 설정해주세요.';
      if (ele.name === 'age' && !check.test(val)) obj.age = '나이는 숫자로 입력해주세요.';
      if (ele.name === 'sex' && check.test(val)) obj.sex = '성별은 문자로 입력해주세요.';
    })
    return obj;

  })

  console.log('invailidMsg--> ', invailidMsg)

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
        nav('/LogIn')

      } else if (result.resultMsg === 'duplicated ID') {
        alert('이미 존재하는 ID입니다.')
        return false
      } else {
        alert('에러가 발생하였습니다')
        console.log('Error---->', result.errorMsg)
      }
    })
  }

  function clickCancleBtn() {
    return nav('/LogIn')
  }

  return (
    <div className={styles.bobyContainer}>

      <div className={styles.card}>
        <div className={styles.cardContainer}>
          <p>Sign up</p>
          <div className={styles.inputWrap}>

            {
              !idAdded && inputInfo?.map((ele, idx) =>
                <div key={idx}>
                  <p>{ele.name}</p>
                  <input
                    type="text"
                    placeholder={ele.placeholder}
                    onChange={(e) => {
                      let copy = [...inputInfo]
                      copy[idx].value = e.target.value
                      return setInputInfo(copy)
                    }}
                  />
                </div>
              )
            }
          </div>
          {!idAdded && <button onClick={submitRegister} className={styles.applyBtn}>
            Sign up
          </button>}
        </div>
      </div>
    </div>
  )
}
