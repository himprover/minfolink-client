import {Alert} from 'components/common/Alert';
import {ForbiddenError, UnAuthorizedError} from 'core/apis/auth/error';
import {UnknownError} from 'core/apis/error';
import {useRouter} from 'next/router';
import {useEffect} from 'react';

const AuthErrorPage = () => {
  const router = useRouter();
  useEffect(() => {
    if (router.query.type === 'Unauthorized') {
      const alert = new UnAuthorizedError();
      Alert.fire(alert.alertTitle, alert.alertText, 'error').then(() => {
        router.back();
      });
    } else if (router.query.type === 'Forbidden') {
      const alert = new ForbiddenError();
      Alert.fire(alert.alertTitle, alert.alertText, 'info').then(() => {
        router.push(
          `${alert.redirectUrl}?accessToken=${router.query.accessToken}`
        );
      });
    } else {
      const alert = new UnknownError();
      Alert.fire(alert.alertTitle, alert.alertText, 'error').then(() => {
        router.back();
      });
    }
  }, []);
  return <></>;
};

export default AuthErrorPage;
