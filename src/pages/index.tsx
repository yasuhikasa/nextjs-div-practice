import Head from 'next/head'
import Layout from './components/layout/layout';
import React, { useState } from 'react';
import SimpleLogin from './components/simpleLogin/simpleLogin';
import SimpleSignup from './components/simpleLogin/simpleSignup';
import { Modal } from './components/modal/modal';


export default function Home() {

  const [isModalOpen, setModalOpen] = useState(false);

  const closeModal = () => setModalOpen(false);
  const openModal = () => setModalOpen(true);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <SimpleLogin />
        <SimpleSignup />
        <div>
          <button onClick={openModal}>
            モーダルを開く
          </button>

          <Modal
            isOpen={isModalOpen}
            closeModal={closeModal}
            title="モーダルのタイトル"
            content="モーダルの内容"
          />
        </div>
    </Layout>
    </>
  )
}
