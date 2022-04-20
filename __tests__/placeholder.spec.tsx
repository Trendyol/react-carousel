import React from 'react';
import { cleanup, fireEvent, render, waitFor } from '@testing-library/react';
import { PlaceHolder, PlaceHolderProps } from '../src/components/item/PlaceHolder';

describe('<Placeholder />', () => {
	const defaultPlaceholderProps: PlaceHolderProps = {
		index: 0,
		current: 0,
		slideToDirection: jest.fn(),
	};

	afterEach(() => {
		jest.resetAllMocks();
		cleanup();
	});

	it('should render component', async () => {
		render(<PlaceHolder {...defaultPlaceholderProps} />);
	});

	it('testing click event when index 0 current position is 0.', async () => {
		const mockProps = { ...defaultPlaceholderProps, index: 0, current: 0 };
		const { getByTestId } = render(<PlaceHolder {...mockProps} />);
		const placeholderContainer = getByTestId('placeholder');

		fireEvent.click(placeholderContainer);

		expect(mockProps.slideToDirection).toHaveBeenCalledTimes(0);
	});

	it('testing click event when index 1 current position is 0.', async () => {
		const itemOnClick = jest.fn();

		const mockProps = {
			...defaultPlaceholderProps,
			index: 1,
			current: 0,
			itemsRef: {
				current: [0, { firstChild: { click: itemOnClick } }],
			},
		};

		const { getByTestId } = render(<PlaceHolder {...mockProps} />);
		const placeholderContainer = getByTestId('placeholder');

		fireEvent.click(placeholderContainer);

		expect(mockProps.slideToDirection).toHaveBeenCalledTimes(1);

		await waitFor(() => expect(itemOnClick).toHaveBeenCalledTimes(1));
	});
	it('testing click event when index 1 current position is 2.', async () => {
		const itemOnClick = jest.fn();

		const mockProps = {
			...defaultPlaceholderProps,
			index: 1,
			current: 2,
			itemsRef: {
				current: [0, { firstChild: { click: itemOnClick } }],
			},
		};

		const { getByTestId } = render(<PlaceHolder {...mockProps} />);
		const placeholderContainer = getByTestId('placeholder');

		fireEvent.click(placeholderContainer);

		expect(mockProps.slideToDirection).toHaveBeenCalledTimes(1);

		await waitFor(() => expect(itemOnClick).toHaveBeenCalledTimes(1));
	});
});
