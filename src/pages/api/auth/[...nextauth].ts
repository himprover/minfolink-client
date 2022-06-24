import {AxiosError} from 'axios';
import {postSignIn} from 'core/apis/auth';
import {ApiError} from 'core/apis/error';
import type {DefaultAccount, DefaultSession, DefaultUser} from 'next-auth';
import type {DefaultJWT} from 'next-auth/jwt';

import NextAuth from 'next-auth/next';
import FacebookProvider from 'next-auth/providers/facebook';

// 필요한 type 추가 선언
declare module 'next-auth' {
  export interface Account extends Record<string, unknown>, DefaultAccount {
    serverToken: {
      accessToken: string;
      refreshToken: string;
    };
  }
  export interface Session extends Record<string, unknown>, DefaultSession {
    user?: DefaultUser;
    accessToken?: string;
    refreshToken?: string;
  }
}
declare module 'next-auth/jwt' {
  export interface JWT extends Record<string, unknown>, DefaultJWT {
    userId: string;
    accessToken?: string;
    refreshToken?: string;
  }
}

const PROVIDERS = [
  FacebookProvider({
    clientId: process.env.FACEBOOK_TEST_APP_ID as string,
    clientSecret: process.env.FACEBOOK_TEST_APP_SECRET_ID as string,
  }),
];

export default NextAuth({
  providers: PROVIDERS,
  callbacks: {
    async signIn({account}) {
      try {
        if (account && account.access_token) {
          // accessToken, refreshToken 받아옴
          const serverToken = await postSignIn({
            accessToken: account.access_token,
          });
          if (serverToken) {
            account.serverToken = serverToken;
            return true;
          }
          return false;
        }
        return false;
      } catch (error) {
        if ((error as AxiosError).response?.status === 401) {
          return '/auth/error?type=UnAuthorized';
        } else if ((error as AxiosError).response?.status === 403) {
          return `/auth/error?type=Forbidden&accessToken=${account.access_token}`;
        } else {
          return '/auth/error?type=Unknown';
        }
      }
    },
    async jwt({token, account}) {
      if (account) {
        token.accessToken = account.serverToken.accessToken;
        token.refreshToken = account.serverToken.refreshToken;
      }
      return token;
    },
    async session({session, token}) {
      if (session.user) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
      }
      return session;
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
});
