import {Alert} from 'components/common/Alert';
import {UnAuthorizedError} from 'core/apis/auth/error';
import {useRouter} from 'next/router';
import {useEffect} from 'react';

const AuthErrorPage = () => {
  const router = useRouter();
  useEffect(() => {
    if (router.query?.error === 'ForbiddenError') {
      router.push('/auth/signup');
    } else if (router.query?.error === 'UnauthorizedError') {
      const alert = new UnAuthorizedError();

      Alert.fire(alert.alertTitle, alert.alertText, 'error').then(() => {
        router.back();
      });
    }
  }, []);
  return <></>;
};

export default AuthErrorPage;
