import { CarouselProps } from '.';

export const defaultProps: Required<CarouselProps> = {
	children: [],
	show: 1,
	slide: 1,
	transition: 0.5,
	swiping: false,
	swipeOn: 1,
	responsive: false,
	infinite: true,
	className: '',
	useArrowKeys: false,
	a11y: {},
	dynamic: false,
	beforeChange: null,
	afterChange: null,
	extraItems: [],
};
