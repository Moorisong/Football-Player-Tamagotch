import styles from './Register.module.css'
import { useMemo, useState } from 'react'
import * as util from '../../Util/Api'
import { useNavigate } from 'react-router'
import cx from 'classnames'

export default function Register() {
  const nav = useNavigate()

  const [idAdded, setIdAdded] = useState(false)
  const [genderClicked, setGenderClicked] = useState('')
  const [formData, setFormData] = useState([
    {
      name: 'id',
      value: '',
    },
    {
      name: 'pw',
      value: '',
    },
    {
      name: 'age',
      value: '',
    },
    {
      name: 'gender',
      value: '',
    },
    {
      name: 'nickName',
      value: '',
    },
    {
      name: 'club',
      value: '',
    },
    {
      name: 'pw_2',
      value: '',
    },
  ])

  const invailidMsg = useMemo(() => {
    let obj = {
      id: '',
      pw: '',
      pw_2: '',
      age: '',
      gender: '',
      nick: '',
      club: '',
      invalid: true,
    }
    const emptyIdx = formData.findIndex(e => e.value === '')
    const ageRexStr = /^\d{8}$/

    if (emptyIdx > -1)
      obj[formData[emptyIdx].name] = '모든 항목을 입력해주세요.'

    if (formData[0].value > 20) obj.id = 'ID는 20글자까지 허용됩니다'
    if (formData[1].value.length < 3)
      obj.pw = '비밀번호는 3글자 이상으로 설정해주세요.'
    if (formData[6].value.length > 2 && formData[6].value !== formData[1].value)
      obj.pw_2 = '입력한 비밀번호와 일치하지 않습니다.'
    if (!ageRexStr.test(formData[2].value))
      obj.age = '생년월일을 숫자 8자로 입력해주세요.'
    let num = 0

    Object.values(obj).forEach((e, i) => {
      if (!e) num += 1
    })
    if (num === 7) obj.invalid = false
    return obj
  })

  const clubInfo = [
    {
      name: '선택하기',
      value: '',
    },
    {
      name: 'FC 바르셀로나',
      value: 'FC Barcelona',
    },
    {
      name: '레알 마드리드',
      value: 'Real Madrid',
    },
    {
      name: '세비야 FC',
      value: 'Sevilla FC',
    },
    {
      name: '발렌시아',
      value: 'Valencia CF',
    },
    {
      name: '맨유',
      value: 'Manchester United',
    },
    {
      name: '맨시티',
      value: 'Manchester City',
    },
    {
      name: '첼시',
      value: 'Chelsea FC',
    },
    {
      name: '아스날',
      value: 'Arsenal FC',
    },
    {
      name: '바이에른 뮌헨',
      value: 'Bayern Munchen',
    },
    {
      name: '인터 밀란',
      value: 'Inter Milan',
    },
    {
      name: '유벤투스',
      value: 'Juventus',
    },
    {
      name: 'AC 밀란',
      value: 'AC Milan',
    },
  ]

  function submitRegister() {
    const param = {
      id: formData[0].value,
      pw: formData[1].value,
      age: formData[2].value,
      sex: formData[3].value,
      nickName: formData[4].value,
      club: formData[5].value,
    }

    util.doReqPost('http://localhost:3001/register', param).then(result => {
      if (result.resultMsg === 'success') {
        setIdAdded(true)
        alert('회원 가입 완료! 로그인 해주시기 바랍니다.')
        return nav('/LogIn')
      }
      if (result.resultMsg === 'duplicated ID')
        return alert('이미 존재하는 ID입니다.')
      if (result.errorCode === 'internal error')
        return alert('에러가 발생하였습니다.')
    })
  }

  return (
    <div className={styles.bodyContainer}>
      <button
        className={styles.cancelBtn}
        onClick={() => {
          nav('/login')
        }}>
        로그인 하기
      </button>

      <div className={styles.card}>
        <div className={styles.cardContainer}>
          <p>회원가입</p>
          <div className={styles.inputWrap}>
            <div className={styles.inputWrap}>
              <input
                placeholder="아이디"
                type="text"
                className={cx(styles.registerInput, {
                  [styles.inputBorderActive]: formData[0].value,
                })}
                onChange={e => {
                  let copy = [...formData]
                  copy[0].value = e.target.value
                  return setFormData(copy)
                }}
              />
              <p className={styles.inputTextUnder}>{invailidMsg['id']}</p>
            </div>

            <div className={styles.inputWrap}>
              <input
                placeholder="비밀번호"
                type="password"
                className={cx(styles.registerInput, {
                  [styles.inputBorderActive]: formData[1].value,
                })}
                onChange={e => {
                  let copy = [...formData]
                  copy[1].value = e.target.value
                  return setFormData(copy)
                }}
              />
              <p className={styles.inputTextUnder}>{invailidMsg['pw']}</p>
            </div>

            <div className={styles.inputWrap}>
              <input
                placeholder="비밀번호 재입력"
                type="password"
                className={cx(styles.registerInput, {
                  [styles.inputBorderActive]: formData[6].value,
                })}
                onChange={e => {
                  let copy = [...formData]
                  copy[6].value = e.target.value
                  return setFormData(copy)
                }}
              />
              <p className={styles.inputTextUnder}>{invailidMsg['pw_2']}</p>
            </div>

            <div className={styles.inputWrap}>
              <input
                placeholder="생년월일 8자리"
                type="text"
                className={cx(styles.registerInput, {
                  [styles.inputBorderActive]: formData[2].value,
                })}
                onChange={e => {
                  let copy = [...formData]
                  copy[2].value = e.target.value
                  return setFormData(copy)
                }}
                onBlur={e => {
                  const numToStr = e.target.value.toString()

                  let arr = numToStr.split('')
                  arr.splice(4, 0, '.')
                  arr.splice(7, 0, '.')

                  const result = arr.join('')

                  if (invailidMsg['age'] === '') e.target.value = result
                }}
              />
              <p className={styles.inputTextUnder}>{invailidMsg['age']}</p>
            </div>

            <div className={styles.inputWrap}>
              <input
                placeholder="닉네임"
                type="text"
                className={cx(styles.registerInput, {
                  [styles.inputBorderActive]: formData[4].value,
                })}
                onChange={e => {
                  let copy = [...formData]
                  copy[4].value = e.target.value
                  return setFormData(copy)
                }}
              />
            </div>

            <div
              className={`${styles.inputWrap} ${styles.marginTop}`}
              style={{ display: 'inline-block' }}>
              <span>성별 선택 |</span>
              <ul>
                <li>
                  <input
                    type="radio"
                    id="gender1"
                    value="m"
                    onClick={e => {
                      setGenderClicked('m')
                      let copy = [...formData]
                      copy[3].value = e.target.value
                      return setFormData(copy)
                    }}
                  />
                  <label
                    htmlFor="gender1"
                    className={cx(styles.inputLabel, {
                      [styles.labelClicked]:
                        genderClicked === 'm' ? true : false,
                    })}></label>
                  <span>남자</span>
                </li>
                <li>
                  <input
                    type="radio"
                    id="gender2"
                    value="f"
                    onClick={e => {
                      setGenderClicked('f')
                      let copy = [...formData]
                      copy[3].value = e.target.value
                      return setFormData(copy)
                    }}
                  />
                  <label
                    htmlFor="gender2"
                    className={cx(styles.inputLabel, {
                      [styles.labelClicked]:
                        genderClicked === 'f' ? true : false,
                    })}></label>
                  <span>여자</span>
                </li>
              </ul>
            </div>

            <div className={styles.selectWrap}>
              <span>구단 선택 |</span>
              <select
                className={cx(styles.clubSelect, {
                  [styles.noneSelected]: !formData[5].value,
                })}
                name="favoriteClub"
                id="favoriteClub"
                onChange={e => {
                  let copy = [...formData]
                  copy[5].value = e.target.value
                  return setFormData(copy)
                }}>
                {clubInfo.map((c, i) => {
                  return (
                    <option value={c.value} key={i}>
                      {c.name}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
          {!idAdded && (
            <button
              onClick={submitRegister}
              className={cx(styles.applyBtn, {
                [styles.applyBtnInvalid]: invailidMsg.invalid,
              })}>
              가입하기
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
