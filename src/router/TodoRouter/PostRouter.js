import express from "express";
import PostController from "../../controllers/TodoController/PostController";

//import middleware (bac bao ve)
import verifyToken from "../../middleware/Todo/UserMiddleware";

const Router = express.Router();

const PostRouter = (app) => {
  Router.post("/createPost", verifyToken, PostController.createPost);

  Router.get("/", verifyToken, PostController.readPosts);

  Router.put("/updatePost/:id", verifyToken, PostController.updatePost);

  Router.delete("/deletePost/:id", verifyToken, PostController.deletePost);

  return app.use("/api/Todo/Post", Router);
};

module.exports = PostRouter;
