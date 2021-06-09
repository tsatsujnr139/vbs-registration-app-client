import React from "react";
import { Layout } from "antd";

const Footer = () => {
  const { Footer } = Layout;

  return <Footer style={{ textAlign: "center" }}>©{new Date().getFullYear()} LIC</Footer>;
};

export default Footer;
