import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import GitHubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET as string,
      version:'2.0',
    }),
    GitHubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET as string,
      version:'2.0'
    }),
    TwitterProvider({
      clientId: process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_TWITTER_CLIENT_SECRET as string,
      // version:'2.0'
    }),
  ],
  session: {
    strategy: "jwt"
},
  callbacks: {
    async jwt({ token, account, user }) {
      token.accessToken = account?.access_token;
      return { ...token, ...user, ...account };
  },

    async session({ session, token,user }) {
      // Pass the access token to the client
      //@ts-ignore
      session.accessToken = token.accessToken;
      return session;
    },
  },
  secret:'LlKq6ZtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx6gts=',
  pages: {
    signIn: "/",
    error: "/auth/error",
  },
});
