import { TUser } from "../types/types";

const database:TUser[] = [
  {
    id: 1,
    name: "Jimmy Smith",
    email: "jimmy123@gmail.com",
    password: "jimmy123!",
  },
  {
    id: 2,
    name: "Johnny Doe",
    email: "johnny123@gmail.com",
    password: "johnny123!",
  },
  {
    id: 3,
    name: "Jonathan Chen",
    email: "jonathan123@gmail.com",
    password: "jonathan123!",
  },
  {
    id: 4,
    githubId: "Benj",
    name: "Benjamin Franklin"
  }
];

const userModel = {

  findOne: (email: string) => {
    const user = database.find((user) => user.email === email);
    if (!user) {
      return {
        user: null,
      };
    }

    return { user };
  },
  findById: (id: number) => {
    const user = database.find((user) => user.id === id);
    return user ? { user, error: null } : { user: null, error: `User not found with id: ${id}` };
  },

  findByGitHubId: (githubId: string) => {
    const user = database.find(user => user.githubId === githubId);
    return user ? { user, error: null } : { user: null, error: `User not found with id: ${githubId}` };
  },

  create: (userData: { githubId: string; username: string; name?: string }) => {
    const newUser = {
      id: database.length + 1,
      ...userData,
    };
    database.push(newUser);
    return newUser;
  },
  
};

export { database, userModel };
