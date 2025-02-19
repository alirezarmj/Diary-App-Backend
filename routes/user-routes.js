const { Router } = require("express");
const { getAllUsers, getUserById, login, signup } = require("../controllers/user-controllers");

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", signup);
userRouter.get("/:id", getUserById);
userRouter.post("/login", login);

module.exports = userRouter;
