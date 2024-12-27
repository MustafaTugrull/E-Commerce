import React from "react";
import { Button, DatePicker, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const CreateCoupon = () => {
  const [form] = Form.useForm();
  const formLayout = "vertical";
  const navigate = useNavigate();

  const today = dayjs().startOf("day");

  const handleCreateCoupon = async (values) => {
    try {
      const response = await fetch("http://localhost:5000/api/coupons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        navigate("/admin/coupons");
      } else {
        console.log("Kayıt işleminde hata meydana geldi...");
      }
    } catch (error) {
      console.log("Sunucu hatası...", error);
    }
  };
  return (
    <div>
      <h2>Coupon Add Panel</h2>
      <Form
        layout={formLayout}
        form={form}
        onFinish={handleCreateCoupon}
        initialValues={{
          expired: dayjs(),
        }}
      >
        <Form.Item label="Coupon Code" name="code">
          <Input placeholder="Coupon Code" />
        </Form.Item>
        <Form.Item label="Discount" name="discount">
          <Input type="number" min={0} placeholder="Discount" />
        </Form.Item>
        <Form.Item label="Expired" name="expired">
          <DatePicker
            format="YYYY-MM-DD"
            style={{ width: "100%" }}
            placeholder="Select Expiry Date"
            disabledDate={(current) => current && current < today}
          />
        </Form.Item>
        <Form.Item label="Count" name="count">
          <Input type="number" min={1} placeholder="Count" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create Coupon
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreateCoupon;
