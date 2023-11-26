import Layout from '../../common/layout/Layout';
import './Members.scss';
import { useHistory } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useDebounce } from '../../../hooks/useDebounce';

export default function Members() {
	const history = useHistory();
	const initVal = useRef({
		userid: '',
		email: '',
		pwd1: '',
		pwd2: '',
		edu: '',
		gender: '',
		interest: [],
		comments: '',
	});

	const [Val, setVal] = useState(initVal.current);
	const [Errs, setErrs] = useState({});

	//단기간에 자주 바뀌는 state값을 useDebounce hook의 인수로 전달하면
	//debouncing이 적용된 새로운 state 반환
	const DebouncedVal = useDebounce(Val);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setVal({ ...Val, [name]: value });
	};

	const handleCheck = (e) => {
		const { name } = e.target;
		let checkArr = [];
		const inputs = e.target.parentElement.querySelectorAll('input');

		inputs.forEach((input) => input.checked && checkArr.push(input.value));
		setVal({ ...Val, [name]: checkArr });
	};

	const check = (value) => {
		console.log('check');
		const txt = /[a-zA-Z]/;
		const num = /[0-9]/;
		const spc = /[!@#$%^&*()_+]/;

		const errs = {};
		//일반텍스트 인증로직
		if (value.userid.length < 5) {
			errs.userid = '아이디는 최소 5글자 이상 입력하세요.';
		}
		if (
			value.pwd1.length < 5 ||
			!txt.test(value.pwd1) ||
			!num.test(value.pwd1) ||
			!spc.test(value.pwd1)
		) {
			errs.pwd1 = '비밀번호는 특수문자,영문,숫자포함해서 5글자 이상 입력하세요.';
		}
		//pwd2 인증로직
		if (value.pwd1 !== value.pwd2 || !value.pwd2) {
			errs.pwd2 = '두개의 비밀번호를 동일하게 입력하세요.';
		}
		if (value.comments.length < 10) {
			//textarea 인증로직
			errs.comments = '남기는 말은 최소 10글자 이상 입력하세요.';
		}
		//radio 버튼 인증로직
		if (!value.gender) {
			errs.gender = '성별을 선택해주세요.';
		}
		//select요소 인증로직
		if (!value.edu) {
			errs.edu = '최종학력을 선택해주세요.';
		}
		//checkbox 인증로직
		if (value.interest.length === 0) {
			errs.interests = '취미를 하나이상 선택하세요.';
		}
		//email 인증로직
		if (!value.email || !/@/.test(value.email)) {
			errs.email = '이메일 주소에는 무조건 @를 포함해야 합니다.';
		} else {
			const [forward, backward] = value.email.split('@');
			if (!forward || !backward) {
				errs.email = '@ 앞뒤로 문자값이 있어야 합니다.';
			} else {
				const [forward, backward] = value.email.split('.');
				if (!forward || !backward) {
					errs.email = '이메일 . 앞뒤로 문자값이 있어야 합니다.';
				}
			}
		}
		return errs;
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (Object.keys(check(Val)).length === 0) {
			alert('회원가입을 축하합니다.');
			history.push('/');
		}
	};

	useEffect(() => {
		//debouncing이 적용된 state를 의존성 배열에 등록하면
		//해당 state가 계속 변경되는 중에는 호출을 막아주고
		//변경이 끝나고 0.5s가 지나야지만 호출됨
		setErrs(check(DebouncedVal));
	}, [DebouncedVal]);

	//인증 로직 흐름
	//1. onChange이벤트 발생시마다 handleChange, handleCheck를 이용해서 실시간으로 State값 갱신
	//2. 실시간으로 변경되는 State값을 check함수의 인수로 전달
	//3. check함수 내부적으로 전달되는 값의 형식에따서 인증로직을 구현
	//4. check함수 내부적으로 데이터 항목별로 인증에 실해하면 해당 name값을 키값으로 해서 에러 property를 만들고 에러메세지 객체로 반환
	//5. check함수가 실행된 이후에 반환되는 err객체가 없으면 인증성공이고 err객체가 있으면 해당 에러메세지를 출력

	return (
		<Layout title={'Members'}>
			<div className='wrap'>
				<div className='infoBox'>
					<h2>Join Members</h2>
				</div>
				<div className='formBox'>
					<form onSubmit={handleSubmit}>
						<fieldset>
							<legend className='h'>회원가입 폼</legend>
							<table>
								<tbody>
									{/* userid, email (handleChange) */}
									<tr>
										<td>
											<input
												type='text'
												name='userid'
												placeholder='User ID'
												value={Val.userid}
												onChange={handleChange}
											/>
											{Errs.userid && <p>{Errs.userid}</p>}
										</td>
										<td>
											<input
												type='text'
												name='email'
												placeholder='Email'
												value={Val.email}
												onChange={handleChange}
											/>
											{Errs.email && <p>{Errs.email}</p>}
										</td>
									</tr>

									{/* pwd1, pwd2 (handleChange) */}
									<tr>
										<td>
											<input
												type='password'
												name='pwd1'
												placeholder='Password'
												value={Val.pwd1}
												onChange={handleChange}
											/>
											{Errs.pwd1 && <p>{Errs.pwd1}</p>}
										</td>
										<td>
											<input
												type='password'
												name='pwd2'
												placeholder='Re-Password'
												value={Val.pwd2}
												onChange={handleChange}
											/>
											{Errs.pwd2 && <p>{Errs.pwd2}</p>}
										</td>
									</tr>

									{/* edu (handleChange) */}
									<tr>
										<td colSpan='2'>
											<select name='edu' onChange={handleChange}>
												{/* 어차피 onChange이벤트가 연결되어 있으므로 value값으로 등록 */}
												<option value=''>Education</option>
												<option value='elementary-school'>초등학교 졸업</option>
												<option value='middle-school'>중학교 졸업</option>
												<option value='high-school'>고등학교 졸업</option>
												<option value='college'>대학교 졸업</option>
											</select>
											{Errs.edu && <p>{Errs.edu}</p>}
										</td>
									</tr>

									{/* gender (handleChange) */}
									<tr>
										<td colSpan='2'>
											<input
												type='radio'
												defaultValue='female'
												id='female'
												name='gender'
												onChange={handleChange}
											/>
											<label htmlFor='female'>Female</label>

											<input
												type='radio'
												defaultValue='male'
												id='male'
												name='gender'
												onChange={handleChange}
											/>
											<label htmlFor='male'>Male</label>
											{Errs.gender && <p>{Errs.gender}</p>}
										</td>
									</tr>

									{/* interests (handleCheck) */}
									<tr>
										<td colSpan='2'>
											<input
												type='checkbox'
												name='interest'
												id='sports'
												defaultValue='sports'
												onChange={handleCheck}
											/>
											<label htmlFor='sports'>Sports</label>

											<input
												type='checkbox'
												name='interest'
												id='reading'
												defaultValue='reading'
												onChange={handleCheck}
											/>
											<label htmlFor='reading'>Reading</label>

											<input
												type='checkbox'
												name='interest'
												id='music'
												defaultValue='music'
												onChange={handleCheck}
											/>
											<label htmlFor='music'>Music</label>

											<input
												type='checkbox'
												name='interest'
												id='game'
												defaultValue='game'
												onChange={handleCheck}
											/>
											<label htmlFor='game'>Game</label>
											{Errs.interests && <p>{Errs.interests}</p>}
										</td>
									</tr>

									{/* comments (handleChange) */}
									<tr>
										<td colSpan='2'>
											<textarea
												name='comments'
												cols='30'
												rows='5'
												placeholder='Leave a comment'
												value={Val.comments}
												onChange={handleChange}
											></textarea>
											{Errs.comments && <p>{Errs.comments}</p>}
										</td>
									</tr>
									<tr>
										<td colSpan='2'>
											<input type='reset' value='Cancel' />
											<input type='submit' value='Submit' />
										</td>
									</tr>
								</tbody>
							</table>
						</fieldset>
					</form>
				</div>
			</div>
		</Layout>
	);
}

/*
	throttle vs debounce
	throttle : 물리적으로 핸들러함수 호출 자체를 일정횟수 이하로 줄임
	debounce : 특정 이벤트가 단시간에 반복적으로 계속 발생하고 있으면 핸들러 함수 호출 자체를 계속 뒤로 미뤄버리며 호출을 막음
*/
