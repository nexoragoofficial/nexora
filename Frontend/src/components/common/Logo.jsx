import React, { forwardRef } from 'react';

const toAssetUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http') || url.startsWith('data:')) return url;
  const base = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000').replace(/\/api$/, '');
  return `${base}${url.startsWith('/') ? '' : '/'}${url}`;
};

/**
 * Centralized Logo Component
 * Usage: <Logo className="h-8 w-auto" />
 * Supports ref for animations
 */
const Logo = forwardRef(({ className = "h-8 w-auto", src, ...props }, ref) => {
  const finalSrc = src ? toAssetUrl(src) : "/nexora-go-logo.png";
  
  return (
    <img
      ref={ref}
      src={finalSrc}
      alt="Nexora Go"
      className={`${className} object-cover rounded-full overflow-hidden border border-gray-100`}
      {...props}
      onError={(e) => {
        // Fallback to a stable placeholder if the custom one fails
        e.target.src = "https://img.icons8.com/color/96/n.png";
      }}
    />
  );
});

Logo.displayName = 'Logo';

export default Logo;
