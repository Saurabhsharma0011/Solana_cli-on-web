import React, { useState } from 'react';
import { Copy, CheckCircle } from 'lucide-react';

interface CopyButtonProps {
  text: string;
  className?: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ text, className = '' }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      
      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center justify-center p-1 rounded hover:bg-gray-700 transition-colors ${className}`}
      title="Copy to clipboard"
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <CheckCircle size={14} className="text-green-400" />
      ) : (
        <Copy size={14} className="text-gray-400 hover:text-white" />
      )}
    </button>
  );
};

export default CopyButton;
