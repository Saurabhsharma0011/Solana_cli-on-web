import React from 'react';
import CopyButton from './CopyButton';

interface CommandWithCopyProps {
  command: string;
  className?: string;
}

const CommandWithCopy: React.FC<CommandWithCopyProps> = ({ command, className = '' }) => {
  return (
    <div className={`inline-flex items-center bg-gray-800 rounded px-2 py-1 ${className}`}>
      <code className="text-yellow-300 mr-2">{command}</code>
      <CopyButton text={command} />
    </div>
  );
};

export default CommandWithCopy;
