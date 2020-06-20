import React, { MouseEvent, TouchEvent } from 'react';
import * as helpers from '../src/helpers';
import { carouselItemNodes, reactNodes } from './__fixtures__/nodes';
import { SlideDirection, Item } from '../src/types/carousel';
import { getOuterWidth } from '../src/helpers';

describe('helpers', () => {
	it('should return to head of circular items list', async () => {
		const items = carouselItemNodes(2);
		const circular = new helpers.Circular(items, 0);
		circular.next();
		circular.next();

		expect(circular.current()).toEqual(items[0]);
	});

	it('should add items to right and left of the array', async () => {
		const items = carouselItemNodes(2);
		const showingItems = carouselItemNodes(2);
		const result = helpers.rotateItems(
			items,
			showingItems,
			0,
			1,
			1,
			SlideDirection.Right,
		);

		expect(result.length).toEqual(4);
	});

	it('should get indicator of the items array', async () => {
		const result = helpers.getCurrent(0, 2, 4, SlideDirection.Right);

		expect(result).toEqual(2);
	});

	it('should get indicator of the items array in circular manner', async () => {
		const result = helpers.getCurrent(0, 5, 4, SlideDirection.Right);

		expect(result).toEqual(1);
	});

	it('should return 0 if event is not mouseEvent or touchEvent', async () => {
		const mouseEvent = { nativeEvent: { pageX: 10 } };
		const result = helpers.getPageX(mouseEvent as React.MouseEvent);

		expect(result).toEqual(0);
	});

	it('should return pageX if event is mouseEvent', async () => {
		const nativeEvent = new MouseEvent('mousedown');
		const pageX = 10;
		Object.defineProperty(nativeEvent, 'pageX', { value: pageX });
		const event = { nativeEvent };
		const result = helpers.getPageX(event as MouseEvent);

		expect(result).toEqual(pageX);
	});

	it('should return pageX if event is touchEvent', async () => {
		const nativeEvent = new TouchEvent('mousedown');
		const pageX = 10;
		const changedTouches = [{ pageX }];
		Object.defineProperty(nativeEvent, 'changedTouches', { value: changedTouches });
		const event = { nativeEvent };
		const result = helpers.getPageX(event as TouchEvent);

		expect(result).toEqual(pageX);
	});

	it('should return width of element', async () => {
		const width = 30;
		const element = document.createElement('div');
		Object.defineProperty(element, 'offsetWidth', { value: width });
		const result = getOuterWidth(element);

		expect(result).toEqual(width);
	});

	it('should update nodes', async () => {
		const oldNodes = reactNodes('old', 5) as Item[];
		const newNodes = reactNodes('new', 6) as Item[];
		const expected = reactNodes('new', 5) as Item[];

		const result = helpers.updateNodes(oldNodes, newNodes);

		expect(result).toEqual(expected);
	});
});
