import React from "react";
import "./Blogs.css";
import BlogItem from "./BlogItem";

const Blogs = () => {
  return (
    <div>
      <section className="blogs blog-page">
        <div className="container">
          <div className="section-title">
            <h2>From Our Blog</h2>
            <p>Summer Collection New Morden Design</p>
          </div>
          <ul className="blog-list">
            <BlogItem/>            
            <li className="blog-item">
              <a href="#" className="blog-image">
                <img src="img/blogs/blog2.jpg" alt="" />
              </a>
              <div className="blog-info">
                <div className="blog-info-top">
                  <span>25 Feb, 2021 </span>-<span>0 Comments</span>
                </div>
                <div className="blog-info-center">
                  <a href="#">Aliquam hendrerit mi metus</a>
                </div>
                <div className="blog-info-bottom">
                  <a href="#">Read More</a>
                </div>
              </div>
            </li>
            <li className="blog-item">
              <a href="#" className="blog-image">
                <img src="img/blogs/blog3.jpg" alt="" />
              </a>
              <div className="blog-info">
                <div className="blog-info-top">
                  <span>25 Feb, 2021 </span>-<span>0 Comments</span>
                </div>
                <div className="blog-info-center">
                  <a href="#">Aliquam hendrerit mi metus</a>
                </div>
                <div className="blog-info-bottom">
                  <a href="#">Read More</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Blogs;