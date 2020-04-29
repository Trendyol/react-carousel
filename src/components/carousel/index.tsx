import React, { useState, FunctionComponent, KeyboardEvent } from 'react';
import { Arrow } from '../arrow';
import { ItemProvider } from '../item';
import {
	rotateItems,
	getTransformAmount,
	getCurrent,
	initItems,
	getShowArrow,
	cleanItems,
} from '../../helpers';
import { SlideDirection, Item, ArrowKeys } from '../../types/carousel';
import { defaultProps } from './defaultProps';
import styles from '../../styles/styles.module.css';

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

	const slide = (direction: SlideDirection, slide: number): void => {
		if (
			animation.isSliding ||
			(direction === SlideDirection.Right && !showArrow.right) ||
			(direction === SlideDirection.Left && !showArrow.left)
		) {
			return;
		}

		const next = getCurrent(current, slide, props.children.length, direction);
		const rotated = props.infinite
			? rotateItems(props.children, items, next, props.show, slide, direction)
			: items;
		if (props.infinite && direction === SlideDirection.Right) {
			setItems(rotated);
		}
		setAnimation({
			transform: animation.transform + getTransformAmount(width, slide, direction),
			transition: props.transition,
			isSliding: true,
		});
		setCurrent(next);
		setShowArrow(
			getShowArrow(props.children.length, props.show, props.infinite, next),
		);
		setTimeout(() => {
			if (props.infinite) {
				setItems(cleanItems(rotated, slide, direction));
			}
			setAnimation({
				transform: props.infinite
					? getTransformAmount(width, slide, SlideDirection.Right)
					: animation.transform + getTransformAmount(width, slide, direction),
				transition: 0,
				isSliding: false,
			});
		}, props.transition * 1_0_0_0);
	};

	const widthCallBack = (calculatedWidth: number, slide: number) => {
		setWidth(calculatedWidth);
		setAnimation({
			transform: props.infinite
				? getTransformAmount(calculatedWidth, slide, SlideDirection.Right)
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
		slide(direction, props.slide);
	};

	const handleOnKeyDown = (e: KeyboardEvent) => {
		if (e.keyCode === ArrowKeys.Left) {
			slide(SlideDirection.Left, props.slide);
		} else if (e.keyCode === ArrowKeys.Right) {
			slide(SlideDirection.Right, props.slide);
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
				<Arrow
					direction="left"
					onClick={() => slide(SlideDirection.Left, props.slide)}
				/>
			)}
			<ItemProvider
				{...props}
				transition={animation.transition}
				items={items}
				transform={animation.transform}
				slideCallback={slideCallback}
				dragCallback={dragCallback}
				widthCallBack={widthCallBack}
			/>
			{showArrow.right && (
				<Arrow
					direction="right"
					onClick={() => slide(SlideDirection.Right, props.slide)}
				/>
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
}

export interface CarouselState {
	items: Item[];
	width: number;
	transform: number;
	transition: number;
	isSliding: boolean;
	current: number;
}
