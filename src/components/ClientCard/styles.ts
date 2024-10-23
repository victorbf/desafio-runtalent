import { Card, Typography, CardActions as MUICardActions } from '@mui/material';
import styled from 'styled-components';

export const Title = styled(Typography)`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	gap: 8px;
`;

export const CardBase = styled(Card)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	border-radius: 8px;
	color: #333;
`;

export const CardActions = styled(MUICardActions)`
	align-self: flex-end;
`;
