import dotenv from 'dotenv';
dotenv.config();

import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import { getUserById, findOrCreate } from "../../controllers/userController";
import passport from "passport";

const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: process.env.CLIENT_ID!,
        clientSecret: process.env.CLIENT_SECRET_KEY!,
        callbackURL: "http://localhost:8000/auth/github/callback",
        passReqToCallback: true,
    },
    
    async ( 
        req: Express.Request, 
        accessToken: string, 
        refreshToken: string, 
        profile: any, 
        done: (err?: Error | null, user?: Express.User, info?: object) => void ) => 
            {
                done(null, findOrCreate(profile));
            },
);

passport.serializeUser((user:Express.User, done: (err: any, id?: unknown) => void) => {
  done(null, user.id);
});

passport.deserializeUser((id: number, done: (err: any, user?: Express.User | false | null) => void) => {
    try {
      let user = getUserById(id);
      done(null, user);
    } catch(err: any) {
      done({ message: err.message }, null);
    }
  });

const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
