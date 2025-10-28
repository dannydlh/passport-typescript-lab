import { Strategy as GitHubStrategy } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import { Profile } from 'passport';
import { VerifyCallback } from "passport-oauth2";
import { getUserById } from "../../controllers/userController";

const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: process.env.CLIENT_ID!,
        clientSecret: process.env.CLIENT_SECRET_KEY!,
        callbackURL: "http://localhost:3000/auth/github/callback",
        passReqToCallback: true,
    },
    
    async ( req: Express.Request, accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback ) => {
      let user = getUserById(profile.id);
        
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
