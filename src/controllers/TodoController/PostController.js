import PostModel from "../../models/TodoModel/PostModel";
import PostValidation from "../../validation/TodoValidation/PostValidation";

const createPost = async (req, res) => {
  const post = {
    title: req.body.title,
    description: req.body.description,
    url: req.body.url,
    status: req.body.status,
  };

  //check title

  if (!post.title) {
    return res.status(400).json({
      success: false,
      message: "Tittle is required!",
    });
  }

  //check validate req.body
  const { error } = PostValidation(post);

  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }

  // success

  try {
    const url = post.url;
    const newPost = await new PostModel({
      title: post.title,
      description: post.description,
      url: url?.startsWith("https://") ? post.url : `https://${post.url}`,
      status: post.status || "TO LEARN",
      user: req.userId, //req.userId nay khong phai nguoi dung nhap ma ta da cho middleware gan gia tri userId tuong ung voi token (noi cach khac, nguoi dung chi nhap token va middleware da truy nguoc lai userId tuong ung) sau khi next()
    });
    await newPost.save();
    return res.status(200).json({
      success: true,
      message: "Happy learning",
      post: newPost,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internet server error!",
    });
  }
};

const readPosts = async (req, res) => {
  try {
    const posts = await PostModel.find({ user: req.userId }).populate("user", [
      "createdAt",
      "username",
    ]);
    return res.status(200).json({
      success: true,
      message: "get all post",
      data: posts,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(403).json({
      success: false,
      message: "server disconnected",
    });
  }
};

const updatePost = async (req, res) => {
  const postId = req.params.id;
  if (!postId) {
    return res
      .status(400)
      .json({ success: false, message: "Missing params id" });
  }
  try {
    const posts = await PostModel.find({ user: req.userId });
    const currentPost = posts.find((p) => p.id === postId);
    if (!currentPost) {
      return res
        .status(400)
        .json({ success: false, message: "Post not found!" });
    }
    const url = req.body.url;
    const updatePost = {
      title: req.body.title,
      status: req.body.status || "TO LEARN",
      description: req.body.description || "",
      url: url?.startsWith("https://") ? url : `https://${url}`,
    };
    const { error } = await PostValidation(updatePost);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    //success
    const updateCondition = { _id: req.params.id };
    const updatePostModel = await PostModel.findOneAndUpdate(
      updateCondition,
      updatePost,
      { new: true }
    );

    console.log(updatePostModel);
    return res.status(200).json({
      success: true,
      message: "Update post success!",
      data: updatePost,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(403).json({
      success: false,
      message: "server disconnected",
    });
  }
};

const deletePost = async (req, res) => {
  const postId = req.params.id;
  if (!postId) {
    return res.status(400).json({
      success: false,
      message: "Post not found!",
    });
  }
  try {
    await PostModel.deleteOne({ _id: postId });

    return res.status(200).json({
      success: true,
      message: "Post deleted!",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(403).json({
      success: false,
      message: "Server disconnected!",
    });
  }
};

module.exports = {
  createPost: createPost,
  readPosts: readPosts,
  updatePost: updatePost,
  deletePost: deletePost,
};
