import axios from 'axios';

interface Props {
  url: string;
  options?: object;
}

const BASE_URL = 'http://localhost:5000';

const axiosDefaultApi = ({url, options}: Props) => {
  const instance = axios.create({baseURL: url, ...options});
  return instance;
};

export const defaultInstance = axiosDefaultApi({url: BASE_URL});
