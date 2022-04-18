import { Layout } from "antd";
import React from "react";

const Footer = () => {
  const { Footer } = Layout;

  return (
    <Footer style={{ textAlign: "center" }}>
      ©{new Date().getFullYear()} Legon Interdenominational Church
    </Footer>
  );
};

export default Footer;
