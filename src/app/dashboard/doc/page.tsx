"use client";

import Link from "next/link";
import { useState } from "react";
import { deleteShareDoc, generateShare, getDocsData } from "@/helpers/dbCalls";
import { HiOutlineClipboard } from "react-icons/hi";
import Timer from "@/components/Timer";
import BtnLoading from "@/components/BtnLoading";
import DocsListPage from "@/components/DocsListPage";
import DialogContainer from "@/components/DialogContainer";
import { toast } from "react-toastify";
import { DATE_ISO_ADJUST } from "@/config/site";

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
    <DocsListPage
      isEncryptedPage={false}
      getDocsData={getDocsData}
      docCardProps={{
        setShareDocData: setShareDocData,
        setModelDocId: setModelDocId,
        setIsActive: setIsShareLinkValid,
      }}
    >
      <DialogContainer id="shareDoc">
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
              <div className="grid grid-cols-4 mt-6 gap-4 items-center">
                <p className="font-bold xs:text-sm md:text-md break-words">
                  ShareLink:{" "}
                </p>
                <Link
                  href={shareDocData?.link ?? ""}
                  className="col-span-3 text-secondary badge badge-ghost p-3 h-fit break-words"
                  target="_blank"
                >
                  {shareDocData?.link}
                </Link>
                <p className="font-bold xs:text-sm md:text-md break-words">
                  AccessedFor:{" "}
                </p>
                <p className="col-span-3 text-secondary badge badge-ghost p-3">
                  {shareDocData?.accessedFor}
                </p>
                <p className="font-bold xs:text-sm md:text-md break-words">
                  Remaining Time:{" "}
                </p>
                <p className="col-span-3">
                  <Timer
                    time={((shareDocData?.expiredAt ?? 0) - Date.now()) / 1000}
                  />
                </p>
                <button
                  className="btn btn-error col-span-4 text-white"
                  onClick={async () => {
                    setLoading(true);
                    await deleteShareDoc(shareDocData?.id ?? "");
                    setLoading(false);
                    setIsShareLinkValid(false);
                    toast.success(
                      `ShareLink ${shareDocData?.link} deleted successfully.`
                    );
                  }}
                >
                  Delete
                </button>
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
                  toast.success(
                    <p>
                      Sharable{" "}
                      <a
                        className="link link-success"
                        href={data.link}
                        target="_blank"
                      >
                        link
                      </a>{" "}
                      generated successfully.
                    </p>
                  );
                }}
                className="flex flex-col items-center gap-6"
              >
                <input type="hidden" name="docId" value={modelDocId ?? ""} />
                <div className="grid grid-cols-3 gap-4 w-full items-center">
                  <p>DocId: </p>
                  <p className="col-span-2 text-secondary badge badge-ghost p-3 h-fit relative">
                    <span>{modelDocId}</span>
                    <button
                      type="button"
                      className="btn btn-ghost top-2 z-10 right-3 p-2"
                      onClick={async () => {
                        await navigator.clipboard.writeText(modelDocId ?? "");
                        toast.info(`DocID ${modelDocId} copied to clipboard.`);
                      }}
                    >
                      <HiOutlineClipboard size={15} color="#FFF" />
                    </button>
                  </p>
                  <p>ExpiresAt: </p>
                  <input
                    type="datetime-local"
                    name="expiresAt"
                    className="col-span-2 max-w-full badge badge-ghost p-3 h-fit"
                    required
                    min={new Date(Date.now() + DATE_ISO_ADJUST())
                      .toISOString()
                      .slice(0, 16)}
                    max={new Date(
                      Date.now() + DATE_ISO_ADJUST() + 100 * 24 * 60 * 60 * 1000
                    )
                      .toISOString()
                      .slice(0, 16)}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-full">
                  {loading ? <BtnLoading /> : "Generate"}
                </button>
              </form>
            </div>
          )}
        </div>
      </DialogContainer>
    </DocsListPage>
  );
}
