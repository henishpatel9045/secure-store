"use client";

import { HiOutlineDownload, HiShare } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";
import Link from "next/link";
import { checkActiveDocShare } from "@/helpers/dbCalls";
import { useSession } from "next-auth/react";

export default function DocCard({
  id,
  fileType,
  fileName,
  name,
  path,
  setModelDocId,
  setShareDocData,
  setIsActive,
  isEncryptedDoc,
}: {
  id: string;
  fileType: string;
  fileName: string;
  name: string;
  path: string;
  setModelDocId?: React.Dispatch<React.SetStateAction<string | null>>;
  setShareDocData?: React.Dispatch<
    React.SetStateAction<{
      id: string;
      link: string;
      expiredAt: number;
      accessedFor: number;
    } | null>
  >;
  setIsActive?: React.Dispatch<React.SetStateAction<boolean>>;
  isEncryptedDoc: boolean;
}): React.JSX.Element {
  const { data: session } = useSession();

  return (
    <div className="card card-compact w-full bg-base-100 shadow-xl overflow-hidden h-full">
      {/* <figure> */}
      <img
        className="object-fill w-full hover:opacity-80 hover:transition-all transition-all hover:cursor-pointer active:scale-90"
        src="data:image/jpeg;base64,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"
        alt={fileType}
        onClick={async () => {
          const url = "/api/doc/" + id + "?inline=1";
          // let newWindow = window.open(url, "_blank");
          // console.log("Session Header: ", session?.user);
          // newWindow?.addEventListener("load", () => {
          let headers = new Headers({
            Authorization: JSON.stringify(session?.user ?? "{}"),
          });
          //   newWindow?.fetch(url, {
          //     headers: headers,
          //   });
          // });
          // newWindow?.location.reload();
          let file = await fetch(url, {
            headers: headers,
          });
          let uri = URL.createObjectURL(await file.blob());
          window.open(uri);
          URL.revokeObjectURL(uri);
        }}
      />
      {/* </figure> */}
      <div className="card-body flex flex-col items-center justify-between w-full">
        <div className="w-full flex flex-col items-start justify-center">
          <h2 className="card-title">{name}</h2>
          <h3 className="text-gray-400 w-full overflow-hidden">{fileName}</h3>
        </div>
        <div className="card-actions w-full">
          <div className="join grid grid-flow-col auto-cols-auto w-full gap-2">
            <button
              className="btn btn-neutral"
              onClick={async () => {
                const url = "/api/doc/" + id;
                const res = await fetch(url, {
                  headers: new Headers({
                    Authorization: JSON.stringify(session?.user ?? "{}"),
                  }),
                });
                const blobUrl = URL.createObjectURL(await res.blob());
                const link = document.createElement("a");
                link.href = blobUrl;
                link.download = fileName;

                // Trigger a click event on the link to initiate the download
                link.click();
                URL.revokeObjectURL(blobUrl);
              }}
            >
              <HiOutlineDownload size={25} />
            </button>
            {!(
              setModelDocId === undefined ||
              setIsActive === undefined ||
              setShareDocData === undefined
            ) && (
              <button
                className="btn btn-neutral"
                onClick={async () => {
                  setModelDocId(id);
                  let dialog: HTMLDialogElement | null =
                    document.getElementById(
                      "shareDoc"
                    ) as HTMLDialogElement | null;
                  let isActive = await checkActiveDocShare(id);
                  if (isActive.exists) {
                    setIsActive(true);
                    setShareDocData(isActive?.doc ?? null);
                  } else {
                    setIsActive(false);
                  }
                  dialog?.showModal();
                }}
              >
                <HiShare size={25} />
              </button>
            )}
            <Link
              className="btn btn-neutral"
              href={(isEncryptedDoc ? "./encryptedDoc/" : "./doc/") + id}
            >
              <FiEdit size={25} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
