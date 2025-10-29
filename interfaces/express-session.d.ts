import "express-session";
import passport from "passport";

declare module "express-session" {
  interface SessionData {
    passport: passport
  }
}

declare global {
  namespace Express {
    interface User{
      id: number;
      name: string;
      email?: string;
      password?: string;
      role: string;
    }
  }
}

export {};