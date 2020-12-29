import { useEffect, useLayoutEffect, useRef, useState } from 'react';

export const useWindowWidthChange = (callBack: (changed: number) => any) => {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	useLayoutEffect(() => {
		const update = () => {
			const changed = windowWidth - window.innerWidth;
			setWindowWidth(window.innerWidth);
			callBack(changed);
		};
		window.addEventListener('resize', update);
		return () => window.removeEventListener('resize', update);
	}, []);
	return;
};
