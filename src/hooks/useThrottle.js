import { useRef } from 'react';

//인수로 throttle을 적용할 함수를 전달받음
export function useThrottle(func) {
	//내부적으로 useRef를 통해서 setTimeout의 리턴값을 받을 참조객체 생성
	//커스텀 훅이기 때문에 내장 hook 활용가능
	const eventBlocker = useRef(null);

	if (eventBlocker.current) return;

	return () => {
		//인수로 받은 함수에 setTimeout을 적용해서 throttling 기능이 반영된 새로운 함수를 내보냄 (고차함수, hof)
		eventBlocker.current = setTimeout(() => {
			func();
			eventBlocker.current = null;
		}, 500);
	};
}
//액티베이션 받아서 내보내기만 하는 것..
