import {getUser} from 'core/apis/user';
import {GetServerSidePropsContext, GetServerSidePropsResult} from 'next';
import cookies from 'next-cookies';
import cookie from 'react-cookies';

import {dehydrate, QueryClient} from 'react-query';

type CustomGetServerSideProps = (
  queryClient: QueryClient
) => (
  context: GetServerSidePropsContext
) => Promise<GetServerSidePropsResult<any> | void>;

export const withUser =
  (gssp: CustomGetServerSideProps) =>
  async (context: GetServerSidePropsContext) => {
    const allCookie = cookies(context);
    cookie.save('accessToken', allCookie.accessToken ?? '', {path: '/'});
    cookie.save('refreshToken', allCookie.refreshToken ?? '', {path: '/'});

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery('user', async () => await getUser());

    await gssp(queryClient)(context);

    cookie.remove('accessToken');
    cookie.remove('refreshToken');

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  };
