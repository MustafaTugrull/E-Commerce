import React from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";

const CreateCategory = () => {
  const [form] = Form.useForm();
  const formLayout = "vertical";
  const navigate = useNavigate();

  const handleCreateCategory = async (values) => {
    try {
      const response = await fetch("http://localhost:5000/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        navigate("/admin/categories");
      } else {
        console.log("Kayıt işleminde hata meydana geldi...");
      }
    } catch (error) {
      console.log("Sunucu hatası...", error);
    }
  };

  return (
    <div>
      <Form layout={formLayout} form={form} onFinish={handleCreateCategory}>
        <Form.Item label="Category Name" name="name">
          <Input placeholder="Category Name"  />
        </Form.Item>
        <Form.Item label="Image Url" name="image">
          <Input placeholder="Image Url" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Category
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateCategory;
