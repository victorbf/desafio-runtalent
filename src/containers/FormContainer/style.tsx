import { Typography } from '@mui/material';
import styled from 'styled-components';

export const FormContent = styled.form`
	display: flex;
	flex-direction: column;
	padding: 20px;
	gap: 12px;
`;

export const Title = styled(Typography)`
	justify-self: center;
	margin: 12px;
`;

export const TitleContent = styled.div`
	display: grid;
	grid-template-columns: auto 1fr;
	align-items: center;
`;
