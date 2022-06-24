import axios from 'axios';
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

  axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

  cookie.save('accessToken', accessToken, {
    path: '/',
    expires,
    httpOnly: HTTP_ONLY, // dev/prod 에 따라 true / false 로 받게 했다.
  });
  cookie.save('refreshToken', refreshToken, {
    path: '/',
    expires,
    httpOnly: HTTP_ONLY,
  });
};
