import React, { useState } from "react";
import Table from "./Table";

export default function EncryptedDocShareTable() {
  const [page, setPage] = useState<number>(0);
  const [tableData, setTableData] = useState<
    {
      id: string;
      docName: string;
      createdAt: string;
      expiredAt: number;
      accessedFor: number;
    }[]
  >([]);

  return (
    <Table
      title="Shared Encrypted Document"
      page={page}
      setPage={setPage}
      totalPages={10}
      tableData={tableData}
    />
  );
}
