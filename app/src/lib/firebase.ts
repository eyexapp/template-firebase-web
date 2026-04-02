import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@movie/dataconnect';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? 'API_KEY',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? 'PROJECT_ID.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? 'PROJECT_ID',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? 'PROJECT_ID.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? 'SENDER_ID',
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? 'APP_ID',
};

const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(firebaseApp);
export const dataConnect = getDataConnect(firebaseApp, connectorConfig);

if (import.meta.env.DEV) {
  connectDataConnectEmulator(dataConnect, window.location.hostname, undefined, true);
}
