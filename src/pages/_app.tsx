import type {AppContext, AppProps} from 'next/app';
import {getSession, SessionProvider} from 'next-auth/react';
import {ThemeProvider} from 'styled-components';
import {GlobalStyle} from 'styles/global-styles';
import {lightTheme} from 'styles/theme';
import App from 'next/app';
import {Header} from 'components/base/Header';
import {RecoilRoot} from 'recoil';
import {useState} from 'react';
import {Hydrate, QueryClient, QueryClientProvider} from 'react-query';
import cookies from 'next-cookies';
import {authInstance} from 'core/utils/axios';

function MyApp({Component, pageProps}: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <RecoilRoot>
          <SessionProvider session={pageProps.session}>
            <ThemeProvider theme={lightTheme}>
              <GlobalStyle />
              <Header />
              <Component {...pageProps} />
            </ThemeProvider>
          </SessionProvider>
        </RecoilRoot>
      </Hydrate>
    </QueryClientProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const session = await getSession(appContext.ctx);
  const appProps = await App.getInitialProps(appContext);

  return {...appProps, session: session};
};

export default MyApp;
