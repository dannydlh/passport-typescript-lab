import { TUser } from "../types/types";

declare global {
  namespace Express {
    interface User extends TUser{
    }
  }
}

export {};