import React, { useEffect } from "react";
import { Button, DatePicker, Form, Input, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

const UpdateCoupon = () => {
  const [form] = Form.useForm();
  const formLayout = "vertical";
  const navigate = useNavigate();
  const params = useParams();
  const couponId = params.id;

  const today = dayjs().startOf("day");

  const getCoupon = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/coupons/byid/${couponId}`
      );
      if (response.ok) {
        const data = await response.json();
        form.setFieldsValue({
          ...data,
          expired: dayjs(data.expired),
        });
      } else {
        message.error("Kupon verisi alınamadı.");
      }
    } catch (error) {
      message.error("Sunucu hatası...");
    }
  };

  const updateCoupon = async (values) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/coupons/${couponId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...values,
            expired: values.expired.toISOString(),
          }),
        }
      );
      if (response.ok) {
        message.success("Kupon başarıyla güncellendi.");
        navigate("/admin/coupons");
      } else {
        message.error("Kupon güncelleme işleminde hata meydana geldi.");
      }
    } catch (error) {
      console.log("Sunucu hatası...");
    }
  };

  useEffect(() => {
    getCoupon();
  }, [couponId]);
  return (
    <div>
      <h2>Coupon Add Panel</h2>
      <Form
        layout={formLayout}
        form={form}
        onFinish={updateCoupon}
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
            Update Coupon
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateCoupon;
