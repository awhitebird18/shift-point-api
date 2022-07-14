import ProductNews from "../models/productNewsModel.js";

export const getPosts = async (req, res) => {
  const posts = await ProductNews.find({});

  res.status(200).json({
    status: "success",
    data: posts,
  });
};

export const createPost = async (req, res) => {
  const post = req.body;
  post.createdAt = Date.now();

  const newPost = await ProductNews.create(req.body);

  res.status(201).json({
    status: "success",
    data: newPost,
  });
};

export const updatePost = async (req, res) => {
  const id = req.params.id;
  const updatedPost = await ProductNews.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  res.status(200).json({
    status: "success",
    data: updatedPost,
  });
};

export const deletePost = async (req, res) => {
  const id = req.params.id;

  await ProductNews.findByIdAndDelete(id);

  req.status(204).json({
    status: "success",
  });
};
