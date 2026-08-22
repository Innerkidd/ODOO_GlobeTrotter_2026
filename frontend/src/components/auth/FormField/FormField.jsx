import React from 'react';

const FormField = ({
  id,
  label,
  type = 'text',
  error,
  register,
  placeholder,
  autoComplete,
  children,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="block text-sm font-semibold text-slate-700 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {children ? (
          children
        ) : (
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            autoComplete={autoComplete}
            {...(register ? register(id) : {})}
            {...props}
            className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-all focus:outline-hidden ${
              error
                ? 'border-red-400 ring-2 ring-red-100 focus:border-red-500'
                : 'border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20'
            }`}
          />
        )}
      </div>
      {error && (
        <p className="mt-1.5 text-xs font-medium text-red-600 animate-fadeIn">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default FormField;
