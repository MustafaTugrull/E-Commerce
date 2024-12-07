import React, { useEffect, useState } from "react";
import { Button, Space, Table } from "antd";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
  const [dataSource, setDataSource] = useState([]);
  const navigate = useNavigate();
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
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => navigate("/admin/blogs/update")}
            color="success"
            variant="solid"
          >
            Update
          </Button>
          <Button color="danger" variant="solid">
            Remove
          </Button>
        </Space>
      ),
    },
  ];

  const getBlogs = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/blogs");

      if (response.ok) {
        const data = await response.json();
        setDataSource(data);
      } else {
        console.log("Veri getirilirken bir sorun meydana geldi...");
      }
    } catch (error) {
      console.log("Sunucu hatası...");
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: "5px" }}>Blogs List</h2>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey={(item) => item._id}
      />
      ;
    </div>
  )
}

export default Blogs