import './Btns.scss';
import { useRef, useEffect, useState } from 'react';
import Anime from '../../../asset/anime.js';

// document.querySelector vs useRef(DOM) (참고로 둘다 realDOM을 제어)
// document.querySelector : 이미 이전 렌더링 사이클에서 돔으로 변경된 신뢰할 수 없는 예전 돔
// useRef : 똑같이 realDOM을 담긴 하지만 앞으로 렌더링이 될 신뢰할 수 있는 최신 돔
// State vs useRef 해당 값의 변경 및 적용 시점
// state값은 해당 렌더링 사이클에서 값이 변경되는 것은 맞지만 실제 그 값이 적용되는 시점은 다음번 렌더링 사이클
// useRef값은 해당 렌더링 사이클에서 값도 변경되고 바로 반용도 됨

function Btns() {
	const [Num, setNum] = useState(0);
	const secs = useRef(null);
	const btns = useRef(null);

	//컴포넌트 마운트시 윈도우 스크롤이벤트에 연결될 함수
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
		secs.current = document.querySelectorAll('.myScroll');
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
				.fill()
				.map((_, idx) => {
					return (
						<li key={idx} className={idx === 0 ? 'on' : ''} onClick={() => handleClick(idx)}></li>
					);
				})}
		</ul>
	);
}

export default Btns;
