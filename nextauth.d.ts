import NextAuth, { DefaultSession } from 'next-auth';


declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      fullName: string;
      email: string;
      role: string;
      image?: string;
      token?: string;
    } & DefaultSession['user'];
  }
}