import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { Arrow } from '../src/components/arrow';

describe('<Arrow />', () => {
	afterEach(cleanup);

	it('should call onClick prop when click event occurs', async () => {
		const onClick = jest.fn();
		const { getByRole } = render(<Arrow direction="left" onClick={onClick} />);

		fireEvent.click(getByRole('button'));
		expect(onClick).toHaveBeenCalled();
	});

	it('should have the correct aria-label when direction is right', () => {
		const { getByRole } = render(<Arrow direction="right" />);
		expect(getByRole('button')).toHaveAttribute('aria-label', 'Sağa kaydır');
	});

	it('should have the correct aria-label when direction is left', () => {
		const { getByRole } = render(<Arrow direction="left" />);
		expect(getByRole('button')).toHaveAttribute('aria-label', 'Sola kaydır');
	});
});
