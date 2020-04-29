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
});
