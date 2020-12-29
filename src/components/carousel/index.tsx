import React, { useState, FunctionComponent, KeyboardEvent, useEffect } from 'react';
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
	const [dynamicElements, setDynamicElements] = useState<Item[]>(userProps.children);

	/*useEffect(() => {
		if (Array.isArray(props.extraItems) && props.extraItems.length > 0) {
			const elements = dynamicElements.length > 0 ? dynamicElements : props.children;
			setDynamicElements(elements.concat(props.extraItems));
		}
	}, [props.extraItems]);*/

	useEffect(() => {
		if (dynamicElements.length > props.children.length) {
			slide(SlideDirection.Right, true);
		}
	}, [dynamicElements]);

	if (props.dynamic) {
		useEffect(() => {
			console.log({
				children: userProps.children,
				dynamicElements,
			});

			const newItems = updateNodes(
				items,
				dynamicElements,
				props.slide,
				props.infinite,
			);
			console.log({ newItems });
			setItems(newItems);
		}, [userProps.children, dynamicElements]);
	}

	const slide = async (direction: SlideDirection, cb?: boolean) => {
		if (
			animation.isSliding ||
			(direction === SlideDirection.Right && !showArrow.right) ||
			(direction === SlideDirection.Left && !showArrow.left)
		) {
			return;
		}

		const dynamicElementsExists = dynamicElements.length > 0;

		if (!cb && props.beforeChange) {
			const extraItems = await props.beforeChange(direction);
			if (Array.isArray(extraItems) && extraItems.length > 0) {
				const elements =
					dynamicElements.length > 0 ? dynamicElements : props.children;
				setDynamicElements(elements.concat(extraItems));
				return;
			}
		}

		const elements = dynamicElementsExists ? dynamicElements : props.children;

		const next = getCurrent(current, props.slide, elements.length, direction);
		const rotated = props.infinite
			? rotateItems(elements, items, next, props.show, props.slide, direction)
			: items;
		if (props.infinite && direction === SlideDirection.Right) {
			setItems(rotated);
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
				setItems(cleanItems(rotated, props.slide, direction));
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
				<Arrow direction="left" onClick={() => slide(SlideDirection.Left)} />
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
				<Arrow direction="right" onClick={() => slide(SlideDirection.Right)} />
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
	beforeChange?: ((direction: SlideDirection) => Promise<any[] | null>) | null;
	afterChange?: ((direction: SlideDirection) => void) | null;
	extraItems?: any[];
}

export interface CarouselState {
	items: Item[];
	width: number;
	transform: number;
	transition: number;
	isSliding: boolean;
	current: number;
}
