import React, {
	FunctionComponent,
	MouseEvent,
	useState,
	useRef,
	useCallback,
} from 'react';
import { Item, SlideDirection } from '../../types/carousel';
import styles from '../../styles/slider/styles.module.css';

export const Slider: FunctionComponent<SliderProps> = ({
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

	const ref = useCallback(
		(node) => {
			if (node !== null) {
				Object.defineProperty(slider, 'current', { value: node });
				setShowArrow(showArrows());
			}
		},
		[slider],
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
	};

	const mouseMove = (e: MouseEvent) => {
		if (!isDown) return;
		e.preventDefault();

		const eventPosition = e.pageX - slider.current!.offsetLeft;
		const slide = eventPosition - position.startX;

		slider.current!.scrollLeft = position.scrollLeft - slide;
	};

	const slide = (direction: SlideDirection) => {
		const slideAmount = -1 * direction * slider.current!.offsetWidth * 0.9;
		const start = slider.current!.scrollLeft;
		smoothHorizontalScroll(500, slideAmount, start);
		setShowArrow(showArrows());
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
		setShowArrow(showArrows());
	};

	return (
		<div className={`${styles.sliderBase} ${className}`}>
			{showArrow.left && (
				<button onClick={() => slide(SlideDirection.Left)}>left</button>
			)}
			{showArrow.right && (
				<button onClick={() => slide(SlideDirection.Right)}>right</button>
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
