import {
  Button,
  Form,
  Input,
  notification,
  PageHeader,
  Select,
  Spin,
} from "antd";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;

  const request = await fetch(`http://127.0.0.1:8000/api/pelanggan/show/${id}`);
  const response = await request.json();

  return {
    props: { response },
  };
}

const EditPelanggan = ({ response }) => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    const request = await fetch(
      `http://127.0.0.1:8000/api/pelanggan/update/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );
    const response = await request.json();
    if (response.success) {
      router.push("/pelanggan");
      notification.success({
        message: "Sukses",
        description: response.message,
        placement: "top",
      });
    } else {
      router.push("/pelanggan");
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
        <title>Edit Data Pelanggan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto">
        <PageHeader
          className="site-page-header"
          onBack={() => router.push("/pelanggan")}
          title="Edit Data Pelanggan"
        />
      </div>
      <div className="flex justify-center">
        <div className="w-10/12">
          {response.success ? (
            <Spin spinning={loading}>
              <Form
                name="basic"
                labelCol={{
                  span: 5,
                }}
                wrapperCol={{
                  span: 16,
                }}
                initialValues={{
                  nama: response.data.nama,
                  domisili: response.data.domisili,
                  jenis_kelamin: response.data.jenis_kelamin,
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
                      message: "Harap masukkan Nama!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Domisili"
                  name="domisili"
                  rules={[
                    {
                      required: true,
                      message: "Harap masukkan Domisili!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Jenis Kelamin"
                  name="jenis_kelamin"
                  rules={[
                    {
                      required: true,
                      message: "Harap pilih Jenis Kelamin!",
                    },
                  ]}
                >
                  <Select>
                    <Select.Option value="Pria">Pria</Select.Option>
                    <Select.Option value="Wanita">Wanita</Select.Option>
                  </Select>
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
          ) : (
            <h4 className="text-lg text-center">{response.message}</h4>
          )}
        </div>
      </div>
    </>
  );
};

export default EditPelanggan;
