import NextAuth from 'next-auth/next';
import FacebookProvider from 'next-auth/providers/facebook';

const providers = [
  FacebookProvider({
    clientId: process.env.FACEBOOK_TEST_APP_ID as string,
    clientSecret: process.env.FACEBOOK_TEST_APP_SECRET_ID as string,
  }),
];

export default NextAuth({
  providers: providers,
  callbacks: {
    async jwt({token, account}) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({session, token, user}) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
  },
  secret: process.env.NEXT_AUTH_SECRET,
});
