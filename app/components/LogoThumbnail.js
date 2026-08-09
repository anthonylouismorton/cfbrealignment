import React, { useState } from 'react';

// The white backdrop only appears once the logo has actually loaded (tracked
// via onLoad), instead of rendering up front -- otherwise the bg-white box
// paints immediately while the <img> is still loading, showing a bare white
// square before the logo pops in. Most repeat views are already cached by
// the browser, so onLoad fires near-instantly and the fade is imperceptible;
// it only shows for genuinely first-time loads.
export default function LogoThumbnail({ src, alt, tooltip, imgClassName = '', className = '' }) {
  const [loaded, setLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div className={`relative flex items-center p-1 ${loaded ? 'bg-white' : ''} ${className}`}>
      <img
        onLoad={() => setLoaded(true)}
        onMouseOver={() => tooltip && setHovered(true)}
        onMouseLeave={() => tooltip && setHovered(false)}
        className={`transition-opacity duration-150 ${loaded ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
        src={src}
        alt={alt}
      />
      {tooltip && hovered && loaded && (
        <div className="bg-white max-w-24 translate-y-2 text-black text-center text-[10px] absolute top-full py-2 px-2 rounded-sm transition duration-300 z-10 whitespace-nowrap">
          {tooltip}
        </div>
      )}
    </div>
  );
}
