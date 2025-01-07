import React, { useState } from 'react';
import './LoadingButton.css';

interface LoadingButtonProps {
  onClick: () => Promise<void>;
  className?: string;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({
  onClick,
  className = '',
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await onClick();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className={`loading-button ${isLoading ? 'is-loading' : ''} ${className}`}
      onClick={handleClick}
      disabled={isLoading}
    >
      <div className="button-text-container">
        <span className={`button-text ${isLoading ? 'slide-up' : ''}`}>Connect</span>
        <span className={`button-text ${isLoading ? 'slide-up' : ''}`}>Verifying...</span>
      </div>
      {isLoading && <div className="progress-bar" />}
    </button>
  );
};
