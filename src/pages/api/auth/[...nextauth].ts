import NextAuth from 'next-auth/next';
import FacebookProvider from 'next-auth/providers/facebook';

export default NextAuth({
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_TEST_APP_ID as string,
      clientSecret: process.env.FACEBOOK_TEST_APP_SECRET_ID as string,
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,
});
