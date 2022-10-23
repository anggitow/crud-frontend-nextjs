import {
  Button,
  Form,
  PageHeader,
  Input,
  notification,
  Spin,
  InputNumber,
} from "antd";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

const CreateBarang = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    const request = await fetch("http://127.0.0.1:8000/api/barang/store", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const response = await request.json();
    if (response.success) {
      router.push("/barang");
      notification.success({
        message: "Sukses",
        description: response.message,
        placement: "top",
      });
    } else {
      router.push("/barang");
      notification.error({
        message: "Gagal",
        description: response.message,
        placement: "top",
      });
    }
  };

  return (
    <>
      <Head>
        <title>Tambah Data Barang</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container mx-auto">
        <PageHeader
          className="site-page-header"
          onBack={() => router.push("/barang")}
          title="Tambah Data Barang"
        />
      </div>
      <div className="flex justify-center">
        <div className="w-10/12">
          <Spin spinning={loading}>
            <Form
              name="basic"
              labelCol={{
                span: 5,
              }}
              wrapperCol={{
                span: 16,
              }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item
                label="Nama"
                name="nama"
                rules={[
                  {
                    required: true,
                    message: "Harap masukkan Nama Barang!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Kategori"
                name="kategori"
                rules={[
                  {
                    required: true,
                    message: "Harap masukkan Kategori!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Harga"
                name="harga"
                rules={[
                  {
                    required: true,
                    message: "Harap masukkan Harga!",
                  },
                ]}
              >
                <InputNumber className="!w-full" />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 5,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Simpan
                </Button>
              </Form.Item>
            </Form>
          </Spin>
        </div>
      </div>
    </>
  );
};

export default CreateBarang;
