import { MouseEvent, TouchEvent } from 'react';
import { SlideDirection, Item } from '../types/carousel';

export class Circular<T> {
	constructor(private arr: T[], private currentIndex: number) {}

	next(): T {
		const i = this.currentIndex;
		const arr = this.arr;
		this.currentIndex = i < arr.length - 1 ? i + 1 : 0;
		return this.current();
	}

	prev(): T {
		const i = this.currentIndex;
		const arr = this.arr;
		this.currentIndex = i > 0 && i < arr.length ? i - 1 : arr.length - 1;
		return this.current();
	}

	current(): T {
		return this.arr[this.currentIndex];
	}
}

export const rotateItems = (
	items: any[],
	showingItems: any[],
	start: number,
	show: number,
	slide: number,
	direction: SlideDirection,
): any[] => {
	const circular = new Circular(items, start);
	const newItems: any[] = Array.from(showingItems);

	switch (+direction) {
		case SlideDirection.Left:
			for (let i = slide; i >= 0; i--) {
				if (slide - i < 0 || !newItems[i - slide]) {
					newItems.unshift(circular.current());
				}
				circular.prev();
			}
			break;
		case SlideDirection.Right:
			for (let i = 0; i < show + slide; i++) {
				if (!newItems[2 * slide + i]) {
					newItems.push(circular.current());
				}
				circular.next();
			}
			break;
	}

	return newItems;
};

export const getTransformAmount = (
	width: number,
	slideCount: number,
	direction: SlideDirection,
): number => {
	return direction * width * slideCount;
};

export const getCurrent = (
	current: number,
	slide: number,
	length: number,
	direction: SlideDirection,
) => {
	const slideTo = current - direction * slide;
	if (slideTo < 0) {
		return length + slideTo;
	} else if (length <= slideTo) {
		return slideTo - length;
	}

	return slideTo;
};

interface GetShowArrowProps {
	itemCount: number;
	itemsToShow: number;
	infinite: boolean;
	current: number;
	hideArrows: boolean;
}

export const getShowArrow = (
	props: GetShowArrowProps,
): { left: boolean; right: boolean } => {
	const { itemCount, itemsToShow, infinite, current, hideArrows = false } = props;

	if (hideArrows) {
		return {
			left: false,
			right: false,
		};
	}

	const hasMoreItems = itemCount > itemsToShow;

	if (infinite) {
		return {
			left: hasMoreItems,
			right: hasMoreItems,
		};
	}

	return {
		left: hasMoreItems && current !== 0,
		right: hasMoreItems && current + itemsToShow < itemCount,
	};
};

export const cleanItems = (
	showingItems: any[],
	slide: number,
	direction: SlideDirection,
): any[] => {
	if (direction === SlideDirection.Left) {
		return showingItems.slice(0, -1 * slide);
	}
	return showingItems.slice(slide);
};

export const cleanNavigationItems = (
	showingItems: any[],
	slide: number,
	direction: SlideDirection,
): any[] => {
	if (direction === SlideDirection.Left) {
		return showingItems.slice(0, slide);
	}

	return showingItems.slice(slide);
};

export const initItems = (items: Item[], slide: number, infinite: boolean): Item[] => {
	if (!infinite) {
		return items;
	}

	const newArray = Array.from(items);
	const circular = new Circular(items, 0);
	for (let i = 0; i < slide; i++) {
		newArray.unshift(circular.prev());
	}

	return newArray;
};

export function getPageX(e: TouchEvent | MouseEvent): number {
	if (e.nativeEvent instanceof MouseEvent) {
		return e.nativeEvent.pageX;
	} else if (e.nativeEvent instanceof TouchEvent) {
		return e.nativeEvent.changedTouches[0].pageX;
	}
	return 0;
}

export function getOuterWidth(el: HTMLElement) {
	const style = getComputedStyle(el);

	return (
		el.offsetWidth +
		(parseInt(style.marginLeft, 10) || 0) +
		(parseInt(style.marginRight, 10) || 0)
	);
}

export function updateNodes(
	oldItems: Item[],
	newItems: Item[],
	prevChildren: Item[] | undefined,
	slide: number,
	infinite: boolean,
): Item[] {
	if (prevChildren && prevChildren.length < newItems.length) {
		return initItems(newItems, slide, infinite);
	}

	const matchedItems = oldItems.map((oldItem) => {
		return newItems.find((newItem) => oldItem.key === newItem.key) as Item;
	});

	if (areItemsNotMatched(matchedItems)) {
		return initItems(newItems, slide, infinite);
	}

	return matchedItems;
}

export function areItemsNotMatched(items: Item[]): boolean {
	return items.some((item) => item === undefined);
}

export const getStartIndex = (start: number, slide: number, items: any[]): number => {
	const startIndex =
		start + slide >= items.length ? start + slide - items.length : start + slide;
	if (startIndex < 0) {
		return items.length + startIndex;
	}
	return startIndex;
};

export const rotateNavigationItems = (
	items: any[],
	showingItems: any[],
	start: number,
	show: number,
	slide: number,
	direction: SlideDirection,
): any[] => {
	const startIndex = getStartIndex(start, slide, items);
	const current = Math.floor(showingItems.length / 2);
	const circular = new Circular(items, startIndex);
	const newItems: any[] = Array.from(showingItems);

	switch (+direction) {
		case SlideDirection.Left:
			for (let i = 0; i < current; i++) {
				const idx = current - (Math.abs(slide) + i) - show;
				if (idx < 0 || !newItems[idx]) {
					newItems.unshift(circular.current());
				}
				circular.prev();
			}
			break;
		case SlideDirection.Right:
			for (let i = 0; i < current; i++) {
				if (!newItems[current + slide + i + show]) {
					newItems.push(circular.current());
				}
				circular.next();
			}
			break;
	}

	return newItems;
};

export const getNavigationSlideAmount = (
	target: number | undefined,
	next: number,
	slideAmount: number,
	direction: number,
): number => {
	if (typeof target === 'number') {
		if (direction === SlideDirection.Right) {
			return target - next + 1;
		}

		return slideAmount;
	}

	return direction * -1;
};
