"use client";

import React, { useEffect, useState } from "react";

const TimerElement = ({ value }: { value: number }) => {
  return <span style={{ "--value": value } as React.CSSProperties}></span>;
};

export default function Timer({
  time,
  className,
  onComplete,
}: {
  time: number;
  className?: string;
  onComplete?: () => void;
}) {
  const [remainingTime, setRemainingTime] = useState(time);

  useEffect(() => {
    setRemainingTime(time);
    let interval = setInterval(() => {
      setRemainingTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  if (remainingTime <= 0) onComplete?.();

  const days = remainingTime <= 0 ? 0 : Math.floor(remainingTime / 86400);
  const hours =
    remainingTime <= 0 ? 0 : Math.floor((remainingTime - days * 84600) / 3600);
  const minutes =
    remainingTime <= 0
      ? 0
      : Math.floor((remainingTime - (days * 84600 + hours * 3600)) / 60);
  const seconds =
    remainingTime <= 0
      ? 0
      : Math.floor(
          remainingTime - (days * 84600 + hours * 3600 + minutes * 60)
        );

  return (
    <div
      className={
        "max-w-full grid grid-flow-col xs:gap-2 md:gap-4 text-center auto-cols-max " +
        className
      }
    >
      {days ? (
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content items-center">
          <span className="countdown font-mono xs:text-xl sm:text-2xl md:text-5xl">
            <TimerElement value={days} />
          </span>
          DD
        </div>
      ) : (
        <></>
      )}
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content items-center">
        <span className="countdown font-mono xs:text-xl sm:text-2xl md:text-5xl">
          <TimerElement value={hours} />
        </span>
        HH
      </div>
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content items-center">
        <span className="countdown font-mono xs:text-xl sm:text-2xl md:text-5xl">
          <TimerElement value={minutes} />
        </span>
        MM
      </div>
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content items-center">
        <span className="countdown font-mono xs:text-xl sm:text-2xl md:text-5xl">
          <TimerElement value={seconds} />
        </span>
        SS
      </div>
    </div>
  );
}
