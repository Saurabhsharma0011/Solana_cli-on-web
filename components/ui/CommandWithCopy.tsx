import React from 'react';
import CopyButton from './CopyButton';

interface CommandWithCopyProps {
  command: string;
  className?: string;
}

const CommandWithCopy: React.FC<CommandWithCopyProps> = ({ command, className = '' }) => {
  return (
    <div className={`inline-flex items-center bg-background rounded px-2 py-1 border border-border ${className}`}>
      <code className="text-[#00dc82] mr-2">{command}</code>
      <CopyButton text={command} />
    </div>
  );
};

export default CommandWithCopy;
