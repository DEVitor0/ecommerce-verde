import { ReactNode } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './mui/theme';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './redux/store';

export function AppProviders({ children }: { children: ReactNode }) {
	return (
		<ReduxProvider store={store}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</ReduxProvider>
	);
}
