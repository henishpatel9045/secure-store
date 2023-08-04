"use client";

import React, { useState } from "react";
import Table from "./Table";

export default function DocShareTable() {
  const [page, setPage] = useState<number>(0);
  const [tableData, setTableData] = useState<
    {
      id: string;
      docName: string;
      createdAt: string;
      expiredAt: number;
      accessedFor: number;
    }[]
  >([
    {
      id: "498-546",
      docName: "Aadhar Card",
      createdAt: Date.parse("05/09/2002 18:45").toString(),
      expiredAt: Date.parse("05-09-2024"),
      accessedFor: 50,
    },
    {
      id: "498-546",
      docName: "Aadhar Card",
      createdAt: Date.parse("05/09/2002 18:45").toString(),
      expiredAt: Date.now(),
      accessedFor: 50,
    },
    {
      id: "498-546",
      docName: "Aadhar Card",
      createdAt: new Date(Date.parse("05/09/2002 18:45")).toDateString(),
      expiredAt: Date.parse("05-09-2024"),
      accessedFor: 50,
    },
    {
      id: "498-546",
      docName: "Aadhar Card",
      createdAt: Date.parse("05/09/2002 18:45").toString(),
      expiredAt: Date.parse("05-09-2024"),
      accessedFor: 50,
    },
    {
      id: "498-546",
      docName: "Aadhar Card",
      createdAt: Date.parse("05/09/2002 18:45").toString(),
      expiredAt: Date.now(),
      accessedFor: 50,
    },
    {
      id: "498-546",
      docName: "Aadhar Card",
      createdAt: new Date(Date.parse("05/09/2002 18:45")).toDateString(),
      expiredAt: Date.parse("05-09-2024"),
      accessedFor: 50,
    },
    {
      id: "498-546",
      docName: "Aadhar Card",
      createdAt: Date.parse("05/09/2002 18:45").toString(),
      expiredAt: Date.parse("05-09-2024"),
      accessedFor: 50,
    },
    {
      id: "498-546",
      docName: "Aadhar Card",
      createdAt: Date.parse("05/09/2002 18:45").toString(),
      expiredAt: Date.now(),
      accessedFor: 50,
    },
    {
      id: "498-546",
      docName: "Aadhar Card",
      createdAt: new Date(Date.parse("05/09/2002 18:45")).toDateString(),
      expiredAt: Date.parse("05-09-2024"),
      accessedFor: 50,
    },
    {
      id: "498-546",
      docName: "Aadhar Card",
      createdAt: Date.parse("05/09/2002 18:45").toString(),
      expiredAt: Date.parse("05-09-2024"),
      accessedFor: 50,
    },
  ]);

  return (
    <Table
      title="Shared Document"
      page={page}
      setPage={setPage}
      totalPages={10}
      tableData={tableData}
    />
  );
}
