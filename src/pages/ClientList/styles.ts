import { Fab, Typography } from '@mui/material';
import styled from 'styled-components';

export const CardListContainer = styled.div`
	height: 100vh;
	background: #efefef;
	padding: 16px;
	position: relative;
`;

export const CardList = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
	gap: 16px;
	padding: 20px;
`;

export const ActionButton = styled(Fab)`
	position: absolute;
	right: 16px;
	bottom: 16px;
	background: #f7dd72;
`;

export const Title = styled(Typography)`
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const BasicText = styled(Typography)`
	margin-top: auto;
	height: 100%;
	margin-bottom: auto;
	display: flex;
	align-items: center;
	justify-content: center;
`;
