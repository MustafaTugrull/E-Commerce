import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, message } from "antd";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const formLayout = "vertical";
  const [categories, setCategories] = useState([]);
  const { TextArea } = Input;

  const getCategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/categories");

      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        console.log("Veri getirme işlemi başarısız...");
      }
    } catch (error) {
      console.log("Sunucu hatası...");
    }
  };

  const addBlog = async (values) => {
    try {
      const response = await fetch("http://localhost:5000/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        message.success("Blog başarıyla oluşturuldu.");
        navigate("/admin/blogs");
      } else {
        console.log("Kayıt işleminde hata meydana geldi...");
      }
    } catch (error) {
      console.log("Sunucu hatası...");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <h4>Blog Add Panel</h4>
      <Form
        layout={formLayout}
        form={form}
        initialValues={{ layout: formLayout }}
        onFinish={addBlog}
      >
        <Form.Item label="Blog Name" name="name">
          <Input placeholder="Blog Name" />
        </Form.Item>
        <Form.Item label="Image Url" name="img">
          <Input placeholder="Image Url" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          label="Category"
          name="category"
          rules={[{ required: true, message: "Please select a category!" }]}
        >
          <Select placeholder="Select a Category" style={{ width: "100%" }}>
            {categories.map((category) => (
              <Select.Option key={category._id} value={category._id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Blogs
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateBlog;
