"use client"; // Error components must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  //   useEffect(() => {
  //     // Log the error to an error reporting service
  //     console.error(error)
  //   }, [error])

  return (
    <div className="bg-base-100 w-full h-full text-base-300 flex items-center justify-center flex-col gap-6">
      <h2 className="badge badge-error badge-lg text-2xl p-6">{error.message}</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        className="btn btn-lg btn-warning"
      >
        Retry
      </button>
    </div>
  );
}
