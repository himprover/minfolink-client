import {AxiosError} from 'axios';
import {postSignIn, PostSignInResponseProps} from 'core/apis/auth';
import {setToken} from 'core/utils/auth';
import type {GetServerSideProps} from 'next';
import {getSession} from 'next-auth/react';
import {useEffect} from 'react';
import {ForbiddenError, UnAuthorizedError} from 'core/apis/auth/error';
import {UnknownError} from 'core/apis/error';
import {Alert} from 'components/common/Alert';
import {useRouter} from 'next/router';

interface SigninProps {
  statusCode: number;
  serverToken: PostSignInResponseProps | null;
}

const Signin = ({statusCode, serverToken}: SigninProps) => {
  const router = useRouter();
  useEffect(() => {
    if (statusCode === 200) {
      setToken(serverToken!);
      router.push('/');
    } else if (statusCode === 401) {
      const alert = new UnAuthorizedError();
      Alert.fire(alert.alertTitle, alert.alertText, 'error').then(() =>
        router.back()
      );
    } else if (statusCode === 403) {
      const alert = new ForbiddenError();
      Alert.fire(alert.alertTitle, alert.alertText, 'info').then(() =>
        router.push(alert.redirectUrl)
      );
    } else {
      const alert = new UnknownError();
      Alert.fire(alert.alertTitle, alert.alertText, 'error').then(() =>
        router.back()
      );
    }
  }, []);
};

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  try {
    const session = await getSession({req});
    if (session?.accessToken) {
      const serverToken = await postSignIn({accessToken: session.accessToken});
      return {
        props: {
          statusCode: 200,
          serverToken: serverToken,
        },
      };
    }
    return {
      props: {
        statusCode: 401,
        serverToken: null,
      },
    };
  } catch (error) {
    return {
      props: {
        statusCode: (error as AxiosError).response?.status,
        serverToken: null,
      },
    };
  }
};

export default Signin;
