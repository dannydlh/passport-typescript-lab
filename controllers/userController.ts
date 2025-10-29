import {userModel} from "../models/userModel";
import type { TUser } from "../types/types";

const getUserByEmailIdAndPassword = (email: string, password: string) => {
  const result = userModel.findOne(email);
  const user = result.user;
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};

const getGithubUserByProfile = (profile: string) => {
  const result = userModel.findOne(profile);
  const user = result.user;
  if (user) {
    return user;
  }
  return null;
}

const getUserById = (id:number) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

const getUserByGithubId = (id:string) => {
  let user = userModel.findByGitHubId(id) || null;
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user: TUser, password: string) {
  return user.password === password;
}



export {
  getUserByEmailIdAndPassword,
  getUserById,
  getUserByGithubId,
  getGithubUserByProfile
};
