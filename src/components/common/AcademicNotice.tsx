import React from 'react';
import { Info, AlertCircle } from 'lucide-react';

interface AcademicNoticeProps {
  type?: 'demo' | 'info' | 'official';
  text?: string;
  className?: string;
}

export const AcademicNotice: React.FC<AcademicNoticeProps> = ({
  type = 'demo',
  text,
  className = ''
}) => {
  const defaultTexts = {
    demo: "Sample Academic Profile — Demonstrating data structure. Update or replace via the Admin CMS.",
    info: "Official information will be updated upon institutional verification by SUST Academic Registry.",
    official: "Institutional Record • Department of Sociology, SUST Sylhet."
  };

  const displayText = text || defaultTexts[type];

  return (
    <div
      className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded text-[11px] font-medium border ${
        type === 'demo'
          ? 'bg-amber-50/80 border-amber-200 text-amber-800'
          : type === 'info'
          ? 'bg-blue-50 border-blue-200 text-blue-800'
          : 'bg-stone-100 border-stone-200 text-stone-700'
      } ${className}`}
    >
      <Info className="w-3 h-3 flex-shrink-0" />
      <span>{displayText}</span>
    </div>
  );
};
