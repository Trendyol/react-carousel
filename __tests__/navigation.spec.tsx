import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Navigation } from '../src/components/navigation/navigation';
import { carouselItemNodes } from './__fixtures__/nodes';

describe('<Navigation />', () => {
	afterEach(cleanup);

	it('should render factory components in correct order', async () => {
		const onClick = jest.fn();
		const items = carouselItemNodes(5);
		const factory = (selected: boolean) => (
			<div>{selected ? 'selected' : 'unselected'}</div>
		);
		const { getByText, getAllByText } = render(
			<Navigation current={1} items={items} factory={factory} onClick={onClick} />,
		);

		expect(getByText('selected')).toBeTruthy();
		expect(getAllByText('unselected').length).toEqual(4);
	});

	it('should render call onClick callback for factory components', async () => {
		const onClick = jest.fn();
		const items = carouselItemNodes(5);
		const factory = (selected: boolean) => (
			<div>{selected ? 'selected' : 'unselected'}</div>
		);
		const { getByText } = render(
			<Navigation current={1} items={items} factory={factory} onClick={onClick} />,
		);

		fireEvent.mouseOver(getByText('selected'));
		expect(onClick).toHaveBeenCalled();
	});
});
