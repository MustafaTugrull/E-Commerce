import React, { useEffect, useState } from "react";
import { Button, Form, Input, Checkbox, Select, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const params = useParams();
  const productId = params.id;
  const formLayout = "vertical";
  const { TextArea } = Input;
  const [categories, setCategories] = useState([]);
  const plainOptions = ["red", "blue", "green", "purple", "black"];
  const sizeOption = ["XS", "SM", "M", "L", "XL", "XXL"];
  
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

  const getProduct = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${productId}`)
      if (response.ok) {
        const data = await response.json();
        form.setFieldsValue({
          ...data,
          colors: data.colors , 
          sizes: data.sizes ,       
        });
      } else {
        message.error("Ürün verisi alınamadı.");
      }
    } catch (error) {
      message.error("Sunucu hatası...");
    }
  }

  const updateProduct = async (values) => {
    const { colors, sizes, ...restValues } = values;
    try {
      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...restValues, colors, sizes}),
      });
      if (response.ok) {
        message.success("Ürün başarıyla güncellendi.");
        navigate("/admin/products");
      } else {
        message.error("Ürün güncelleme işleminde hata meydana geldi.");
      }
    } catch (error) {
      console.log("Sunucu hatası...");
    }
  };

  useEffect(() => {
    getProduct();
    getCategories();
  }, [productId]);

  return (
    <div>
      <h2>Product Update Panel</h2>
      <Form
        layout={formLayout}
        form={form}
        initialValues={{
          layout: formLayout,
        }}
        onFinish={updateProduct}
      >
        <Form.Item
          label="Product Name"
          name="name"
          rules={[{ required: true, message: "Please select a Product Name!" }]}
        >
          <Input placeholder="Product Name" />
        </Form.Item>
        <Form.Item
          label="Image Url"
          name="img"
          rules={[{ required: true, message: "Please select a Image Url!" }]}
        >
          <Input placeholder="Image Url" />
        </Form.Item>
        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please select a Price!" }]}
        >
          <Input placeholder="Price" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please select a Description!" }]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item
          name="colors"
          label="Colors"
          rules={[{ required: true, message: "Please select a Colors!" }]}
        >
          <Checkbox.Group options={plainOptions} defaultValue={["Green".toLocaleLowerCase()]} />
        </Form.Item>
        <Form.Item
          name="sizes"
          label="Sizes"
          rules={[{ required: true, message: "Please select a Sizes!" }]}
        >
          <Checkbox.Group options={sizeOption} defaultValue={["M"]} />
        </Form.Item>
        <Form.Item
          label="Stock Code"
          name="stockCode"
          rules={[{ required: true, message: "Please select a Stock Code!" }]}
        >
          <Input placeholder="Stock Code" />
        </Form.Item>
        <Form.Item label="Discount" name="discount">
          <Input placeholder="Discount" />
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
        <Form.Item style={{ marginTop: "15px" }}>
          <Button type="primary" htmlType="submit">Update Product</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateProduct;
