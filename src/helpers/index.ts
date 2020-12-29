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

export const getShowArrow = (
	items: number,
	show: number,
	infinite: boolean,
	current: number,
): { left: boolean; right: boolean } => {
	const isItemsMore = items > show;
	if (infinite) {
		return {
			left: isItemsMore,
			right: isItemsMore,
		};
	}

	return {
		left: isItemsMore && current !== 0,
		right: isItemsMore && current + show < items,
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
	slide: number,
	infinite: boolean,
): Item[] {
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
