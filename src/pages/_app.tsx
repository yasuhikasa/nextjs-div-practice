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
