import React, { MouseEvent } from 'react';
import { render, cleanup, fireEvent, wait, waitFor } from '@testing-library/react';
import { ScrollingCarousel } from '../src';
import { carouselItemNodes } from './__fixtures__/nodes';
import * as helpers from '../src/helpers';

describe('<ScrollingCarousel />', () => {
	let mockGetPageX: jest.SpyInstance<
		number,
		[React.TouchEvent<Element> | React.MouseEvent<Element, globalThis.MouseEvent>]
	>;

	afterEach(() => {
		mockGetPageX.mockRestore();
		jest.clearAllTimers();
		jest.resetAllMocks();
		cleanup();
	});

	beforeEach(() => {
		Object.defineProperties(HTMLDivElement.prototype, {
			scrollWidth: {
				value: 1000,
				writable: true,
			},
			scrollLeft: {
				value: 100,
				writable: true,
			},
			offsetWidth: {
				value: 200,
				writable: true,
			},
		});

		jest.useFakeTimers();
		mockGetPageX = jest
			.spyOn(helpers, 'getPageX')
			.mockImplementation((_: MouseEvent) => 600);
	});

	it('should render right layout', async () => {
		const { getByTestId } = render(
			<ScrollingCarousel triggerClickOn={3} children={carouselItemNodes(6)} />,
		);
		const carousel = getByTestId('carousel');

		expect(carousel.firstChild);
		expect(carousel.firstChild!.firstChild).toBeTruthy();
	});

	it('should render right arrow icon', async () => {
		const { getByTestId } = render(
			<ScrollingCarousel
				triggerClickOn={3}
				rightIcon={<i />}
				children={carouselItemNodes(6)}
			/>,
		);
		const carousel = getByTestId('carousel');
		const rightArrow = carousel.querySelector('[data-arrow="right"]');
		const leftArrow = carousel.querySelector('[data-arrow="left"]');
		expect(carousel.firstChild);
		expect(carousel.firstChild!.firstChild).toBeTruthy();
		expect(rightArrow!.firstChild).toBeInstanceOf(HTMLElement);
		expect(leftArrow).toBe(null);
	});

	it('should render left arrow icon', async () => {
		const { getByTestId } = render(
			<ScrollingCarousel
				triggerClickOn={3}
				leftIcon={<i />}
				children={carouselItemNodes(6)}
			/>,
		);
		const carousel = getByTestId('carousel');
		const rightArrow = carousel.querySelector('[data-arrow="right"]');
		const leftArrow = carousel.querySelector('[data-arrow="left"]');
		expect(carousel.firstChild);
		expect(carousel.firstChild!.firstChild).toBeTruthy();
		expect(rightArrow).toBe(null);
		expect(leftArrow!.firstChild).toBeInstanceOf(HTMLElement);
	});

	it('should add sliding class when isDown is true', async () => {
		jest.spyOn((window as any).Math, 'abs').mockReturnValue(4);

		const { getByTestId, container } = render(
			<ScrollingCarousel
				triggerClickOn={3}
				leftIcon={<i />}
				children={carouselItemNodes(6)}
			/>,
		);

		const sliderList = getByTestId('sliderList');
		fireEvent.mouseDown(sliderList, { pageX: 600 });
		fireEvent.mouseMove(sliderList, { pageX: 600 });

		wait(() => {
			expect(container.querySelector('.sliding')).toBeInTheDocument();
		});
	});

	it('should remove sliding class when isDown is false', async () => {
		const { getByTestId } = render(
			<ScrollingCarousel
				triggerClickOn={3}
				leftIcon={<i />}
				children={carouselItemNodes(6)}
			/>,
		);

		const sliderList = getByTestId('sliderList');
		fireEvent.mouseDown(sliderList, { pageX: 600 });
		fireEvent.mouseMove(sliderList, { pageX: 605 }); // Ensure some movement occurs
		fireEvent.mouseUp(sliderList);

		await waitFor(() => {
			expect(sliderList).not.toHaveClass('sliding');
		});
	});
});
