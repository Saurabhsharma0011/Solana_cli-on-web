import React from 'react';
import styled from 'styled-components';
import { Button } from './button';
import Link from 'next/link';

const StyledCodespaceSection = styled.section`
  position: relative;
  margin: 6rem auto;
  padding: 3rem 2rem;
  border-radius: 16px;
  background-color: #0B1120;
  max-width: 1200px;
  overflow: hidden;
  
  .code-grid-background {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
    pointer-events: none;
    background-image: 
      linear-gradient(
        to right,
        rgba(47, 255, 209, 0.05) 1px,
        transparent 1px
      ),
      linear-gradient(
        to bottom,
        rgba(47, 255, 209, 0.05) 1px,
        transparent 1px
      );
    background-size: 20px 20px;
  }
  
  .content-container {
    position: relative;
    z-index: 1;
  }
  
  .code-decorations {
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
    gap: 8px;
  }
  
  .decoration-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }
  
  .dot-red {
    background-color: #FF5F56;
  }
  
  .dot-yellow {
    background-color: #FFBD2E;
  }
  
  .dot-green {
    background-color: #27C93F;
  }
  
  .install-command {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: rgba(11, 17, 32, 0.7);
    border: 1px solid rgba(47, 255, 209, 0.2);
    border-radius: 8px;
    padding: 1rem 1.5rem;
    margin: 1.5rem 0;
  }
  
  .command-text {
    font-family: var(--font-mono, monospace);
    color: #2FFFD1;
    font-size: 1rem;
  }
  
  .copy-button {
    background-color: rgba(47, 255, 209, 0.1);
    color: #2FFFD1;
    border: 1px solid rgba(47, 255, 209, 0.3);
    border-radius: 4px;
    padding: 0.25rem 0.75rem;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      background-color: rgba(47, 255, 209, 0.2);
    }
  }
  .code-window {
    border: 1px solid rgba(47, 255, 209, 0.2);
    border-radius: 8px;
    background-color: rgba(11, 17, 32, 0.8);
    padding: 2rem;
    margin-top: 2rem;
    position: relative;
    backdrop-filter: blur(5px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 32px;
      background-color: rgba(47, 255, 209, 0.05);
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      border-bottom: 1px solid rgba(47, 255, 209, 0.2);
    }

    &::after {
      content: 'example.js';
      position: absolute;
      top: 8px;
      left: 15px;
      font-size: 12px;
      font-family: var(--font-mono, monospace);
      color: rgba(47, 255, 209, 0.7);
    }
  }
  
  .code-text {
    font-family: var(--font-mono, monospace);
    color: #e0e0e0;
    line-height: 1.6;
    white-space: pre;
    overflow-x: auto;
    padding-top: 1rem;
  }
  
  .highlight {
    color: #2FFFD1;
  }
  
  .comment {
    color: #6A7280;
  }
  
  .npm-badge {
    display: inline-flex;
    align-items: center;
    background-color: rgba(47, 255, 209, 0.1);
    border: 1px solid rgba(47, 255, 209, 0.3);
    border-radius: 4px;
    padding: 0.25rem 0.5rem;
    font-family: var(--font-mono, monospace);
    font-size: 0.9rem;
    color: rgba(47, 255, 209, 0.9);
    margin-bottom: 1rem;
  }
  
  .npm-badge::before {
    content: '';
    display: inline-block;
    width: 16px;
    height: 16px;
    background-color: #2FFFD1;
    margin-right: 8px;
    clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 75%, 0 100%);
  }
  
  .code-text {
    font-family: var(--font-mono, monospace);
    color: #e0e0e0;
    line-height: 1.6;
    white-space: pre;
    overflow-x: auto;
  }
  
  .highlight {
    color: #2FFFD1;
  }
  
  .comment {
    color: #6A7280;
  }
`;

const CodespaceSection = () => {
  const [copyText, setCopyText] = React.useState('Copy');
  
  const handleCopy = () => {
    navigator.clipboard.writeText('npm install nex4');
    setCopyText('Copied!');
    
    setTimeout(() => {
      setCopyText('Copy');
    }, 2000);
  };
  
  return (
    <StyledCodespaceSection>
      <div className="code-grid-background"></div>
      
      <div className="content-container">
        <div className="code-decorations">
          <div className="decoration-dot dot-red"></div>
          <div className="decoration-dot dot-yellow"></div>
          <div className="decoration-dot dot-green"></div>
        </div>
        
        <h2 className="text-3xl font-bold mb-4 text-foreground">Install NEX4</h2>
        <div className="npm-badge">nex4@1.0.0</div>
        <p className="text-muted-foreground mb-6">Get started with our powerful NPM module. Build, test, and deploy your Solana applications with ease.</p>
        
        <div className="install-command">
          <span className="command-text">npm install nex4</span>
          <button className="copy-button" onClick={handleCopy}>{copyText}</button>
        </div>
        
        <div className="code-window">
          <div className="code-text">
            <span className="comment">// Import the module in your project</span>
            <br />
            <span className="highlight">import</span> {'{ initializeNex4, deployContract }'} <span className="highlight">from</span> <span>{'nex4'}</span>;
            <br /><br />
            <span className="comment">// Initialize with your API key</span>
            <br />
            <span className="highlight">const</span> nex4 = <span className="highlight">await</span> initializeNex4(<span>'YOUR_API_KEY'</span>);
            <br />
            <span className="highlight">const</span> result = <span className="highlight">await</span> deployContract(walletKeyPair, programData);
            <br />
            console.log(<span>'Contract deployed at:'</span>, result.programId.toString());
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
          <Link href="https://www.npmjs.com/package/nex4">
            <Button className="bg-[#2FFFD1] text-[#0B1120] hover:bg-[#20D6AE] px-8 py-3 rounded-full font-medium text-base shadow-lg ring-1 ring-white/10 mr-4">
              Install Package
            </Button>
          </Link>
          <Link href="/docs">
            <Button variant="outline" className="border-[#2FFFD1] text-[#2FFFD1] hover:bg-[#2FFFD1]/10 px-8 py-3 rounded-full font-medium text-base">
              NPM Documentation
            </Button>
          </Link>
        </div>
      </div>
    </StyledCodespaceSection>
  );
};

export default CodespaceSection;
