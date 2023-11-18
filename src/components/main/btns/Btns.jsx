import './Btns.scss';
import { useEffect, useRef } from 'react';
import Anime from '../../../asset/anime.js';

function Btns() {
	//각각의 활성화순번, 버튼 그룹요소, 섹션 그룹요소 담길 참조객체 생성
	const num = useRef(0);
	const secs = useRef(null);
	const btns = useRef(null);

	//추후에 컴포넌트 마운트시 윈도우 스크롤 이벤트 될 때 동작(연결될)되는 함수
	const activation = () => {
		const scroll = window.scrollY;

		secs.current.forEach((el, idx) => {
			if (scroll >= el.offsetTop - window.innerHeight / 2) {
				//순수배열로 반환 (노드js로 되서 어쩌구)
				Array.from(btns.current.children).forEach((btn) => btn.classList.remove('on'));
				btns.current.children[idx].classList.add('on');
			}
		});
	};

	const handleClick = (idx) => {
		new Anime(window, { scroll: secs.current[idx].offsetTop }, { duration: 500 });
	};

	//컴포넌트 마운트시
	useEffect(() => {
		//빈 참조객체에 버튼과 section요소 담아줌
		secs.current = document.querySelectorAll('.myScroll');
		num.current = secs.current.length;

		//window scroll 이벤트에 activation 함수 연결
		window.addEventListener('scroll', activation);

		return () => {
			window.removeEventListener('scroll', activation);
		};
	}, []);

	return (
		<ul className='btns' ref={btns}>
			{Array(num.current)
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
