import React from 'react';
import { Toaster } from 'sonner';
import AppRoutes from './routes/AppRoutes/AppRoutes';

function App() {
  return (
    <>
      <Toaster richColors position="top-right" closeButton />
      <AppRoutes />
    </>
  );
}

export default App;
