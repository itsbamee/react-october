import './Btns.scss';
import { useRef, useEffect, useState } from 'react';
import Anime from '../../../asset/anime.js';

//useCallback : 함수자체를 메모이제이션해서 해당 함수를 재활용 (메모리 강제등록해 있는 값을 재활용)
//useMemo : 함수의 리턴값 자체를 메모이제이션
//memo : 컴포넌트 자체를 메모이제이션

//고차컴포넌트(hoc) : high order component
//인수로 컴포넌트를 전달받아서 새로운 컴포넌트를 반환

//hook의 조건 (법칙 일케 안하면 에러남)
//1. 이름이 use로 시작
//2. 커스텀훅은 무조건 함수나 리턴값을 반환
//3. 다른 hook이나 핸들ㄷ러함수 안쪽에서 호출이 불가, 컴포넌트 함수 안쪽에서만 호출 가능

//throttle : 강제로 이벤트 핸들러 호출횟수를 압박해서 줄이는 기법
//scroll, mousemove, resize, mousewheel : 단기간에 많은 핸들러를 호출하는 이벤트 (1초 60번, 화면주사율 60hz)

function Btns() {
	const [Num, setNum] = useState(0);
	const secs = useRef(null);
	const btns = useRef(null);

	const activation = () => {
		const scroll = window.scrollY;
		secs.current.forEach((el, idx) => {
			if (scroll >= el.offsetTop - window.innerHeight / 2) {
				Array.from(btns.current.children).forEach((btn) => btn.classList.remove('on'));
				btns.current.children[idx]?.classList.add('on');

				secs.current.forEach((sec) => sec.classList.remove('on'));
				secs.current[idx].classList.add('on');
			}
		});
	};

	const handleClick = (idx) => {
		new Anime(
			window,
			{ scroll: secs.current[idx].offsetTop },
			{ duration: 500, easeType: 'ease1' }
		);
	};

	//컴포넌트 마운트시
	useEffect(() => {
		secs.current = btns.current.parentElement.querySelectorAll('.myScroll');
		setNum(secs.current.length);

		window.addEventListener('scroll', activation);

		return () => {
			window.removeEventListener('scroll', activation);
		};
	}, []);

	//Num state 변경시 activation 호출
	useEffect(activation, [Num]);

	return (
		<ul className='btns' ref={btns}>
			{Array(Num)
				.fill('abc')
				.map((_, idx) => {
					return (
						<li
							key={'_+idx'}
							className={idx === 0 ? 'on' : ''}
							onClick={() => handleClick(idx)}
						></li>
					);
				})}
		</ul>
	);
}

export default Btns;
