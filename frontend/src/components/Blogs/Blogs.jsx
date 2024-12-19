import React, { useEffect, useState } from "react";
import "./Blogs.css";
import BlogItem from "./BlogItem";
import { message } from "antd";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/blogs");
        if (response.ok) {
          const data = await response.json();
          setBlogs(data);
        } else {
          message.error("Bloglar getirilirken bir sorun meydana geldi...");
        }
      } catch (error) {
        console.log("Sunucu hatası...");
      }
    };
    getBlogs();
  }, []);
  return (
    <div>
      <section className="blogs blog-page">
        <div className="container">
          <div className="section-title">
            <h2>From Our Blog</h2>
            <p>Summer Collection New Morden Design</p>
          </div>
          <ul className="blog-list">
            {blogs.map((blog) => (
              <BlogItem key={blog._id} blog={blog} />
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Blogs;
