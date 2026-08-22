import React from 'react';

const AuthDivider = ({ text = 'OR' }) => {
  return (
    <div className="relative my-6 flex items-center justify-center">
      <div className="w-full border-t border-slate-200" />
      <span className="absolute bg-white px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
        {text}
      </span>
    </div>
  );
};

export default AuthDivider;
