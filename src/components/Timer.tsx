import { sleep } from "@/helpers/helper";
import React, { useEffect, useRef, useState } from "react";

const TimerElement = ({ value }: { value: number }) => {
  return <span style={{ "--value": value } as React.CSSProperties}></span>;
};

export default function Timer({ time }: { time: number }) {
  const [remainingTime, setRemainingTime] = useState(time);

  useEffect(() => {
    setRemainingTime(time);
    let interval = setInterval(() => {
      setRemainingTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  const days = Math.floor(remainingTime / 86400);
  const hours = Math.floor((remainingTime - days * 84600) / 3600);
  const minutes = Math.floor(
    (remainingTime - (days * 84600 + hours * 3600)) / 60
  );
  const seconds = Math.floor(
    remainingTime - (days * 84600 + hours * 3600 + minutes * 60)
  );

  return (
    <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
      {days ? (
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <span className="countdown font-mono text-5xl">
            <TimerElement value={days} />
          </span>
          days
        </div>
      ) : (
        <></>
      )}
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl">
          <TimerElement value={hours} />
        </span>
        hours
      </div>
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl">
          <TimerElement value={minutes} />
        </span>
        min
      </div>
      <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span className="countdown font-mono text-5xl">
          <TimerElement value={seconds} />
        </span>
        sec
      </div>
    </div>
  );
}
