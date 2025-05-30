import Image from "next/image";
import { Row, Col, Layout, Breadcrumb, Menu } from "antd";

const { Header, Content, Footer } = Layout;
export default function Home() {
  const items = [
    {
      key: "Begining",
      label: "Begining",
    },
    {
      key: "About us",
      label: "About us",
    },
    {
      key: "Services",
      label: "services",
    },
    { key: "History", label: "History" },
  ];

  return (
    <>
      <Header>
        <Menu items={items} mode="horizontal" />
      </Header>
    </>
  );
}
