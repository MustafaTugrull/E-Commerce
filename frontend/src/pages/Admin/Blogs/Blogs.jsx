import React, { useEffect, useState } from "react";
import { Button, message, Space, Table } from "antd";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const [dataSource, setDataSource] = useState([]);
  const navigate = useNavigate();

  const getBlogs = async () => {
    try {
      const [categoryResponse, blogResponse] = await Promise.all([
        fetch("http://localhost:5000/api/categories"),
        fetch("http://localhost:5000/api/blogs"),
      ]);
      if (!categoryResponse.ok || !blogResponse.ok) {
        console.log("Veri getirilirken bir hata meydana geldi.");
      } else {
        const [categories, blogs] = await Promise.all([
          categoryResponse.json(),
          blogResponse.json(),
        ]);
        const blogList = blogs.map((blog) => {
          const categoryId = blog.category;
          const category = categories.find((item) => item._id === categoryId);

          return { ...blog, categoryName: category ? category.name : "" };
        });
        setDataSource(blogList);
      }
    } catch (error) {
      console.log("Sunucu hatası...");
    }
  };

  const deleteBlog = async (blogId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/blogs/${blogId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        message.success("Blog başarıyla silindi...");
        setDataSource((prevBlog) => {
          return prevBlog.filter((blog) => blog._id !== blogId);
        });
      } else {
        message.error("Silme işlemi başarısız...");
      }
    } catch (error) {
      console.log("Sunucu hatası...");
    }
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "img",
      key: "img",
      render: (text, record) => (
        <img
          src={`/${record.img}`}
          alt={"blog"}
          style={{ width: "100px", height: "100px", borderRadius: "8px" }}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space
          size="small"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Button
            onClick={() => navigate(`/admin/blogs/update/${record._id}`)}
            color="success"
            variant="solid"
          >
            Update
          </Button>
          <Button
            color="danger"
            variant="solid"
            onClick={() => deleteBlog(record._id)}
          >
            Remove
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <React.Fragment>
      <h2 style={{ marginBottom: "5px" }}>Blogs List</h2>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey={(item) => item._id}
      />
    </React.Fragment>
  );
};

export default Blogs;
