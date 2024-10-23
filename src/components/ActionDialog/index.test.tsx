import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import ActionDialog from './';
import { ActionDialogProps } from './type';

describe('Component: ActionDialog', () => {
	const basicProps: Omit<ActionDialogProps, 'onConfirm'> = {
		title: 'Action Dialog Title',
		confirmButtonText: 'Confirm Button Text',
		openDialogButtonText: 'Open Dialog Button Text',
	};

	it('should open Dialog', async () => {
		render(<ActionDialog {...basicProps} onConfirm={jest.fn} />);
		const openDialogButton = screen.getByRole('button', {
			name: basicProps.openDialogButtonText,
		});
		await userEvent.click(openDialogButton);

		screen.getByText(basicProps.title);
	});

	it('should call onConfirm', async () => {
		const onConfirm = jest.fn();

		render(<ActionDialog {...basicProps} onConfirm={onConfirm} />);
		const openDialogButton = screen.getByRole('button', {
			name: basicProps.openDialogButtonText,
		});
		await userEvent.click(openDialogButton);

		const confirmButton = screen.getByRole('button', {
			name: basicProps.confirmButtonText,
		});

		await userEvent.click(confirmButton);

		expect(onConfirm).toHaveBeenCalled();
	});
});
