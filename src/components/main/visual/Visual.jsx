import './Visual.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';
import { useEffect, useRef, useState } from 'react';

export default function Visual() {
	const [SlideData, setSlideData] = useState([]);
	const path = useRef(process.env.PUBLIC_URL);

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
			<Swiper
				modules={[Autoplay]}
				spaceBetween={50}
				slidesPerView={3}
				loop={true}
				centeredSlides={true}
				autoplay={{ delay: 1500, disableOnInteraction: true }}
			>
				{SlideData.map((data, idx) => {
					//여러 데이터중에 몇개만 보여지게 지정함 (지금은 5개로 지정)
					if (idx >= 5) return null;
					return (
						<SwiperSlide key={idx}>
							<div className='pic'>
								<img src={`${path.current}/img/${data.pic}`} alt={data.name} />
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
