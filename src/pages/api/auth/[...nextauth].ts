import {postSignIn} from 'core/apis/auth';
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
      if (account && account.access_token) {
        // accessToken, refreshToken 받아옴
        const serverToken = await postSignIn({
          accessToken: account.access_token,
        });

        // 토큰 못받아오면(로그인실패)
        if (serverToken === null) {
          return false;
        }

        // 토큰 받아왔으면(로그인성공) 토큰 저장
        account.serverToken = serverToken;
        return true;
      }
      return false;
    },
    async jwt({token, account}) {
      if (account) {
        token.userId = account.providerAccountId;
        token.accessToken = account.serverToken.accessToken;
        token.refreshToken = account.serverToken.refreshToken;
      }
      return token;
    },
    async session({session, token}) {
      if (session.user) {
        session.user.id = token.userId;
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
      }
      return session;
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
});
