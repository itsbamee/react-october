import './Visual.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useEffect, useRef, useState } from 'react';

// mus -> [명칭, set명칭] -> [] 빈배열 추가
// 0. fetching될 데이터가 담길 State생성
// 1. DB폴더의 데이터를 fetching한뒤 state에 담는 함수 추가(async await)
// 2. useEffect 안쪽에서 해당 함수 호출
// 3. return문 안쪽에서 state에 담겨있는 배열을 반복돌면서 원하는 형태로 JSX를 리턴

/*
	리액트 안에서 특정 정보값을 담아주는 선택지
	1. useState : 화면에 출력이 되어야하는 중요한 데이터값
	2. useRef : 단순 모션을 위한 DOM의 스타일 값, 특정함수의 구동을 위한 정보값 (instace같은 것들)
*/

export default function Visual() {
	const [SlideData, setSlideData] = useState([]);
	const path = useRef(process.env.PUBLIC_URL);
	//path 참조객체(useRef)로 만들기 (게속 기억하는 값)
	//useRef를 쓰려면 current를 써줘야 함
	//바뀌지 않는 정적인 값을 담을 때에는 가급적 참조객체에 담아줌
	//일반변수로 담으면 다시 useMemo로 메모이제이션해야 한다는 번거로움을 피하기 위함

	const fetchData = async () => {
		const data = await fetch(`${path.current}/DB/department.json`);
		const json = await data.json();
		console.log(json.members);
		setSlideData(json.members);
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<figure className='myScroll'>
			<Swiper spaceBetween={50} slidesPerView={3} loop={true}>
				{SlideData.map((data, idx) => {
					return (
						<SwiperSlide key={idx}>
							<div className='pic'>
								<img src={`${path.current}/img/${data.pic}`} alt={data.name} />
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</figure>
	);
}

/*
	swiper 연결 순서
	1. npm i swiper@8 설치 (현재 버전은 9버전이지만 react가 17버전이므로 8버전대 설치)
	2. swiper 가이드문서 예시코드 그대로 붙여넣기
	3. .swiper > .swiper-wrapper > .swiper-slide 해당구조를 파악해서 styling
*/
