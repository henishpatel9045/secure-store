"use client";

import DocCard from "@/components/DocCard";
import Link from "next/link";
import { useState } from "react";
import { generateShare, getDocsData } from "@/helpers/dbCalls";
import { HiOutlineInformationCircle } from "react-icons/hi";
import Timer from "@/components/Timer";
import BtnLoading from "@/components/BtnLoading";
import DocsListPage from "@/components/DocsListPage";

export default function Page() {
  const [modelDocId, setModelDocId] = useState<string | null>(null);
  const [isShareLinkValid, setIsShareLinkValid] = useState(false);
  const [shareDocData, setShareDocData] = useState<{
    id: string;
    link: string;
    expiredAt: number;
    accessedFor: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <DocsListPage isEncryptedPage={false} getDocsData={getDocsData} docCardProps={{
      setShareDocData: setShareDocData,
      setModelDocId: setModelDocId,
      setIsActive: setIsShareLinkValid
    }}>
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
                <Link
                  href={shareDocData?.link ?? ""}
                  className="col-span-3 text-secondary badge badge-ghost p-3 h-fit"
                  target="_blank"
                >
                  {shareDocData?.link}
                </Link>
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
                  {loading ? <BtnLoading /> : "Generate"}
                </button>
              </form>
            </div>
          )}
        </div>
      </dialog>
    </DocsListPage>
  );
}
