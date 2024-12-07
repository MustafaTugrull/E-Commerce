import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import {
  DashboardOutlined,
  AppstoreOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LaptopOutlined,
  BlockOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const { Header, Footer, Sider, Content } = Layout;

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const items = [
    {
      key: "1",
      icon: <DashboardOutlined />,
      label: "Dashboard",
      path: "/admin",
      onClick: () => {
        navigate("/admin");
      },
    },
    {
      key: "2",
      icon: <AppstoreOutlined />,
      label: "Categories",
      path: "/",
      children: [
        {
          key: "2-1",
          label: "Category List",
          path: "/admin/categories",
          onClick: () => {
            navigate("/admin/categories");
          },
        },
        {
          key: "2-2",
          label: "Add Category",
          path: "/admin/categories/create",
          onClick: () => {
            navigate("/admin/categories/create");
          },
        },
      ],
    },
    {
      key: "3",
      icon: <LaptopOutlined />,
      label: "Products",
      path: "/",
      children: [
        {
          key: "3-1",
          label: "Product List",
          path: "/admin/products",
          onClick: () => {
            navigate("/admin/products");
          },
        },
        {
          key: "3-2",
          label: "Add Product",
          path: "/admin/products/create",
          onClick: () => {
            navigate("/admin/products/create");
          },
        },
      ],
    },
    {
      key: "4",
      icon: <BlockOutlined />,
      label: "Blogs",
      path: "/",
      children: [
        {
          key: "4-1",
          label: "Blog List",
          path: "/admin/blogs",
          onClick: () => {
            navigate("/admin/blogs");
          },
        },
        {
          key: "4-2",
          label: "Add Blog",
          path: "/admin/blogs/create",
          onClick: () => {
            navigate("/admin/blogs/create");
          },
        },
      ],
    },
    {
      key: "5",
      icon: <UsergroupAddOutlined />,
      label: "Users",
      path: "/",
      children: [
        {
          key: "5-1",
          label: "User List",
          path: "/admin/blogs",
          onClick: () => {
            navigate("/admin/users");
          },
        },
      ],
    },
  ];
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <div className="admin-layout">
      <Layout style={{ minHeight: "100vh" }}>
        <Sider width="20%" style={{}} collapsed={collapsed}>
          <Button
            type="primary"
            onClick={toggleCollapsed}
            style={{
              marginBottom: 16,
            }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
          <Menu
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            theme="dark"
            inlineCollapsed={collapsed}
            items={items}
          />
        </Sider>
        <Layout>
          <Header style={{ color: "white" }}>Admin Panel</Header>
          <Content style={{ padding: "20px" }}>{children}</Content>
          <Footer
            style={{
              textAlign: "center",
              backgroundColor: "#001529",
              color: "white",
            }}
          >
            &copy;MUSTAFA TUĞRUL
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default AdminLayout;
AdminLayout.propTypes = {
  children: PropTypes.node,
};
