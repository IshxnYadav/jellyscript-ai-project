
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 w-full z-[100] px-6 py-4 pointer-events-none">
      <div className="max-w-7xl mx-auto flex justify-between items-center pointer-events-auto bg-zinc-950/50 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/5 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg jelly-gradient flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <span className="text-white font-bold text-lg">J</span>
          </div>
          <div className="flex flex-col">
            <span className="font-jakarta text-md font-bold tracking-tight text-white leading-none">
              JellyScript<span className="text-indigo-400">.ai</span>
            </span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500">
          <a href="#studio" className="hover:text-white transition-colors">Studio</a>
          <a href="#" className="hover:text-white transition-colors">Docs</a>
          <a href="#" className="hover:text-white transition-colors">Vault</a>
        </div>

        <div className="flex items-center gap-4">
          <button className="px-5 py-2 rounded-lg bg-white text-zinc-950 text-[9px] font-black hover:bg-indigo-50 transition-all uppercase tracking-tighter">
            Connect
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
