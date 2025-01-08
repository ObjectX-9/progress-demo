import React, { useState } from 'react';
import './DomainCard.css';

interface DomainCardProps {
  domain: string;
  onPublish: () => Promise<void>;
}

export const DomainCard: React.FC<DomainCardProps> = ({ domain, onPublish }) => {
  const [status, setStatus] = useState<'checking' | 'success' | 'publishing'>('checking');
  
  // 模拟DNS检查
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setStatus('success');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handlePublish = async () => {
    setStatus('publishing');
    await onPublish();
    // 发布完成后可以添加其他状态
  };

  return (
    <div className="domain-card">
      <div className="domain-card-header">
        <div className="back-button">
          <span>←</span> Edit custom domain
        </div>
        <div className="domain-name">
          <span>{domain}</span>
          <button className="copy-button">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 4C2 2.89543 2.89543 2 4 2H8C9.10457 2 10 2.89543 10 4V4H12C13.1046 4 14 4.89543 14 6V12C14 13.1046 13.1046 14 12 14H6C4.89543 14 4 13.1046 4 12V10H4C2.89543 10 2 9.10457 2 8V4Z" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>
        </div>
      </div>
      
      <div className="domain-card-content">
        <h3>Configure your DNS</h3>
        <p>Visit the admin console of your domain provider and set up your DNS records with the following values:</p>
        <div className="dns-table">
          <div className="dns-row header">
            <div>Type</div>
            <div>Name</div>
            <div>Value</div>
          </div>
          <div className="dns-row">
            <div>CNAME</div>
            <div>www</div>
            <div>vpxp649bn6ad7h9entbng.nftest.xyz</div>
          </div>
          <div className="dns-row">
            <div>A</div>
            <div>@</div>
            <div>35.87.55.169</div>
          </div>
        </div>
        
        <div className={`status-message ${status}`}>
          {status === 'checking' && (
            <>
              <div className="loading-spinner" />
              <span>Checking DNS configuration...</span>
            </>
          )}
          {status === 'success' && (
            <>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM8 15L3 10L4.41 8.59L8 12.17L15.59 4.58L17 6L8 15Z" fill="#10B981"/>
              </svg>
              <span>Configuration successful! Publish your site to make it visible.</span>
            </>
          )}
        </div>
        
        <button 
          className={`publish-button ${status}`} 
          onClick={handlePublish}
          disabled={status === 'checking' || status === 'publishing'}
        >
          {status === 'checking' && 'Checking configuration...'}
          {status === 'success' && 'Publish'}
          {status === 'publishing' && (
            <>
              <div className="button-spinner" />
              Publishing...
            </>
          )}
        </button>
      </div>
    </div>
  );
};
