import cookie from 'react-cookies';
import {PostSignInResponseProps} from 'core/apis/auth';

export const setToken = ({
  accessToken,
  refreshToken,
}: PostSignInResponseProps) => {
  const HTTP_ONLY: boolean =
    process.env.NODE_ENV === 'development' ? false : true;

  const expires = new Date();
  expires.setDate(Date.now() + 1000 * 60 * 60 * 24);

  cookie.save('accessToken', accessToken, {
    path: '/',
    expires,
    httpOnly: HTTP_ONLY,
  });
  cookie.save('refreshToken', refreshToken, {
    path: '/',
    expires,
    httpOnly: HTTP_ONLY,
  });
};
