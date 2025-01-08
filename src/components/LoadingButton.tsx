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
  const lastProgress = useRef(0); // 用来追踪最后的进度值

  const updateProgress = () => {
    if (progress >= 90) {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      return;
    }

    const maxIncrement = 100 * 0.02;
    const minIncrement = maxIncrement * 0.5;

    setProgress(prev => {
      // 这里需要ref跟踪，否则会因为setProgress调用的时序问题导致一卡一卡的
      const increment = minIncrement + (Math.random() * (maxIncrement - minIncrement));
      const nextProgress = Math.max(lastProgress.current + increment, prev + increment);
      const finalProgress = Math.min(nextProgress, 90);
      lastProgress.current = finalProgress;
      console.log("🚀 ~ updateProgress ~ prev:", prev, finalProgress);
      return finalProgress;
    });
  };

  const handleClick = async () => {
    setIsLoading(true);
    setProgress(0);
    lastProgress.current = 0; // 重置最后的进度值
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
