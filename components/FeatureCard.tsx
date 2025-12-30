
import React from 'react';

interface FeatureCardProps {
  title: string;
  icon: React.ReactNode;
  desc: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, icon, desc }) => {
  return (
    <div className="glass-card p-6 rounded-2xl hover:border-indigo-500/50 transition-all group">
      <div className="w-12 h-12 rounded-xl bg-gray-800/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-lg font-bold mb-2 text-white">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
    </div>
  );
};

export default FeatureCard;
