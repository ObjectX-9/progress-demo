import React, { useState, useRef } from 'react';
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
  const [progress, setProgress] = useState(0);
  const progressInterval = useRef<ReturnType<typeof setInterval>>();
  const startTime = useRef<number>(0);

  const updateProgress = () => {
    // const currentTime = Date.now();
    // const elapsedTime = (currentTime - startTime.current) / 1000;

    if (progress >= 90) {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      return;
    }

    const maxIncrement = 90 * 0.02

    setProgress(prev => {
      const increment = Math.random() * maxIncrement;
      return Math.min(prev + increment, 90);
    });
  };

  const handleClick = async () => {
    setIsLoading(true);
    setProgress(0);
    startTime.current = Date.now();

    progressInterval.current = setInterval(updateProgress, 333);

    try {
      await onClick();

      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }

      setProgress(100);
      await new Promise(resolve => setTimeout(resolve, 500));
    } finally {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      setIsLoading(false);
      setProgress(0);
    }
  };

  console.log(" ~ progress:", progress)


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
      {isLoading && <div className="progress-bar" style={{
        width: `${progress}%`,
        borderTopRightRadius: `${(progress / 100) * 12}px`,
        borderBottomRightRadius: `${(progress / 100) * 12}px`,
        transition: 'width 0.333s linear, border-radius 0.333s linear'
      }} />}
    </button>
  );
};
