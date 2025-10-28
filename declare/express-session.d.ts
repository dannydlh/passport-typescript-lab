import { TUser } from "../types/types";
import 'express-session';

declare global {
  namespace Express {
    interface User extends TUser{
    }
  }
}

declare module 'express-session' {
  interface SessionData {
    messages?: string[];
    user?: TUser;
  }
}

export {};