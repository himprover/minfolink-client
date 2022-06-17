import {defaultInstance} from 'core/utils/axios';

interface PostSignInRequestProps {
  accessToken: string;
}
interface PostSignInResponseProps {
  accessToken: string;
  refreshToken: string;
}
// 로그인 요청 API
// 로그인 요청 실패 시 return null
export const postSignIn = async ({
  accessToken,
}: PostSignInRequestProps): Promise<PostSignInResponseProps | null> => {
  const url = '/auth/signin';
  const body = {accessToken: accessToken};
  try {
    const {data} = await defaultInstance.post(url, body);
    return data;
  } catch (error) {
    return null;
  }
};
