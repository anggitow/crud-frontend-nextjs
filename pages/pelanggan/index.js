import Head from "next/head";
import { Button, Popconfirm, Table, notification } from "antd";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const Pelanggan = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = async (id) => {
    setLoading(true);
    const request = await fetch(
      `http://127.0.0.1:8000/api/pelanggan/destroy/${id}`
    );
    const response = await request.json();
    if (response.success) {
      notification.success({
        message: "Sukses",
        description: response.message,
        placement: "top",
      });
      fetchData();
    } else {
      notification.error({
        message: "Gagal",
        description: response.message,
        placement: "top",
      });
    }
    setLoading(false);
  };

  const columns = [
    {
      title: "ID Pelanggan",
      dataIndex: "key",
      key: "key",
      width: 200,
      render: (_, record) => `PELANGGAN_${record.key}`,
    },
    {
      title: "Nama",
      dataIndex: "nama",
      key: "nama",
    },
    {
      title: "Domisili",
      dataIndex: "domisili",
      key: "domisili",
    },
    {
      title: "Jenis Kelamin",
      dataIndex: "jenis_kelamin",
      key: "jenis_kelamin",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-1">
          <Link href={`/pelanggan/edit/${record.key}`}>
            <a>
              <Button type="primary" ghost size="small">
                Edit
              </Button>
            </a>
          </Link>
          <Popconfirm
            placement="top"
            okText="Yakin"
            cancelText="Batal"
            onConfirm={() => handleDelete(record.key)}
            title={`Yakin ingin menghapus ${record.nama}?`}
          >
            <Button danger size="small">
              Hapus
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const fetchData = async () => {
    const request = await fetch("http://127.0.0.1:8000/api/pelanggan");
    const response = await request.json();
    if (response.success) {
      setData(response.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>Data Pelanggan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto">
        <div className="my-5 flex justify-between flex-wrap">
          <h3 className="text-xl">Tabel Pelanggan</h3>
          <Link href="/pelanggan/create">
            <a>
              <Button type="primary">Tambah Data Pelanggan</Button>
            </a>
          </Link>
        </div>
        <Table loading={loading} columns={columns} dataSource={data} />
      </div>
    </>
  );
};

export default Pelanggan;
