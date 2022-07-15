import axios from 'axios';
import cookie from 'react-cookies';

interface Props {
  url: string;
  options?: object;
}

const BASE_URL = 'http://localhost:5000';

const axiosAuthApi = ({url, options}: Props) => {
  const instance = axios.create({baseURL: url, ...options});
  instance.interceptors.request.use(config => {
    const accessToken = cookie.load('accessToken');
    if (accessToken) {
      (config as any).headers.common['authorization'] = `Bearer ${accessToken}`;
    } else {
      (config as any).headers.common['authorization'] = 'Bearer ';
    }
    return config;
  });
  return instance;
};

export const authInstance = axiosAuthApi({url: BASE_URL});
