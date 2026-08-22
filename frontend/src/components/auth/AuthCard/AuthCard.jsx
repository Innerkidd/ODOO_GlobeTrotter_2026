import React from 'react';

const AuthCard = ({ children }) => {
  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-xl shadow-slate-200/50 backdrop-blur-xs">
      {children}
    </div>
  );
};

export default AuthCard;
