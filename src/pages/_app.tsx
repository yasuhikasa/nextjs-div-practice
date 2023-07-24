import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react';
import { useEffect } from 'react';
import Modal from 'react-modal';
import { FormDataProvider } from './context/formDataProvider';

export default function App({ Component, pageProps }: AppProps) {

  useEffect(() => {
    Modal.setAppElement('#__next');
  }, []);
  
  return (
    <FormDataProvider>
      <Component {...pageProps} />
    </FormDataProvider>
  );
}
