import React, { useState, useEffect } from "react";
import { Layout, Menu, Input, Button, Drawer } from "antd";
import { Link, useLocation } from "react-router-dom";
import {
  SearchOutlined,
  PlusOutlined,
  DashboardOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../features/contacts/userReducer";

import "../assets/css/Header.css";
import contactIcon from "../assets/images/contact-us-icon.png";

const { Header } = Layout;

const AppHeader = () => {
  const location = useLocation();
  const dispatch = useDispatch();  // <--- THIS IS IMPORTANT
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const selectedKey =
    location.pathname.startsWith("/add") ||
    location.pathname.startsWith("/edit") ||
    location.pathname.startsWith("/view")
      ? "add"
      : "dashboard";

  const menuItems = [
    {
      key: "add",
      icon: <PlusOutlined />,
      label: <Link to="/add">Contact Us</Link>,
    },
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: <Link to="/">Dashboard</Link>,
    },
  ];

  const onSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    dispatch(setSearchTerm(value));  // dispatch available here now
  };

  return (
    <Header className="custom-header">
      <div className="header-left">
        <img src={contactIcon} alt="Click2Meet Logo" className="header-icon" />
        <div className="logo">Click2Meet</div>
      </div>

      {!isMobile && (
        <>
          <div className="header-center">
            <Menu
              mode="horizontal"
              selectedKeys={[selectedKey]}
              className="custom-menu"
              items={menuItems}
            />
          </div>
          <div className="header-right">
            <Input
              placeholder="Search Contacts"
              prefix={<SearchOutlined className="search-icon" />}
              style={{
                width: 250,
                borderRadius: "20px",
                border: "1px solid #FF6F00",
                boxShadow: "none",
                outline: "none",
              }}
              value={searchValue}
              onChange={onSearchChange}
            />
          </div>
        </>
      )}

      {isMobile && (
        <>
          <Button
            type="text"
            className="menu-button"
            icon={<MenuOutlined style={{ color: "#FF6F00", fontSize: 22 }} />}
            onClick={() => setDrawerVisible(true)}
          />
          <div className="mobile-search-wrapper">
            <Input
              className="mobile-search-input"
              placeholder="Search Contacts"
              prefix={<SearchOutlined className="search-icon" />}
              style={{
                borderRadius: "20px",
                border: "1px solid #FF6F00",
                boxShadow: "none",
                outline: "none",
                color: "#FF6F00",
              }}
              value={searchValue}
              onChange={onSearchChange}
            />
          </div>
        </>
      )}

      <Drawer
        title="Click2Meet"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
      >
        <Menu
          mode="vertical"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={() => setDrawerVisible(false)}
          className="drawer-menu"
        />
      </Drawer>
    </Header>
  );
};

export default AppHeader;
