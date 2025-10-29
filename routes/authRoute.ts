import express from "express";
import passport from 'passport';
import { forwardAuthenticated } from "../middleware/checkAuth";

const router = express.Router();


router.get("/login", forwardAuthenticated, (req, res) => {
const messages = req.session.messages ?? [];
  res.render("login", { 
    messages: messages,
    lastMessageLocation: messages.length - 1,
    hasErrors: messages.length > 0
  });
})

/* router.post("/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    failureMessage: true
  })
); */

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      req.session.messages = [info.message || "Login failed"];
      return res.redirect("/auth/login");
    }

    req.logIn(user, (err) => {
      if (err) return next(err);
      user.role === "admin" ? res.redirect("/admin") : res.redirect("/dashboard");
    });
  })(req, res, next);
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  res.redirect("/auth/login");
});

router.get('/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/auth/login' }),
  function(req, res) {
    res.redirect('/dashboard');
  });

export default router;
