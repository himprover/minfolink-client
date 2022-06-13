import NextAuth from 'next-auth/next';
import FacebookProvider from 'next-auth/providers/facebook';

export default NextAuth({
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET_ID,
    }),
  ],
});
