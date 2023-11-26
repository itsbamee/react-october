import './Visual.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function Visual() {
	return (
		<figure className='myScroll'>
			<Swiper spaceBetween={50} slidesPerView={3}>
				<SwiperSlide>Slide 1</SwiperSlide>
				<SwiperSlide>Slide 2</SwiperSlide>
				<SwiperSlide>Slide 3</SwiperSlide>
				<SwiperSlide>Slide 4</SwiperSlide>
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
