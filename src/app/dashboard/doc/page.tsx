"use client";

import DocCard from "@/components/DocCard";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { generateShare, getDocsData } from "@/helpers/dbCalls";
import { HiOutlineInformationCircle } from "react-icons/hi";
import Timer from "@/components/Timer";

export default function page() {
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
  const [modelDocId, setModelDocId] = useState<string | null>(null);
  const [isShareLinkValid, setIsShareLinkValid] = useState(false);
  const [shareDocData, setShareDocData] = useState<{
    id: string;
    link: string;
    expiredAt: number;
    accessedFor: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    if (status !== "authenticated") return;
    setDocsData(await getDocsData(session.user?.email ?? ""));
  };

  useEffect(() => {
    getData();
  }, [status]);

  return (
    <div className="flex-1 relative flex flex-col h-full p-6">
      <Link
        href="/dashboard/doc/addNew"
        className="btn btn-secondary text-white absolute top-4 right-4 z-10 shadow-gray-50"
      >
        Add Doc
      </Link>
      <div className="w-full text-start text-2xl font-bold">Your Documents</div>
      <div className="divider -mt-0" />
      <div className="relative w-full h-full grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {docsData.length !== 0 ? (
          docsData.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <DocCard
              key={`doc-${index}`}
              id={item.id}
              fileType={item.fileType}
              fileName={item.fileName}
              name={item.name}
              path={item.path ?? ""}
              setModelDocId={setModelDocId}
              setShareDocData={setShareDocData}
              setIsActive={setIsShareLinkValid}
            />
          ))
        ) : (
          <div className="absolute top-0 left-0 text-center w-full h-full flex items-center justify-center">
            <span className="flex gap-4 justify-center items-center text-3xl">
              <HiOutlineInformationCircle size={30} /> No Document
            </span>
          </div>
        )}
      </div>
      <dialog id="shareDoc" className="modal relative">
        <div className="modal-box flex flex-col items-center gap-6">
          <form
            method="dialog"
            className="self-end -mt-4 absolute right-2 top-2"
          >
            <div className="modal-action">
              {/* if there is a button in form, it will close the modal */}
              <button
                className="btn btn-sm btn-circle btn-ghost"
                onClick={() => {
                  // timerRef.current?.remove();
                }}
              >
                ✕
              </button>
            </div>
          </form>
          {isShareLinkValid ? (
            <div className="w-full h-full">
              <p className="text-xl font-bold">
                Active sharable link for doc already exists.
              </p>
              <div className="grid grid-cols-4 mt-6 gap-4">
                <p className="font-bold">DocId: </p>
                <p className="col-span-3 text-secondary badge badge-ghost p-3 h-fit">
                  {shareDocData?.link}
                </p>
                <p className="font-bold">AccessedFor: </p>
                <p className="col-span-3 text-secondary badge badge-ghost p-3">
                  {shareDocData?.accessedFor}
                </p>
                <p className="font-bold">Remaining Time: </p>
                <p className="col-span-3">
                  <Timer
                    time={((shareDocData?.expiredAt ?? 0) - Date.now()) / 1000}
                  />
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full">
              <p className="font-bold text-xl mb-6">
                Generate sharable link for doc.
              </p>
              <form
                action={async (formData) => {
                  setLoading(true);
                  let data = await generateShare(formData);
                  setLoading(false);
                  setIsShareLinkValid(true);
                  setShareDocData(data);
                }}
                className="flex flex-col items-center gap-6"
              >
                <input type="hidden" name="docId" value={modelDocId ?? ""} />
                <div className="grid grid-cols-3 gap-4 w-full">
                  <p>DocId: </p>
                  <p className="col-span-2 text-secondary badge badge-ghost p-3 h-fit">
                    {modelDocId}
                  </p>
                  <p>ExpiresAt: </p>
                  <input
                    type="datetime-local"
                    name="expiresAt"
                    className="col-span-2 p-2"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  {loading ? (
                    <span className="loading loading-spinner loading-md"></span>
                  ) : (
                    "Generate"
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
}
