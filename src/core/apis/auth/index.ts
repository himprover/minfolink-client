import {defaultInstance} from 'core/utils/axios';

interface PostSignInRequestProps {
  accessToken: string;
}
interface PostSignInResponseProps {
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

// export const postSignIn = async ({
//   accessToken,
// }: PostSignInRequestProps): Promise<PostSignInResponseProps> => {
//   const url = '/auth/signin';
//   const body = {accessToken: accessToken};
//   try {
//     const {data} = await defaultInstance.post(url, body);
//     return data;
//   } catch (error: unknown) {
//     const {response} = error as AxiosError;

//     if (response!.status === 401) {
//       throw new UnAuthorizedError();
//     } else if (response!.status === 403) {
//       throw new ForbiddenError();
//     } else {
//       throw new UnknownError();
//     }
//   }
// };
