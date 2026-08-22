import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8 text-slate-900 selection:bg-teal-500 selection:text-white">
      {children}
    </div>
  );
};

export default AuthLayout;
