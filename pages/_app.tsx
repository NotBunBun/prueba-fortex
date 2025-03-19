
import type { AppProps } from 'next/app';
import { AuthProvider } from '../src/app/context/AuthContext';
import { DataProvider } from '../src/app/context/DataContext';
import { useContext } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <DataProvider>
        <Component {...pageProps} />
      </DataProvider>
    </AuthProvider>
  );
}

export default MyApp;
