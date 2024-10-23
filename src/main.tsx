/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable import/no-unresolved */
import App from './App';
import { createRoot } from 'react-dom/client';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme, StyledEngineProvider } from '@mui/material/styles';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const theme = createTheme();

function renderApp() {
	const queryClient = new QueryClient();

	createRoot(document.getElementById('root')!).render(
		<QueryClientProvider client={queryClient}>
			<StyledEngineProvider injectFirst>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<App />
				</ThemeProvider>
			</StyledEngineProvider>
		</QueryClientProvider>
	);
}

if (process.env.NODE_ENV === 'development') {
	import('./mocks/browser').then(renderApp);
} else {
	renderApp();
}
