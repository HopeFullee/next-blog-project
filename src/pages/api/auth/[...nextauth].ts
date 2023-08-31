import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: "b0d8c5a04b06a3eae072",
      clientSecret: "99b8ab9422c365bcad7656dd882c01b05212958b",
    }),
  ],
  secret: "qwer1234",
};

export default NextAuth(authOptions);
