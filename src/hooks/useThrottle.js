import { useRef } from 'react';

export function useThrottle(func) {
	const eventBlocker = useRef(null);

	if (eventBlocker.current) return;

	return () => {
		eventBlocker.current = setTimeout(() => {
			func();
			eventBlocker.current = null;
		}, 500);
	};
}
