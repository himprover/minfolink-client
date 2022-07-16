import {authInstance} from 'core/utils/axios';

export interface GetUserResponseProps {
  id: number;
  email: string;
  link: string;
  nickname: string;
  profile_image: string;
  refresh_token: string;
  is_enabled: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  terms: boolean;
  privacy: boolean;
  marketing: boolean;
}

export const getUser = async (): Promise<GetUserResponseProps> => {
  const {data} = await authInstance.get('/user');
  return data;
};
