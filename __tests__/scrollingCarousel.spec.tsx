import React, { MouseEvent } from 'react';
import { render, cleanup } from '@testing-library/react';
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
				writable: true
			},
			scrollLeft: {
				value: 100,
				writable: true
			},
			offsetWidth: {
				value: 200,
				writable: true
			},
		});

		jest.useFakeTimers();
		mockGetPageX = jest
			.spyOn(helpers, 'getPageX')
			.mockImplementation((_: MouseEvent) => 600);
	});

	it('should render right layout', async () => {
		const { getByTestId } = render(
			<ScrollingCarousel
				children={carouselItemNodes(6)}
			/>,
		);
		const carousel = getByTestId('carousel');

		expect(carousel.firstChild);
		expect(carousel.firstChild!.firstChild).toBeTruthy();
	});

	it('should render arrow icons', async () => {
		const { getByTestId } = render(
			<ScrollingCarousel
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
		expect(leftArrow!.firstChild).toBeInstanceOf(HTMLElement);
	});
});
