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
		//위치값 정밀하게 보정하는 법
		//기존 구글지도 위치값 복사뒤 카카오예제의 클릭한 위치 마커표시 직접해보기에서
		//해당 코드 붙여넣기하고 원하는 지점을 찍으며녀 아래와같이 정밀한 수치값을 확인가능
		center: new kakao.maps.LatLng(36.496412055947246, 127.27404607723297), // 지도의 중심좌표
		level: 3, // 지도의 확대 레벨
	};

	//마커 이미지 인스턴스를 생성하기 위한 정보값들
	const imgSrc = `${process.env.PUBLIC_URL}/img/marker1.png`;
	const imgSize = new kakao.maps.Size(232, 99);
	const imgPos = { offset: new kakao.maps.Point(116, 99) };
	const markerImage = new kakao.maps.MarkerImage(imgSrc, imgSize, imgPos);

	const marker = new kakao.maps.Marker({
		position: mapOption.center,
		image: markerImage,
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
