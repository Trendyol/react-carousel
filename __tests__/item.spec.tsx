import React, { MouseEvent } from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { ItemProvider, ItemProviderProps } from '../src/components/item';
import { defaultProps } from '../src/components/carousel/defaultProps';
import * as helpers from '../src/helpers';
import { carouselItemNodes } from './__fixtures__/nodes';

describe('<ItemProvider />', () => {
	const defaultItemProviderProps: ItemProviderProps = {
		...defaultProps,
		items: carouselItemNodes(6),
		widthCallBack: jest.fn(),
		dragCallback: jest.fn(),
		slideCallback: jest.fn(),
		transition: 0,
		transform: 0,
	};
	let mockGetPageX: jest.SpyInstance<
		number,
		[React.TouchEvent<Element> | React.MouseEvent<Element, globalThis.MouseEvent>]
	>;

	afterEach(() => {
		mockGetPageX.mockRestore();
		jest.resetAllMocks();
		cleanup();
	});

	beforeEach(() => {
		Element.prototype.getBoundingClientRect = jest.fn(() => {
			return {
				width: 900,
				height: 600,
				top: 0,
				left: 0,
				bottom: 0,
				right: 0,
				x: 0,
				y: 0,
				toJSON: jest.fn(),
			};
		});
		mockGetPageX = jest
			.spyOn(helpers, 'getPageX')
			.mockImplementation((_: MouseEvent) => 600);
	});

	it('should call dragCallback when user swipes less than item width', async () => {
		const { getByTestId } = render(
			<ItemProvider {...defaultItemProviderProps} show={3} swiping={true} />,
		);
		const trackList = getByTestId('trackList');
		mockGetPageX = jest
			.spyOn(helpers, 'getPageX')
			.mockImplementation((_: MouseEvent) => 600);
		fireEvent.mouseDown(trackList, { pageX: 600 });

		mockGetPageX = jest
			.spyOn(helpers, 'getPageX')
			.mockImplementation((_: MouseEvent) => 390);
		fireEvent.mouseMove(trackList, { pageX: 390 });

		fireEvent.mouseUp(trackList, { pageX: 390 });

		expect(defaultItemProviderProps.dragCallback).toHaveBeenCalledTimes(1);
	});

	it('should call slideCallback when user swipes bigger than item width', async () => {
		const { getByTestId } = render(
			<ItemProvider {...defaultItemProviderProps} show={3} swiping={true} />,
		);
		const trackList = getByTestId('trackList');
		mockGetPageX = jest
			.spyOn(helpers, 'getPageX')
			.mockImplementation((_: MouseEvent) => 600);
		fireEvent.mouseDown(trackList, { pageX: 600 });

		mockGetPageX = jest
			.spyOn(helpers, 'getPageX')
			.mockImplementation((_: MouseEvent) => 290);
		fireEvent.mouseMove(trackList, { pageX: 290 });

		fireEvent.mouseUp(trackList, { pageX: 290 });

		expect(defaultItemProviderProps.slideCallback).toHaveBeenCalledTimes(1);
	});

	it('should slide to left if drag value bigger than zero', async () => {
		const { getByTestId } = render(
			<ItemProvider {...defaultItemProviderProps} show={3} swiping={true} />,
		);
		const trackList = getByTestId('trackList');
		mockGetPageX = jest
			.spyOn(helpers, 'getPageX')
			.mockImplementation((_: MouseEvent) => 600);
		fireEvent.mouseDown(trackList, { pageX: 600 });

		mockGetPageX = jest
			.spyOn(helpers, 'getPageX')
			.mockImplementation((_: MouseEvent) => 910);
		fireEvent.mouseMove(trackList, { pageX: 910 });

		fireEvent.mouseUp(trackList, { pageX: 910 });

		expect(defaultItemProviderProps.slideCallback).toHaveBeenCalledTimes(1);
	});

	it("should't call neither drag or slide callbacks when not swiping", async () => {
		const { getByTestId } = render(
			<ItemProvider {...defaultItemProviderProps} show={3} swiping={true} />,
		);
		const trackList = getByTestId('trackList');

		mockGetPageX = jest
			.spyOn(helpers, 'getPageX')
			.mockImplementation((_: MouseEvent) => 290);
		fireEvent.mouseMove(trackList, { pageX: 290 });

		expect(defaultItemProviderProps.slideCallback).toHaveBeenCalledTimes(0);
		expect(defaultItemProviderProps.dragCallback).toHaveBeenCalledTimes(0);
	});

	it("should't call neither drag or slide callbacks when mouse leave and not swiping", async () => {
		const { getByTestId } = render(
			<ItemProvider {...defaultItemProviderProps} show={3} swiping={true} />,
		);
		const trackList = getByTestId('trackList');

		mockGetPageX = jest
			.spyOn(helpers, 'getPageX')
			.mockImplementation((_: MouseEvent) => 290);
		fireEvent.mouseUp(trackList, { pageX: 290 });

		expect(defaultItemProviderProps.slideCallback).toHaveBeenCalledTimes(0);
		expect(defaultItemProviderProps.dragCallback).toHaveBeenCalledTimes(0);
	});

	it("should't listen mouse or touch event when swipiwing option false", async () => {
		const { getByTestId } = render(
			<ItemProvider {...defaultItemProviderProps} swiping={false} />,
		);
		const trackList = getByTestId('trackList');
		mockGetPageX = jest
			.spyOn(helpers, 'getPageX')
			.mockImplementation((_: MouseEvent) => 600);
		fireEvent.mouseDown(trackList, { pageX: 600 });

		mockGetPageX = jest
			.spyOn(helpers, 'getPageX')
			.mockImplementation((_: MouseEvent) => 390);
		fireEvent.mouseMove(trackList, { pageX: 390 });

		fireEvent.mouseUp(trackList, { pageX: 390 });

		expect(defaultItemProviderProps.dragCallback).toHaveBeenCalledTimes(0);
		expect(defaultItemProviderProps.slideCallback).toHaveBeenCalledTimes(0);
	});

	it("shouldn't call useWindowWidthCahnge hook when responsive option false", async () => {
		render(<ItemProvider {...defaultItemProviderProps} responsive={true} />);

		Object.defineProperty(window, 'innerWidth', { value: 5 });
		fireEvent(window, new Event('resize'));
	});
});
