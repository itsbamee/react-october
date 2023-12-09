import { useGetCurrentScroll } from '../../../hooks/useGetCurrentScroll';
import './Banner.scss';
import { useRef, useEffect, useCallback } from 'react';

export default function Banner() {
	console.log('Banner Called');
	const currentEl = useRef(null);
	const titleEl = useRef(null);
	const scrollFrame = currentEl.current?.parentElement.parentElement;
	const getScroll = useGetCurrentScroll(scrollFrame);

	//handleScroll에 대입되어있는 함수가 컴포넌트 재렌더링시마다 계속 읽히기 때문에
	//useCallback을 통해서 강제로 메모리에 등록해서 기존함수내용을 재활용하는 메모이제이션 처리
	//메모이제이션되는 순간 그 안쪽의 모든 값들이 static하게 고정되어 버리므로
	//의존성 배열에 특정 값을 지정해서 해당값이 변경시에는 임시로 메모이제이션 해제처리
	const handleScroll = useCallback(() => {
		const modifiedScroll = getScroll(currentEl);
		titleEl.current.style.transform = `translateX(${modifiedScroll}px)`;
	}, [getScroll]);

	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [handleScroll]);

	return (
		<section className='banner myScroll' ref={currentEl}>
			<h1 ref={titleEl}>Banner</h1>
		</section>
	);
}
