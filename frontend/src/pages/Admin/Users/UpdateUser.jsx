import React, { useEffect, useState } from "react";
import { Button, Form, Input, message, Select, Space } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const UpdateUser = () => {
  const [form] = Form.useForm();
  const formLayout = "vertical";
  const navigate = useNavigate();
  const params = useParams();
  const userId = params.id;

  const getUser = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userId}`);
      if (response.ok) {
        const data = await response.json();
        form.setFieldsValue({
          ...data,
        });
      } else {
        message.error("Kullanıcı verisi alınamadı.");
      }
    } catch (error) {
      message.error("Sunucu hatası...");
    }
  };

  const updateUser = async (values) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      if (response.ok) {
        message.success("Kullanıcı başarıyla güncellendi.");
        navigate("/admin/users");
      } else {
        message.error("Kullanıcı güncelleme işleminde hata meydana geldi.");
      }
    } catch (error) {
      console.log("Sunucu hatası...");
    }
  };

  useEffect(() => {
    getUser();
  }, [userId]);

  return (
    <div>
      <h2>User Update Panel</h2>
      <Form
        layout={formLayout}
        form={form}
        initialValues={{ layout: formLayout }}
        onFinish={updateUser}
      >
        <Form.Item label="User Name" name="username">
          <Input placeholder="User Name" />
        </Form.Item>
        <Form.Item label="Image Url" name="profileImage">
          <Input placeholder="Image Url" />
        </Form.Item>
        <Form.Item label="Email" name="email">
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item label="Role" name="role">
          <Select placeholder="Select Role">
            <Select.Option value="user">User</Select.Option>
            <Select.Option value="admin">Admin</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update User
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateUser;
