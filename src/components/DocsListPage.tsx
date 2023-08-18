"use client";

import DocCard from "@/components/DocCard";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { HiOutlineInformationCircle } from "react-icons/hi";
import Loading from "./Loading";

export default function DocsListPage({
  children,
  isEncryptedPage,
  getDocsData,
  docCardProps,
}: {
  children?: React.ReactNode;
  isEncryptedPage: boolean;
  getDocsData: any;
  docCardProps?: {
    setModelDocId: React.Dispatch<React.SetStateAction<string | null>>;
    setShareDocData: React.Dispatch<
      React.SetStateAction<{
        id: string;
        link: string;
        expiredAt: Date;
        accessedFor: number;
      } | null>
    >;
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  };
}) {
  const { data: session, status } = useSession();
  const [docsData, setDocsData] = useState<
    {
      id: string;
      name: string;
      fileType: string;
      fileName: string;
      path: string | null;
    }[]
  >([]);
  const [fetched, setFetched] = useState(false);

  const getData = async () => {
    if (status !== "authenticated") return;
    setDocsData(await getDocsData(session.user?.email ?? ""));
    setFetched(true);
  };

  useEffect(() => {
    getData();
  }, [status]);

  return (
    <div className="flex-1 relative flex flex-col h-full p-6 w-full">
      <div className="z-10 bg-black w-full -p-2 flex flex-col items-center justify-between">
        <div className="flex items-center justify-between w-full">
          <div className="w-full text-start text-2xl font-bold">
            {isEncryptedPage ? "Encrypted Docs" : "Documents"}
          </div>
          <Link
            href={`/dashboard/${
              isEncryptedPage ? "encryptedDoc" : "doc"
            }/addNew`}
            className="btn btn-accent xs:btn-sm md:btn-md text-white shadow-gray-50"
          >
            Add Doc
          </Link>
        </div>
        <div className="w-full divider mt-2" />
      </div>
      {docsData.length !== 0 ? (
        <div className="relative w-full grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 grid-flow-row auto-rows-auto">
          {docsData.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <DocCard
              key={`doc-${index}`}
              id={item.id}
              fileType={item.fileType}
              fileName={item.fileName}
              name={item.name}
              path={item.path ?? ""}
              isEncryptedDoc={isEncryptedPage}
              {...docCardProps}
            />
          ))}
        </div>
      ) : fetched ? (
        <div className="text-center w-full h-full flex items-center justify-center">
          <span className="flex gap-4 justify-center items-center text-3xl">
            <HiOutlineInformationCircle size={30} /> No Document
          </span>
        </div>
      ) : (
        <Loading />
      )}
      {children}
    </div>
  );
}
