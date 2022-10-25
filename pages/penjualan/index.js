import { Button, notification, Popconfirm, Table } from "antd";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

const Penjualan = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDelete = async (id) => {
    setLoading(true);
    const request = await fetch(
      `http://127.0.0.1:8000/api/penjualan/destroy/${id}`
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
      title: "Nota",
      dataIndex: "key",
      key: "key",
      render: (_, record) => `NOTA_${record.key}`,
    },
    {
      title: "Tanggal",
      dataIndex: "tanggal",
      key: "tanggal",
    },
    {
      title: "Kode Pelanggan",
      dataIndex: "id_pelanggan",
      key: "id_pelanggan",
      render: (_, record) => `PELANGGAN_${record.id_pelanggan}`,
    },
    {
      title: "Nama Pelanggan",
      dataIndex: "nama",
      key: "nama",
    },
    {
      title: "Grand Total",
      dataIndex: "grand_total",
      key: "grand_total",
      render: (_, record) =>
        record.grand_total
          .toString()
          .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, "."),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-1">
          <Link href={`/penjualan/edit/${record.key}`}>
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
            title={`Yakin ingin menghapus NOTA_${record.key}?`}
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
    const request = await fetch("http://127.0.0.1:8000/api/penjualan");
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
        <title>Data Penjualan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto">
        <div className="my-5 flex justify-between flex-wrap">
          <h3 className="text-xl">Tabel Penjualan</h3>
          <Link href="/penjualan/create">
            <a>
              <Button type="primary">Tambah Data Penjualan</Button>
            </a>
          </Link>
        </div>
        <Table
          loading={loading}
          columns={columns}
          expandable={{
            expandedRowRender: (record) => (
              <Table
                pagination={false}
                columns={[
                  {
                    title: "Kode Barang",
                    dataIndex: "id_barang",
                    key: "id_barang",
                    width: 200,
                    render: (_, record) => `BRG_${record.id_barang}`,
                  },
                  {
                    title: "Nama Barang",
                    dataIndex: "nama",
                    key: "nama",
                  },
                  {
                    title: "Qty",
                    dataIndex: "qty",
                    key: "qty",
                  },
                  {
                    title: "Harga",
                    dataIndex: "harga",
                    key: "harga",
                    render: (_, record) =>
                      record.harga
                        .toString()
                        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, "."),
                  },
                  {
                    title: "SubTotal",
                    render: (_, record) =>
                      (record.harga * record.qty)
                        .toString()
                        .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, "."),
                  },
                ]}
                dataSource={record.item_penjualan}
              />
            ),
          }}
          dataSource={data}
        />
      </div>
    </>
  );
};

export default Penjualan;
