import type {DefaultSession, DefaultUser} from 'next-auth';
import type {DefaultJWT} from 'next-auth/jwt';

import NextAuth from 'next-auth/next';
import FacebookProvider from 'next-auth/providers/facebook';

// 필요한 type 추가 선언
declare module 'next-auth' {
  export interface Session extends Record<string, unknown>, DefaultSession {
    user?: DefaultUser;
    accessToken?: string;
  }
}
declare module 'next-auth/jwt' {
  export interface JWT extends Record<string, unknown>, DefaultJWT {
    userId: string;
    accessToken?: string;
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
    async jwt({token, account}) {
      if (account) {
        token.accessToken = account.access_token;
        token.userId = account.providerAccountId;
      }
      return token;
    },
    async session({session, token}) {
      session.accessToken = token.accessToken;
      if (session.user) {
        session.user.id = token.userId;
      }
      return session;
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
});
