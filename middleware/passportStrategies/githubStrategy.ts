import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import { Profile } from 'passport';
import { VerifyCallback } from "passport-oauth2";
import { getGithubUserByProfile } from "../../controllers/userController";


type PassportDone = (
  error: Error | null,
  user?: Express.User | false,
  info?: { message: string }
) => void;

const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: process.env.CLIENT_ID!,
        clientSecret: process.env.CLIENT_SECRET_KEY!,
        callbackURL: "http://localhost:3000/auth/github/callback",
        passReqToCallback: true,
    },
    
    ( 
        req: Express.Request, 
        accessToken: string, 
        refreshToken: string, 
        profile: Profile, 
        done: PassportDone ) => 
            {
            const user = getGithubUserByProfile(profile.id);
        
            return user
            ? done(null, user)
            : done(null, false, {
                message: "Your login details are not valid. Please try again",
                });
            },
);

const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
