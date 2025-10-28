import dotenv from 'dotenv';
dotenv.config();

import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import { Profile } from 'passport';
import { VerifyCallback } from "passport-oauth2";
import { getGithubUserByProfile, getUserByGithubId } from "../../controllers/userController";
import passport from "passport";
import type { TUser } from '../../types/types';


type PassportDone = (
  error: Error | null,
  user?: Express.User | false,
  info?: { message: string }
) => void;

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
        profile: Profile, 
        done: PassportDone ) => 
            {
                const user = await getGithubUserByProfile(profile.id);
                if (!user) {
                    const newUser =  {  
                        githubId: profile.id,
                        username: profile.username
                    };
                    return done(null, newUser);
                }
            
                return user
                ? done(null, user)
                : done(null, false, {
                    message: "Your login details are not valid. Please try again",
                    });
            },
);

passport.serializeUser((user:Express.User, done) => {
  done(null, user.githubId);
});

passport.deserializeUser((id: string, done) => {
  let user = getUserByGithubId(id);
  if (user) {
    //@ts-ignore
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
