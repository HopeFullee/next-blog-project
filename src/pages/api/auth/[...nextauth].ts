import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: "b0d8c5a04b06a3eae072",
      clientSecret: "99b8ab9422c365bcad7656dd882c01b05212958b",
    }),

    CredentialsProvider({
      //1. 로그인페이지 폼 자동생성해주는 코드
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },

      //2. 로그인요청시 실행되는코드
      //직접 DB에서 아이디,비번 비교하고
      //아이디,비번 맞으면 return 결과, 틀리면 return null 해야함
      async authorize(credentials) {
        let db = (await connectDB).db("forum");
        let user = await db
          .collection("user_cred")
          .findOne({ email: credentials?.email });

        if (!user) {
          console.log("해당 이메일은 없음");
          throw new Error(
            JSON.stringify({ email: "*이메일 또는 비밀번호가 틀렸습니다." })
          );
        }

        if (credentials) {
          const pwcheck = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!pwcheck) {
            console.log("비번틀림");
            throw new Error(
              JSON.stringify({ email: "*이메일 또는 비밀번호가 틀렸습니다." })
            );
          }
        }

        return user as any;
      },
    }),
  ],

  //3. jwt 써놔야 잘됩니다 + jwt 만료일설정
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, //30일
  },

  callbacks: {
    //4. jwt 만들 때 실행되는 코드
    //user변수는 DB의 유저정보담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다.
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    //5. 유저 세션이 조회될 때 마다 실행되는 코드
    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },

  pages: {
    signIn: "/signin",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
