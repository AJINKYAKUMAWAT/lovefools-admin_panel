'use client';
import { FunctionComponent, PropsWithChildren, Suspense } from 'react';
import { Provider } from 'react-redux';
import { NextUIProvider } from '@nextui-org/react';
import Notification from '@/components/common/Notification';
import Layout from '@/components/layout';
import './globals.css';
import { persistor, store } from '../redux/store';
import Loader from '@/components/common/Loader';
import { PersistGate } from 'redux-persist/integration/react';

const RootLayout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <html lang='en'>
      <head>
        <title>LoveFools</title>
        <link
          rel='icon'
          type='image/x-icon'
          href='/icon.png'
        />
        <meta
          property='og:image'
          content='/icon.png'
        />
        <meta
          property='og:type'
          content='website'
        />
        <meta
          property='og:url'
          content='https://lovefools.com/'
        />
      </head>

      <body>
        <Provider store={store}>
          <PersistGate
            loading={null}
            persistor={persistor}>
            <NextUIProvider locale='es-GB'>
              <Suspense fallback={<Loader />}>
                <Layout>{children}</Layout>
              </Suspense>
            </NextUIProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
