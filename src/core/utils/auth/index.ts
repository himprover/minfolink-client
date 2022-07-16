import cookie from 'react-cookies';
import {PostSignInResponseProps} from 'core/apis/auth';

export const setToken = ({
  accessToken,
  refreshToken,
}: PostSignInResponseProps) => {
  const HTTP_ONLY: boolean =
    process.env.NODE_ENV === 'development' ? false : true;

  cookie.save('accessToken', accessToken, {
    path: '/',
    httpOnly: HTTP_ONLY,
  });
  cookie.save('refreshToken', refreshToken, {
    path: '/',
    httpOnly: HTTP_ONLY,
  });
};
