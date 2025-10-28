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

router.post("/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    failureMessage: true
  })
);

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) console.log(err);
  });
  res.redirect("/auth/login");
});

export default router;
