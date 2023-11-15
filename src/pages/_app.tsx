import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { FormDataProvider } from './context/formDataProvider';
import { Auth } from '@aws-amplify/auth';
import awsconfig from './utils/awsconfig';
import Navigation from './components/navi/navi';



Auth.configure(awsconfig);

export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    Modal.setAppElement('#__next');
  }, []);

  return (
    <FormDataProvider>
      <Navigation />
      <Component {...pageProps} />
    </FormDataProvider>
  );
}


// import "../styles/globals.scss"
// import type { AppProps } from "next/app"
// import { useRouter } from 'next/router'
// import { useEffect } from 'react'

// function MyApp({ Component, pageProps }: AppProps) {
//   const router = useRouter();

//   useEffect(() => {
//     // セッションストレージをチェックしてブラウザ初回立ち上げかどうかを判断
//     if (!sessionStorage.getItem('warmedUp')) {
//       // 初回立ち上げの場合、セッションストレージにフラグをセットして/warmupにリダイレクト
//       sessionStorage.setItem('warmedUp', 'true');
//       router.push('/warmup');
//     }
//   }, []);
//   return <Component {...pageProps} />
// }

// export default MyApp