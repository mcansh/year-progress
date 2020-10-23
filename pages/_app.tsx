import 'styles/index.css';

import * as React from 'react';
import { AppProps } from 'next/app';

import { useServiceWorker } from '~/hooks/use-service-worker';

const App: React.VFC<AppProps> = ({ Component, pageProps }) => {
  useServiceWorker();

  return <Component {...pageProps} />;
};

export default App;
