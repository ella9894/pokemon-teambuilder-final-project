const router = require("express").Router();
const {
  createUser,
  getSingleUser,
  saveTeam,
  deleteTeam,
  login,
} = require("../../controllers/user-controller");

const { authMiddleware } = require("../../utils/auth");

router.route("/").post(createUser).put(authMiddleware, saveTeam);

router.route("/login").post(login);

router.route("/me").get(authMiddleware, getSingleUser);

router.route("/teams/:_id").delete(authMiddleware, deleteTeam);

module.exports = router;
