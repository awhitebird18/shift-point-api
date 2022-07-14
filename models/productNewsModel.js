import mongoose from "mongoose";

const productNewsSchema = new mongoose.Schema({
  createdAt: Date,
  title: String,
  article: String,
  image: String,
});

const ProductNews = mongoose.model("ProductNews", productNewsSchema);

export default ProductNews;
