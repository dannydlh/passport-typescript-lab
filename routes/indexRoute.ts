import express from "express";
const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";

router.get("/", (req, res) => {
  res.send("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  res.render("dashboard", {
    user: req.user,
  });
});

router.get("/admin", ensureAuthenticated, (req, res) => {

  if (req.user!.role === "admin") {
    if (req.sessionStore && req.sessionStore.all) {
      req.sessionStore.all((err, loggedInUsers) => {

        const userSessions = Object.entries(loggedInUsers!).map(([id, session]) => {
          return {
            id,
            userId: session.passport?.user
          };
        })

        res.render("admin", {
          user: req.user,
          sessions: userSessions
      });
      })
    }
  } else {
    res.redirect("dashboard");
  }
})

router.post("/admin/:id/revoke", (req, res) => {
      if (req.sessionStore && req.sessionStore.all) {
        req.sessionStore.destroy(req.params.id);
      }
      res.redirect("/admin");
})

export default router;
