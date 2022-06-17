import type {AppContext, AppProps} from 'next/app';
import {getSession, SessionProvider} from 'next-auth/react';
import {ThemeProvider} from 'styled-components';
import {GlobalStyle} from 'styles/global-styles';
import {lightTheme} from 'styles/theme';
import App from 'next/app';
import {Header} from 'components/common/Header';
import {Session} from 'next-auth';

interface CustomAppProps extends AppProps {
  session: Session | null;
}

function MyApp({Component, pageProps, session}: CustomAppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider theme={lightTheme}>
        <GlobalStyle />
        <Header session={session} />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const session = await getSession(appContext.ctx);
  const appProps = await App.getInitialProps(appContext);
  return {...appProps, session: session};
};

export default MyApp;
