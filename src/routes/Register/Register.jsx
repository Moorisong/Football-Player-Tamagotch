import styles from './Register.module.css'
import { useMemo, useState } from 'react'
import * as util from '../../Util/Api'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import cx from 'classnames'

export default function Register() {
  const nav = useNavigate()

  const [idAdded, setIdAdded] = useState(false)
  const [formData, setFormData] = useState({
    id: {
      name: 'id',
      value: '',
    },

    pw: {
      name: 'pw',
      value: '',
    },
    pw_2: {
      name: 'pw_2',
      value: '',
    },
    age: {
      name: 'age',
      value: '',
    },
    gender: {
      name: 'gender',
      value: '',
    },
    nickName: {
      name: 'nickName',
      value: '',
    },
    club: {
      name: 'club',
      value: '',
    },
  })

  console.log('formData---> ', formData)
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
    // const emptyIdx = formData.findIndex(e => e.value === '')
    // const ageRexStr = /^\d{8}$/

    // if (emptyIdx > -1)
    //   obj[formData[emptyIdx].name] = '모든 항목을 입력해주세요.'

    // if (formData[0].value > 20) obj.id = 'ID는 20글자까지 허용됩니다'
    // if (formData[1].value.length < 3)
    //   obj.pw = '비밀번호는 3글자 이상으로 설정해주세요.'
    // if (formData[6].value.length > 2 && formData[6].value !== formData[1].value)
    //   obj.pw_2 = '입력한 비밀번호와 일치하지 않습니다.'
    // if (!ageRexStr.test(formData[2].value)) obj.age = '생년월일을 선택해주세요.'
    let num = 0

    Object.values(obj).forEach(e => {
      if (!e) num += 1
    })
    if (num === 7) obj.invalid = false
    return obj
  })

  function submitRegister() {
    const param = {
      id: formData.id.value,
      pw: formData.pw.value,
      age: formData.age.value,
      sex: formData.gender.value,
      nickName: formData.nickName.value,
      club: formData.club.value,
    }

    util.doReqPost('http://localhost:3001/register', param).then(result => {
      if (result.resultMsg === 'success') {
        setIdAdded(true)
        alert('회원 가입 완료! 로그인 해주시기 바랍니다.')
        return nav('/logIn')
      }
      if (result.resultMsg === 'duplicated ID')
        return alert('이미 존재하는 ID입니다.')
      if (result.errorCode === 'internal error')
        return alert('에러가 발생하였습니다.')
    })
  }

  return (
    <div className={styles.bodyContainer}>
      <Link className={styles.cancelBtn} to="/login">
        로그인 하기
      </Link>

      <div className={styles.card}>
        <div className={styles.cardContainer}>
          <p>회원가입</p>
          <div className={styles.inputWrap}>
            <div className={styles.inputWrap}>
              <input
                placeholder="아이디"
                type="text"
                className={cx(styles.registerInput, {
                  [styles.inputBorderActive]: formData.id.value,
                })}
                onChange={e => {
                  const targetVal = e.currentTarget.value
                  setFormData(prev => ({
                    ...prev,
                    id: {
                      ...prev.id,
                      value: targetVal,
                    },
                  }))
                }}
              />
              <p className={styles.inputTextUnder}>{invailidMsg.id}</p>
            </div>

            <div className={styles.inputWrap}>
              <input
                placeholder="비밀번호"
                type="password"
                className={cx(styles.registerInput, {
                  [styles.inputBorderActive]: formData.pw.value,
                })}
                onChange={e => {
                  const targetVal = e.currentTarget.value
                  setFormData(prev => ({
                    ...prev,
                    pw: {
                      ...prev.pw,
                      value: targetVal,
                    },
                  }))
                }}
              />
              <p className={styles.inputTextUnder}>{invailidMsg['pw']}</p>
            </div>

            <div className={styles.inputWrap}>
              <input
                placeholder="비밀번호 재입력"
                type="password"
                className={cx(styles.registerInput, {
                  [styles.inputBorderActive]: formData.pw_2.value,
                })}
                onChange={e => {
                  const targetVal = e.currentTarget.value
                  setFormData(prev => ({
                    ...prev,
                    pw_2: {
                      ...prev.pw_2,
                      value: targetVal,
                    },
                  }))
                }}
              />
              <p className={styles.inputTextUnder}>{invailidMsg['pw_2']}</p>
            </div>

            <div className={styles.inputWrap}>
              <input
                placeholder="닉네임"
                type="text"
                className={cx(styles.registerInput, {
                  [styles.inputBorderActive]: formData.nickName.value,
                })}
                onChange={e => {
                  const targetVal = e.currentTarget.value
                  setFormData(prev => ({
                    ...prev,
                    nickName: {
                      ...prev.nickName,
                      value: targetVal,
                    },
                  }))
                }}
              />
            </div>

            <div className={styles.inputWrap}>
              <input
                type="date"
                className={cx(styles.registerInput, {
                  [styles.inputBorderActive]: formData.age.value,
                })}
                onChange={e => {
                  const targetVal = e.currentTarget.value
                  setFormData(prev => ({
                    ...prev,
                    age: {
                      ...prev.age,
                      value: targetVal,
                    },
                  }))
                }}
              />
              <p className={styles.inputTextUnder}>{invailidMsg['age']}</p>
            </div>

            <div className={`${styles.inputWrap} ${styles.genderWrap}`}>
              <span>성별 선택 </span>
              <span>|</span>
              <ul>
                <li>
                  <input
                    type="radio"
                    id="gender1"
                    name="m"
                    value="m"
                    onClick={e => {
                      const targetVal = e.currentTarget.value
                      setFormData(prev => ({
                        ...prev,
                        gender: {
                          ...prev.gender,
                          value: targetVal,
                        },
                      }))
                    }}
                  />
                  <label
                    htmlFor="gender1"
                    className={cx(styles.inputLabel, {
                      [styles.labelClicked]: formData.gender.value === 'm',
                    })}></label>
                  <span>남자</span>
                </li>
                <li>
                  <input
                    type="radio"
                    id="gender2"
                    name="f"
                    value="f"
                    onClick={e => {
                      const targetVal = e.currentTarget.value
                      setFormData(prev => ({
                        ...prev,
                        gender: {
                          ...prev.gender,
                          value: targetVal,
                        },
                      }))
                    }}
                  />
                  <label
                    htmlFor="gender2"
                    className={cx(styles.inputLabel, {
                      [styles.labelClicked]: formData.gender.value === 'f',
                    })}></label>
                  <span>여자</span>
                </li>
              </ul>
            </div>

            <div className={styles.clubSelectWrap}>
              <span>구단 선택</span>
              <span>|</span>
              <select
                className={cx(styles.selectWrap, {
                  [styles.noneSelected]: !formData.club.value,
                })}
                name="favoriteClub"
                id="favoriteClub"
                onChange={e => {
                  const targetVal = e.currentTarget.value
                  setFormData(prev => ({
                    ...prev,
                    club: {
                      ...prev.club,
                      value: targetVal,
                    },
                  }))
                }}>
                {clubInfo.map((c, i) => (
                  <option value={c.value} key={i}>
                    {c.name}
                  </option>
                ))}
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
    name: '맨체스터 유나이티드',
    value: 'Manchester United',
  },
  {
    name: '맨체스터 시티',
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

const Gender = {
  Male: 'm',
  Female: 'f',
}
