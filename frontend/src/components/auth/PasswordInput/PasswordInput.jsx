import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const PasswordInput = ({
  id,
  label,
  error,
  register,
  placeholder = '••••••••',
  autoComplete = 'current-password',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-semibold text-slate-700 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          autoComplete={autoComplete}
          {...(register ? register(id) : {})}
          {...props}
          className={`w-full rounded-xl border bg-white pl-3.5 pr-10 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:outline-hidden ${
            error
              ? 'border-red-400 ring-2 ring-red-100 focus:border-red-500'
              : 'border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20'
          }`}
        />
        <button
          type="button"
          onClick={toggleVisibility}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 transition-colors hover:text-slate-600 focus-visible:outline-2 focus-visible:outline-teal-600 rounded-md"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          tabIndex={0}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
      {error && (
        <p className="mt-1.5 text-xs font-medium text-red-600 animate-fadeIn">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default PasswordInput;
