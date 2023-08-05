"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Table from "./Table";
import { getSharedDocData } from "@/helpers/dbCalls";

export default function DocShareTable() {
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState(0);
  const { data: session, status } = useSession();
  const [tableData, setTableData] = useState<
    | {
        id: string;
        docName: string;
        createdAt: string;
        expiredAt: number;
        accessedFor: number;
      }[]
    | undefined
    | null
  >(null);

  const getData = async () => {
    if (status !== "authenticated") return;

    const d = await getSharedDocData(session.user?.email ?? "", page);
    setTableData(d.data);
    setTotalPages(d.totalPages);
  };

  useEffect(() => {
    getData();
  }, [page]);

  return totalPages ? (
    <Table
      title="Shared Document"
      page={page}
      setPage={setPage}
      totalPages={totalPages}
      tableData={tableData}
    />
  ) : (
    <div />
  );
}
