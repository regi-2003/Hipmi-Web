import {StrictMode, useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { AdminPage } from './components/AdminPage';
import { SettingsProvider, useSettingsReady } from './lib/settings';
import './index.css';

function Site() {
  const ready = useSettingsReady();
  if (!ready) return <div className="min-h-screen bg-[#0a152e]" />;
  return <App />;
}

// Halaman admin ada di alamat: https://domain-anda/#admin
function Root() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  if (hash === '#admin') return <AdminPage />;
  return (
    <SettingsProvider>
      <Site />
    </SettingsProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
