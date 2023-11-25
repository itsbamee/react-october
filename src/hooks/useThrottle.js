export function useThrottle(txt) {
	return (txt) => {
		console.log(txt);
		return txt;
	};
}
