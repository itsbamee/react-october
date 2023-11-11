import { useRef, useEffect } from 'react';
import Layout from '../../common/layout/Layout';
import './Contact.scss';

export default function Contact() {
	//JSX 컴포넌트에서는 cdn을 통해 window 전역객체에 받아지는 kakao 객체에 자동 접근이 안되니
	//비구조화 할당으로 직접 해당 객체 추출
	const { kakao } = window;
	//api적용할 요소도 가상돔이기 때문에 참조객체에 연결
	const mapFrame = useRef(null);
	const mapOption = {
		center: new kakao.maps.LatLng(36.496372, 127.274236), // 지도의 중심좌표
		level: 3, // 지도의 확대 레벨
	};
	const marker = new kakao.maps.Marker({
		position: mapOption.center,
	});

	useEffect(() => {
		const map = new kakao.maps.Map(mapFrame.current, mapOption);
		marker.setMap(map);
	}, []);

	return (
		<Layout title={'Contact us'}>
			<article id='map' ref={mapFrame}></article>
		</Layout>
	);
}
