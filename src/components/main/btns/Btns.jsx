import './Btns.scss';
import { useRef, useEffect, useState } from 'react';
import Anime from '../../../asset/anime.js';

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
	useEffect(() => {
		activation();
	}, [Num]);

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
