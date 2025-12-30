
import React, { useEffect, useRef } from 'react';

interface AdUnitProps {
  slot: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  style?: React.CSSProperties;
  className?: string;
}

const AdUnit: React.FC<AdUnitProps> = ({ slot, format = 'auto', style, className }) => {
  const adRef = useRef<HTMLModElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    // Skip if already initialized or if we are in an environment without window
    if (initialized.current || typeof window === 'undefined') return;

    const initAd = () => {
      // Check if the element is actually in the DOM and has width
      if (adRef.current && adRef.current.offsetWidth > 0) {
        try {
          // @ts-ignore
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          initialized.current = true;
        } catch (e) {
          console.error('AdSense Push Error:', e);
        }
      } else {
        // If width is still 0, retry in a moment (useful for hidden tabs/slow layouts)
        setTimeout(initAd, 250);
      }
    };

    // Small initial delay to allow Tailwind/Flexbox to finish layout calculations
    const timer = setTimeout(initAd, 150);
    
    return () => clearTimeout(timer);
  }, [slot]);

  return (
    <div 
      className={`ad-container w-full overflow-hidden flex flex-col items-center justify-center min-h-[120px] glass-panel rounded-2xl border border-white/5 bg-zinc-950/20 p-2 ${className}`}
      style={{ minWidth: '250px' }} // Ensures AdSense engine sees a minimum width
    >
      <div className="w-full flex justify-between items-center mb-2 px-2">
        <span className="text-[8px] font-black text-zinc-800 uppercase tracking-[0.4em]">ADVERTISEMENT</span>
        <div className="w-1 h-1 rounded-full bg-zinc-800"></div>
      </div>
      
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={style || { display: 'block', width: '100%', height: 'auto', minHeight: '90px' }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // REPLACE WITH YOUR ACTUAL ID
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default AdUnit;
