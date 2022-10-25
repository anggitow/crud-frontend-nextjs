import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  InputNumber,
  notification,
  PageHeader,
  Select,
  Space,
  Spin,
} from "antd";
import moment from "moment";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;

  const request = await fetch(`http://127.0.0.1:8000/api/penjualan/show/${id}`);
  const response = await request.json();

  return {
    props: { response },
  };
}

const EditPenjualan = ({ response }) => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(false);
  const [dataPelanggan, setDataPelanggan] = useState([]);
  const [dataBarang, setDataBarang] = useState([]);

  const fetchPelanggan = async () => {
    const request = await fetch("http://127.0.0.1:8000/api/pelanggan");
    const response = await request.json();
    if (response.success) {
      setDataPelanggan(response.data);
    }
  };
  const fetchBarang = async () => {
    const request = await fetch("http://127.0.0.1:8000/api/barang");
    const response = await request.json();
    if (response.success) {
      setDataBarang(response.data);
    }
  };

  useEffect(() => {
    fetchPelanggan();
    fetchBarang();
  }, []);

  const onFinish = async (fieldsValue) => {
    const value = {
      ...fieldsValue,
      tanggal: fieldsValue["tanggal"].format("YYYY-MM-DD"),
    };
    setLoading(true);
    const request = await fetch(
      `http://127.0.0.1:8000/api/penjualan/update/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      }
    );
    const response = await request.json();
    if (response.success) {
      router.push("/penjualan");
      notification.success({
        message: "Sukses",
        description: response.message,
        placement: "top",
      });
    } else {
      router.push("/penjualan");
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
        <title>Edit Data Penjualan</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto">
        <PageHeader
          className="site-page-header"
          onBack={() => router.push("/penjualan")}
          title="Edit Data Penjualan"
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
                onFinish={onFinish}
                autoComplete="off"
                initialValues={{
                  ...response.data,
                  tanggal: moment(response.data.tanggal, "YYYY-MM-DD"),
                }}
              >
                <Form.Item
                  label="Tanggal"
                  name="tanggal"
                  rules={[
                    {
                      type: "object",
                      required: true,
                      message: "Harap masukkan Tanggal!",
                    },
                  ]}
                >
                  <DatePicker
                    inputReadOnly
                    placeholder="Pilih Tanggal"
                    className="!w-full"
                  />
                </Form.Item>

                <Form.Item
                  label="Pelanggan"
                  name="pelanggan"
                  rules={[
                    {
                      required: true,
                      message: "Harap masukkan Pelanggan!",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Pilih Pelanggan"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  >
                    {dataPelanggan.map((pelanggan) => (
                      <Select.Option key={pelanggan.key} value={pelanggan.key}>
                        {pelanggan.nama}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <div className="flex pt-5 justify-center flex-col items-center">
                  <h6 className="text-lg pb-3">-- Data Barang --</h6>
                  <Form.List name="listBarang">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <Space
                            key={key}
                            style={{
                              display: "flex",
                              marginBottom: 8,
                            }}
                            align="baseline"
                          >
                            <Form.Item
                              wrapperCol={{ span: 24 }}
                              {...restField}
                              name={[name, "barang"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Harap Pilih Barang",
                                },
                              ]}
                            >
                              <Select
                                placeholder="Pilih Barang"
                                className="!w-full !block"
                              >
                                {dataBarang.map((barang) => (
                                  <Select.Option
                                    key={barang.key}
                                    value={barang.key}
                                  >
                                    {barang.nama}
                                  </Select.Option>
                                ))}
                              </Select>
                            </Form.Item>
                            <Form.Item
                              label="Qty"
                              wrapperCol={{ span: 24 }}
                              {...restField}
                              name={[name, "qty"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Harap Masukkan Qty",
                                },
                              ]}
                            >
                              <InputNumber
                                className="!w-full"
                                placeholder="Masukkan Qty"
                              />
                            </Form.Item>

                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </Space>
                        ))}
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            icon={<PlusOutlined />}
                          >
                            Tambah Barang
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </div>

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

export default EditPenjualan;
