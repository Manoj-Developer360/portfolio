import { createContext, useCallback, useContext, useState } from 'react';

const CertLightboxContext = createContext(null);

export function CertLightboxProvider({ children }) {
  const [state, setState] = useState({
    open: false,
    images: [],
    current: 0,
    title: '',
    org: '',
  });

  const openLightbox = useCallback((srcs, title, org) => {
    if (!srcs || !srcs.length) return;
    setState({ open: true, images: srcs, current: 0, title, org });
  }, []);

  const closeLightbox = useCallback(() => {
    setState((s) => ({ ...s, open: false }));
  }, []);

  const showImage = useCallback((idx) => {
    setState((s) => ({ ...s, current: idx }));
  }, []);

  return (
    <CertLightboxContext.Provider value={{ ...state, openLightbox, closeLightbox, showImage }}>
      {children}
    </CertLightboxContext.Provider>
  );
}

export function useCertLightbox() {
  const ctx = useContext(CertLightboxContext);
  if (!ctx) throw new Error('useCertLightbox must be used within CertLightboxProvider');
  return ctx;
}
