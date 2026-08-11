import React from 'react';
import { TECH_STACK } from '../data/portfolioData';
import {
  Smartphone,
  Code,
  Terminal,
  FileCode,
  Code2,
  Database,
  Server,
  Palette,
  Gamepad2,
  Box,
  Atom,
  CreditCard
} from 'lucide-react';

export const TechMarquee: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone': return <Smartphone className="w-4 h-4" />;
      case 'Code': return <Code className="w-4 h-4" />;
      case 'Terminal': return <Terminal className="w-4 h-4" />;
      case 'FileCode': return <FileCode className="w-4 h-4" />;
      case 'Code2': return <Code2 className="w-4 h-4" />;
      case 'Database': return <Database className="w-4 h-4" />;
      case 'Server': return <Server className="w-4 h-4" />;
      case 'Palette': return <Palette className="w-4 h-4" />;
      case 'Gamepad2': return <Gamepad2 className="w-4 h-4" />;
      case 'Box': return <Box className="w-4 h-4" />;
      case 'Atom': return <Atom className="w-4 h-4" />;
      case 'CreditCard': return <CreditCard className="w-4 h-4" />;
      default: return <Code className="w-4 h-4" />;
    }
  };

  return (
    <div className="relative py-5 bg-white border-y border-slate-200 overflow-hidden select-none">
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <div className="flex space-x-6 animate-marquee hover:[animation-play-state:paused] whitespace-nowrap w-max">
        {[...TECH_STACK, ...TECH_STACK, ...TECH_STACK].map((tech, index) => (
          <div
            key={`${tech.name}-${index}`}
            className="flex items-center space-x-2.5 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#0D47A1] hover:bg-white transition-all duration-200 shadow-sm cursor-default group"
          >
            <span style={{ color: tech.color }} className="group-hover:scale-110 transition-transform">
              {getIcon(tech.icon)}
            </span>
            <span className="text-xs font-mono font-bold text-slate-800 group-hover:text-[#0D47A1]">
              {tech.name}
            </span>
            <span className="text-[10px] text-slate-500 font-sans font-semibold px-2 py-0.5 rounded bg-slate-200/60 uppercase">
              {tech.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
