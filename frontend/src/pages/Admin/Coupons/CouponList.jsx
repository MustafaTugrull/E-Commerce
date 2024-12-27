import React, { useEffect, useState } from "react";
import { Button, message, Space, Table } from "antd";
import { useNavigate } from "react-router-dom";

const CouponList = () => {
  const [dataSource, setDataSource] = useState([]);
  const navigate = useNavigate();

  const getCoupons = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/coupons");

      if (response.ok) {
        const data = await response.json();
        setDataSource(data);
      } else {
        console.log("Veri getirme işlemi başarısız...");
      }
    } catch (error) {
      console.log("Sunucu hatası...");
    }
  };

  const deleteCoupon = async (couponId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/coupons/${couponId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        message.success("Kupon başarıyla silindi...");
        setDataSource((prevCoupon) => {
          return prevCoupon.filter((coupon) => coupon._id !== couponId);
        });
      } else {
        message.error("Silme işlemi başarısız...");
      }
    } catch (error) {
      console.log("Sunucu hatası...");
    }
  };

  useEffect(() => {
    getCoupons();
  }, [dataSource]);

  const formatDate = (date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString("tr-TR", options);
  };

  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
      width: "25%",
      render: (text) => text,
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      width: "25%",
      render: (text) => text,
    },
    {
      title: "Expired",
      dataIndex: "expired",
      key: "expired",
      width: "25%",
      render: (text) => formatDate(text),
    },
    {
      title: "Count",
      dataIndex: "count",
      key: "count",
      width: "25%",
      render: (text) => text,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => navigate(`/admin/coupons/update/${record._id}`)}
            color="success"
            variant="solid"
          >
            Update
          </Button>
          <Button
            color="danger"
            variant="solid"
            onClick={() => deleteCoupon(record._id)}
          >
            Remove
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <h2 style={{ marginBottom: "5px" }}>Coupon List</h2>
      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey={(record) => record._id}
      />
    </div>
  );
};

export default CouponList;
