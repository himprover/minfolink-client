import type {AppProps} from 'next/app';
import {SessionProvider} from 'next-auth/react';
import {ThemeProvider} from 'styled-components';
import {GlobalStyle} from 'styles/global-styles';
import {lightTheme} from 'styles/theme';

function MyApp({Component, pageProps}: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}

export default MyApp;
