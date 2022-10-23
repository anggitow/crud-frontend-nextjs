import {
  HomeOutlined,
  InsertRowBelowOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const items = [
  {
    label: (
      <Link href="/">
        <a>Beranda</a>
      </Link>
    ),
    key: "/",
    icon: <HomeOutlined />,
  },
  {
    label: (
      <Link href="/pelanggan">
        <a>Data Pelanggan</a>
      </Link>
    ),
    key: "/pelanggan",
    icon: <UserOutlined />,
  },
  {
    label: (
      <Link href="/barang">
        <a>Data Barang</a>
      </Link>
    ),
    key: "/barang",
    icon: <InsertRowBelowOutlined />,
  },
  {
    label: (
      <Link href="/penjualan">
        <a>Data Penjualan</a>
      </Link>
    ),
    key: "/penjualan",
    icon: <ShoppingCartOutlined />,
  },
];
const Header = () => {
  const router = useRouter();
  const { pathname } = router;

  const [current, setCurrent] = useState(pathname);
  const onClick = (e) => {
    setCurrent(e.key);
  };
  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};
export default Header;
