/* eslint-disable no-console */
import { useEffect } from 'react';

const useServiceWorker = () => {
  useEffect(() => {
    const sw = async () => {
      if (
        process.env.NODE_ENV === 'production' &&
        'serviceWorker' in navigator
      ) {
        try {
          await navigator.serviceWorker.register('/sw.js');
          console.log('Service Worker registered successfully');
        } catch (error) {
          console.warn('Service Worker failed to register');
        }
      }
    };
    sw();
  }, []);
};

export { useServiceWorker };
