import * as React from 'react';
import { Provider } from 'urql';
import { AppProps } from 'next/app';
import client from '../graphql/client';

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider value={client}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
