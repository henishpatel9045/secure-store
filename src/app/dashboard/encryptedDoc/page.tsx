"use client";

import { getEncryptedDocsData } from "@/helpers/dbCalls";
import DocsListPage from "@/components/DocsListPage";

export default function Page() {
  return (
    <DocsListPage isEncryptedPage={true} getDocsData={getEncryptedDocsData} />
  );
}
