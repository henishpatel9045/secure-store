"use client";
import React from "react";

export default function Pagination({
  page,
  totalPages,
  setPage,
}: {
  page: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className={`join`}>
      {new Array(totalPages).fill(0).map((item, index) => {
        return (
          <button
            key={index}
            className={`join-item btn ${index === page && "btn-active"}`}
            onClick={() => setPage(index)}
          >
            {index + 1}
          </button>
        );
      })}
    </div>
  );
}
