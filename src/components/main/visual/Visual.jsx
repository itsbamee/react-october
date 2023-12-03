import './Visual.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import 'swiper/css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCustomText } from '../../../hooks/useText';

export default function Visual() {
	const [Index, setIndex] = useState(0);
	const [SlideData, setSlideData] = useState([]);
	const shortenText = useCustomText('shorten');

	const fetchYoutube = async () => {
		const api_key = process.env.REACT_APP_YOUTUBE_KEY;
		const pid = process.env.REACT_APP_PLAYLIST;
		const num = 10;
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;
		const data = await fetch(baseURL);
		const json = await data.json();
		setSlideData(json.items);
	};

	useEffect(() => {
		fetchYoutube();
	}, []);

	return (
		<figure className='myScroll'>
			<div className='txtBox'>
				<ul>
					{SlideData.map((tit, idx) => {
						if (idx >= 5) return null;
						return (
							<li key={idx} className={idx === Index ? 'on' : ''}>
								<h3>{shortenText(tit.snippet.title, 50)}</h3>
								<Link to={`/detail/${tit.id}`}>
									<em>View Detail</em>
								</Link>
							</li>
						);
					})}
				</ul>
			</div>

			<Swiper
				modules={[Autoplay]}
				spaceBetween={0}
				slidesPerView={1}
				loop={true}
				centeredSlides={true}
				autoplay={{ delay: 2000, disableOnInteraction: true }}
				onSlideChange={(el) => setIndex(el.realIndex)}
				breakpoints={{
					1000: {
						slidesPerView: 2,
						spaceBetween: 50,
					},
					1400: {
						slidesPerView: 3,
						spaceBetween: 50,
					},
				}}
			>
				{SlideData.map((data, idx) => {
					if (idx >= 5) return null;
					return (
						<SwiperSlide key={idx}>
							<div className='pic'>
								<p>
									<img src={data.snippet.thumbnails.standard.url} alt={data.snippet.title} />
								</p>

								<p>
									<img src={data.snippet.thumbnails.standard.url} alt={data.snippet.title} />
								</p>
							</div>
							<h3>{data.snippet.title}</h3>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</figure>
	);
}

/*
	swiper연결 순서
	1. npm i swiper@8 설치 (현재 버전은 9버전이지만 react가 17버전이므로 8버전대 설치)
	2. swiper가이드문서 예시코드 그대로 붙여넣기
	3. .swiper> .swiper-wrapper > .swiper-slide 해당구조를 파악해서 styling
*/
