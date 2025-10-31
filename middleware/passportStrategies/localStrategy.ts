import passport from "passport";
import { Strategy as LocalStrategy, IVerifyOptions } from "passport-local";
import { getUserByEmailIdAndPassword, getUserById} from "../../controllers/userController";
import { PassportStrategy } from '../../interfaces/index';

const localStrategy = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  (email: string, password: string, done: (error: any, user?: false | Express.User | undefined, options?: IVerifyOptions) => void) => {
    try {
          const user = getUserByEmailIdAndPassword(email, password);
          done(null, user);
    } catch(error:any) {
      done(null, false, {
          message: error.message,
      });
    }
  }
);

passport.serializeUser((user:Express.User, done: (err: any, id?: number) => void) => {
  done(null, user.id);
});

passport.deserializeUser((id: number, done: (err: any, user?: Express.User | false | null) => void) => {
  try {
    let user = getUserById(id);
    done(null, user); // sets req.user
  } catch(err: any) {
    done({ message: err.message }, null);
  }
});

const passportLocalStrategy: PassportStrategy = {
  name: 'local',
  strategy: localStrategy,
};

export default passportLocalStrategy;
