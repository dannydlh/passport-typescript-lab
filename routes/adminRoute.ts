import express from "express";
const router = express.Router();
import { ensureAuthenticated } from "../middleware/checkAuth";

router.get("/", ensureAuthenticated, (req, res) => {
    res.render("admin", {
    user: req.user,
    sessions: req.session
  });
});

export default router;
