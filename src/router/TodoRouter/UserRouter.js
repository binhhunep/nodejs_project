import express from "express";
import UserController from "../../controllers/TodoController/UserController";
const Router = express.Router();

const usersRouter = (app) => {
  Router.get("/", UserController.getUsers);
  Router.post("/register", UserController.registerUser);
  Router.post("/login", UserController.checkLogin);

  return app.use("/api/Todo/User", Router);
};

module.exports = usersRouter;
