import type {AppContext, AppProps} from 'next/app';
import {getSession, SessionProvider} from 'next-auth/react';
import {ThemeProvider} from 'styled-components';
import {GlobalStyle} from 'styles/global-styles';
import {lightTheme} from 'styles/theme';
import App from 'next/app';
import {Header} from 'components/base/Header';
import {Session} from 'next-auth';
import {RecoilRoot} from 'recoil';

interface CustomAppProps extends AppProps {
  session: Session | null;
}

function MyApp({Component, pageProps, session}: CustomAppProps) {
  return (
    <RecoilRoot>
      <SessionProvider session={pageProps.session}>
        <ThemeProvider theme={lightTheme}>
          <GlobalStyle />
          <Header session={session} />
          <Component {...pageProps} />
        </ThemeProvider>
      </SessionProvider>
    </RecoilRoot>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const session = await getSession(appContext.ctx);
  const appProps = await App.getInitialProps(appContext);
  return {...appProps, session: session};
};

export default MyApp;
