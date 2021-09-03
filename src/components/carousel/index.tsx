import React, {
	useState,
	FunctionComponent,
	KeyboardEvent,
	useEffect,
	useRef,
	ReactElement,
} from 'react';
import { Arrow } from '../arrow';
import { ItemProvider } from '../item';
import {
	rotateItems,
	getTransformAmount,
	getCurrent,
	initItems,
	getShowArrow,
	cleanItems,
	updateNodes,
} from '../../helpers';
import { SlideDirection, Item, ArrowKeys } from '../../types/carousel';
import { defaultProps } from './defaultProps';
import styles from '../../styles/styles.module.css';
import { usePrevious } from '../../hooks';

export const Carousel: FunctionComponent<CarouselProps> = (userProps: CarouselProps) => {
	const props: Required<CarouselProps> = { ...defaultProps, ...userProps };
	const [items, setItems] = useState(
		initItems(props.children, props.slide, props.infinite),
	);
	const [width, setWidth] = useState(0);
	const [animation, setAnimation] = useState({
		transform: 0,
		transition: 0,
		isSliding: false,
	});
	const [current, setCurrent] = useState(0);
	const [showArrow, setShowArrow] = useState(
		getShowArrow(props.children.length, props.show, props.infinite, current),
	);
	const prevChildren = usePrevious<Item[]>(userProps.children);
	const [page, setPage] = useState<number>(0);
	const itemsRef = useRef(initItems(props.children, props.slide, props.infinite));
	const isPaginating = useRef(false);

	if (props.dynamic) {
		useEffect(() => {
			const newItems = updateNodes(
				itemsRef.current,
				props.children,
				prevChildren,
				props.slide,
				props.infinite,
			);

			setItems(newItems);
			itemsRef.current = newItems;
			if (
				page < props.pageCount &&
				prevChildren &&
				prevChildren?.length < props.children.length
			) {
				slide(SlideDirection.Right);
				setPage(page + 1);
			}
		}, [props.children]);
	}

	const slide = (direction: SlideDirection) => {
		if (
			animation.isSliding ||
			(direction === SlideDirection.Right && !showArrow.right) ||
			(direction === SlideDirection.Left && !showArrow.left)
		) {
			return;
		}

		if (
			props.paginationCallback &&
			direction === SlideDirection.Right &&
			page < props.pageCount - 1 &&
			!isPaginating.current
		) {
			isPaginating.current = true;
			props.paginationCallback(direction);
			return;
		}

		const elements = props.children;

		const next = getCurrent(current, props.slide, elements.length, direction);
		const rotated = props.infinite
			? rotateItems(elements, items, next, props.show, props.slide, direction)
			: items;
		if (props.infinite && direction === SlideDirection.Right) {
			setItems(rotated);
			itemsRef.current = rotated;
		}
		setAnimation({
			transform:
				animation.transform + getTransformAmount(width, props.slide, direction),
			transition: props.transition,
			isSliding: true,
		});
		setCurrent(next);
		setShowArrow(getShowArrow(elements.length, props.show, props.infinite, next));
		setTimeout(() => {
			if (props.infinite) {
				const cleanedItems = cleanItems(
					direction === SlideDirection.Right ? itemsRef.current : rotated,
					props.slide,
					direction,
				);
				setItems(cleanedItems);
				itemsRef.current = cleanedItems;
			}
			setAnimation({
				transform: props.infinite
					? getTransformAmount(width, props.slide, SlideDirection.Right)
					: animation.transform +
					  getTransformAmount(width, props.slide, direction),
				transition: 0,
				isSliding: false,
			});
		}, props.transition * 1_0_0_0);
		isPaginating.current = false;
	};

	const widthCallBack = (calculatedWidth: number) => {
		setWidth(calculatedWidth);
		setAnimation({
			transform: props.infinite
				? getTransformAmount(calculatedWidth, props.slide, SlideDirection.Right)
				: 0,
			transition: 0,
			isSliding: false,
		});
	};

	const dragCallback = (translateX: number) => {
		setAnimation({
			transform: translateX,
			transition: props.transition,
			isSliding: false,
		});
		setTimeout(
			() => setAnimation({ ...animation, transition: 0 }),
			props.transition * 1_0_0_0,
		);
	};

	const slideCallback = (direction: SlideDirection) => {
		slide(direction);
	};

	const handleOnKeyDown = (e: KeyboardEvent) => {
		if (e.keyCode === ArrowKeys.Left) {
			slide(SlideDirection.Left);
		} else if (e.keyCode === ArrowKeys.Right) {
			slide(SlideDirection.Right);
		}
	};

	return (
		<div
			{...props.a11y}
			data-testid="carousel"
			tabIndex={0}
			{...(props.useArrowKeys ? { onKeyDown: handleOnKeyDown } : {})}
			className={`${styles.carouselBase} ${props.className}`}
		>
			{showArrow.left && (
				<div onClick={() => slide(SlideDirection.Left)}>
					{props.leftArrow ?? <Arrow direction="left" />}
				</div>
			)}
			<ItemProvider
				{...props}
				transition={animation.transition}
				items={itemsRef.current}
				transform={animation.transform}
				slideCallback={slideCallback}
				dragCallback={dragCallback}
				widthCallBack={widthCallBack}
			/>
			{showArrow.right && (
				<div onClick={() => slide(SlideDirection.Right)}>
					{props.rightArrow ?? <Arrow direction="right" />}
				</div>
			)}
		</div>
	);
};

export interface CarouselProps {
	children: Item[];
	show: number;
	slide: number;
	transition?: number;
	swiping?: boolean;
	swipeOn?: number;
	responsive?: boolean;
	infinite?: boolean;
	className?: string;
	useArrowKeys?: boolean;
	a11y?: { [key: string]: string };
	dynamic?: boolean;
	paginationCallback?: ((direction: SlideDirection) => any) | null;
	pageCount?: number;
	leftArrow?: ReactElement | null;
	rightArrow?: ReactElement | null;
}

export interface CarouselState {
	items: Item[];
	width: number;
	transform: number;
	transition: number;
	isSliding: boolean;
	current: number;
}
