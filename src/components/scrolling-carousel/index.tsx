import React, {
	FunctionComponent,
	MouseEvent,
	useState,
	useRef,
	useCallback,
} from 'react';
import { Item, SlideDirection } from '../../types/carousel';
import styles from '../../styles/slider/styles.module.css';
import { getOuterWidth } from '../../helpers';

export const ScrollingCarousel: FunctionComponent<SliderProps> = ({
	children,
	className,
}: SliderProps) => {
	const slider = useRef<HTMLDivElement>(null);
	const [isDown, setIsDown] = useState(false);
	const [position, setPosition] = useState({
		startX: 0,
		scrollLeft: 0,
	});

	const showArrows = (): Arrows => {
		const sliderElement = slider.current;
		return {
			left: !!sliderElement && sliderElement.scrollLeft > 0,
			right:
				!!sliderElement &&
				sliderElement.scrollWidth >
					sliderElement.scrollLeft + sliderElement.offsetWidth,
		};
	};
	const [showArrow, setShowArrow] = useState<Arrows>(showArrows());

	const onScroll = (_: Event) => {
		setShowArrow(showArrows());
	};

	const ref = useCallback(
		(node) => {
			if (node !== null) {
				Object.defineProperty(slider, 'current', { value: node });
				setShowArrow(showArrows());
				node.addEventListener('scroll', onScroll);
			}
		},
		[slider, children],
	);

	const mouseDown = (e: MouseEvent) => {
		setIsDown(true);
		setPosition({
			startX: e.pageX - slider.current!.offsetLeft,
			scrollLeft: slider.current!.scrollLeft,
		});
	};

	const mouseUp = (_: MouseEvent) => {
		setIsDown(false);
		setShowArrow(showArrows());
		slider.current!.classList.remove(styles.sliding);
	};

	const mouseMove = (e: MouseEvent) => {
		if (!isDown) return;
		e.preventDefault();
		slider.current!.classList.add(styles.sliding);
		const eventPosition = e.pageX - slider.current!.offsetLeft;
		const slide = eventPosition - position.startX;

		slider.current!.scrollLeft = position.scrollLeft - slide;
	};

	const calculateSlideAmount = (direction: SlideDirection): number => {
		const _slider = slider.current!;
		const currentView =
			direction === SlideDirection.Left
				? _slider.scrollLeft + _slider.offsetWidth
				: _slider.scrollLeft;

		const childNodes = Array.from(_slider.children) as HTMLElement[];
		let nodeWidthSum = 0;
		for (const node of childNodes) {
			const nodeWidth = getOuterWidth(node);
			nodeWidthSum += nodeWidth;

			if (nodeWidthSum >= currentView) {
				const showingPart =
					direction === SlideDirection.Left
						? nodeWidthSum - currentView
						: nodeWidth;

				return (_slider.offsetWidth - showingPart) * direction;
			}
		}

		return _slider.offsetWidth;
	};

	const slide = (direction: SlideDirection) => {
		const slideAmount = calculateSlideAmount(direction);
		const start = slider.current!.scrollLeft;
		smoothHorizontalScroll(500, slideAmount, start);
	};

	const smoothHorizontalScroll = (time: number, amount: number, start: number) => {
		let curTime = 0;
		for (let scrollCounter = 0; curTime <= time; scrollCounter++) {
			window.setTimeout(
				smoothHorizontalScrollBehavior,
				curTime,
				(scrollCounter * amount) / 100 + start,
			);
			curTime += time / 100;
		}
	};

	const smoothHorizontalScrollBehavior = (amount: number) => {
		slider.current!.scrollLeft = amount;
	};

	return (
		<div className={`${styles.sliderBase} ${className}`}>
			{showArrow.left && (
				<div data-arrow="left">
					<button onClick={() => slide(SlideDirection.Right)} />
				</div>
			)}
			{showArrow.right && (
				<div data-arrow="right">
					<button onClick={() => slide(SlideDirection.Left)} />
				</div>
			)}
			<div
				ref={ref}
				onMouseDown={mouseDown}
				onMouseLeave={mouseUp}
				onMouseUp={mouseUp}
				onMouseMove={mouseMove}
				className={styles.slider}
			>
				{children}
			</div>
		</div>
	);
};

export interface SliderProps {
	children: Item[];
	className?: string;
}

export type Arrows = {
	left: boolean;
	right: boolean;
};
