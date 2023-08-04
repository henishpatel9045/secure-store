"use client";

import React, { useState } from "react";
import Pagination from "./Pagination";

export default function Table({
  page,
  setPage,
  totalPages,
  title,
  tableData,
}: {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  title: string;
  tableData: {
    id: string;
    docName: string;
    createdAt: string;
    expiredAt: number;
    accessedFor: number;
  }[];
}) {
  const [] = useState<number>(0);

  return (
    <div className="table bg-base-100">
      <h2 className="text-2xl font-bold mt-4 ml-4">{title}</h2>
      <p className="divider" />
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            {/* <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th> */}
            <th>DocName</th>
            <th>Link Created at</th>
            <th>Accessed for</th>
            <th>Is accessible</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody className="w-full h-full">
          {tableData &&
            tableData?.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <div className="font-bold">{item.docName}</div>
                    {/* <div className="text-sm opacity-50">United States</div> */}
                  </td>
                  <td>{item.createdAt}</td>
                  <td>{item.accessedFor}</td>
                  <td>
                    {item.expiredAt > Date.now() ? (
                      <span className="badge badge-success badge-outline">
                        Active
                      </span>
                    ) : (
                      <span className="badge badge-error badge-outline">
                        Expired
                      </span>
                    )}
                  </td>
                  <th>
                    <button
                      type="submit"
                      className="btn btn-error btn-sm text-base"
                    >
                      DELETE
                    </button>
                  </th>
                </tr>
              );
            })}
          {!tableData && (
            <div className="w-full h-full flex items-center justify-center">
              No Data
            </div>
          )}
        </tbody>
      </table>
      <p className="divider" />
      <div className="w-full flex items-center justify-center">
        {tableData && (
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        )}
      </div>
    </div>
  );
}
