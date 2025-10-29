import {userModel} from "../models/userModel";
import { database } from "../models/userModel";

const getUserByEmailIdAndPassword = (email: string, password: string) => {
  const result = userModel.findOne(email);
  const user = result;
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
    throw new Error("Password is incorrect");
  }
  throw new Error(`Couldn't find user with email: ${email}`);
};

const getUserById = (id:number) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  throw new Error("Couldn't find user");
};

function isUserValid(user: any, password: string) {
  return user.password === password;
}

function findOrCreate(profile: any) {
  try {
      return userModel.findById(profile.id);
  } catch {
      console.log("user created");
      const user = {id: profile.id, name: profile.displayName || profile.username, role: "user"};
      database.push(user);
      return user;
  }
}

export {
  getUserByEmailIdAndPassword,
  getUserById,
  findOrCreate
};
