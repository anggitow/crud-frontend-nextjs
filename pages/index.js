import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>CRUD</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center mt-20">
        <h1 className="text-2xl">
          Selamat datang di Mini Project Create Read Update Delete (CRUD)
        </h1>
        <code className="text-xl">- Anggito Wicaksono -</code>
      </div>
    </>
  );
}
