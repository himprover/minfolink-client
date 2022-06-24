import {defaultInstance} from 'core/utils/axios';

export interface PostSignInRequestProps {
  accessToken: string;
}
export interface PostSignInResponseProps {
  accessToken: string;
  refreshToken: string;
}

// 로그인 요청 API
// 로그인 요청 실패 시(catch) throw error
export const postSignIn = async ({
  accessToken,
}: PostSignInRequestProps): Promise<PostSignInResponseProps> => {
  const url = '/auth/signin';
  const body = {accessToken: accessToken};
  const {data} = await defaultInstance.post(url, body);
  return data;
};
