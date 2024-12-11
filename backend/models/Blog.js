const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    img: { type: String, default: "" },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    description: { type: String, default: "" },
    reviews: [
      {
        user: { type: String, required: true },
        text: { type: String, required: true },
        stars: {
          type: Number,
          default: 0,
          min: [1, "Stars must be between 1 and 5"],
          max: [5, "Stars must be between 1 and 5"],
        },
      },
    ],
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
