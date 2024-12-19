import React from "react";
import "./BlogItem.css";

const BlogItem = ({ blog }) => {
  
  return (
    <li className="blog-item">
      <a href="#" className="blog-image">
        <img src={blog.img} alt="" />
      </a>
      <div className="blog-info">
        <div className="blog-info-top">
          <span>{new Date(blog.createdAt).toLocaleDateString("en-US", {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}</span>-
          <span>0 Comments</span>
        </div>
        <div className="blog-info-center">
          <a href="#">{blog.name}</a>
        </div>
        <div className="blog-info-bottom">
          <a href="#">Read More</a>
        </div>
      </div>
    </li>
  );
};

export default BlogItem;
