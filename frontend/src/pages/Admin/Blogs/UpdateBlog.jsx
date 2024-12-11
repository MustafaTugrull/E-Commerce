import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBlog = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const params = useParams();
  const blogId = params.id;
  const formLayout = "vertical";
  const { TextArea } = Input;
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/categories");

      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        message.error("Kategoriler alınamadı.");
      }
    } catch (error) {
      message.error("Sunucu hatası...");
    }
  };

  const getBlog = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/blogs/${blogId}`);
      if (response.ok) {
        const data = await response.json();
        form.setFieldsValue({
          ...data,
        });
      } else {
        message.error("Blog verisi alınamadı.");
      }
    } catch (error) {
      message.error("Sunucu hatası...");
    }
  };

  const updateBlog = async (values) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/blogs/${blogId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      if (response.ok) {
        message.success("Blog başarıyla güncellendi.");
        navigate("/admin/blogs");
      } else {
        message.error("Blog güncelleme işleminde hata meydana geldi.");
      }
    } catch (error) {
      console.log("Sunucu hatası...");
    }
  };

  useEffect(() => {
    getBlog();
    getCategories();
  }, [blogId]);

  return (
    <div>
      <h4>Blog Update Panel</h4>
      <Form
        layout={formLayout}
        form={form}
        initialValues={{ layout: formLayout }}
        onFinish={updateBlog}
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
            Update Blogs
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateBlog;
