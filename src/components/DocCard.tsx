"use client";

import { HiOutlineDownload, HiShare } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";
import Link from "next/link";
import { checkActiveDocShare } from "@/helpers/dbCalls";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";
import ContentTypeIcon from "./ContentTypeIcon";

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
  const [progress, setProgress] = useState(0);

  // useEffect(() => {
  //   console.log("Progress: ", progress);
  // }, [progress]);

  return (
    <div className="card card-compact w-full bg-base-100 shadow-xl overflow-hidden h-full">
      {/* <figure> */}
      <div
        className="p-4 flex items-center justify-center w-full xs:h-40 h-24 hover:opacity-80 hover:transition-all transition-all hover:cursor-pointer active:scale-90"
        onClick={async () => {
          const url = "/api/doc/" + id + "?inline=1";

          let headers = new Headers({
            Authorization: JSON.stringify(session?.user ?? "{}"),
          });

          let file = await fetch(url, {
            headers: headers,
          });
          let uri = URL.createObjectURL(await file.blob());
          window.open(uri);
          URL.revokeObjectURL(uri);
        }}
      >
        <ContentTypeIcon contentType={fileType} className="w-fit h-full" />
      </div>
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
                let passKey;
                if (isEncryptedDoc) {
                  passKey = prompt("Enter your passKey for document ", name);
                }
                const url =
                  (isEncryptedDoc ? "/api/encryptedDoc/" : "/api/doc/") +
                  id +
                  "?passKey=" +
                  passKey;
                // const resPromise = fetch(url, {
                //   headers: new Headers({
                //     Authorization: JSON.stringify(session?.user ?? "{}"),
                //   }),
                // });
                const resPromise = axios({
                  url,
                  headers: {
                    Authorization: JSON.stringify(session?.user ?? "{}"),
                  },
                  method: "GET",
                  responseType: "blob",
                  onDownloadProgress: (progressEvent) => {
                    // let loaded = progressEvent.loaded;
                    // let total = progressEvent.progress;
                    // console.log("Loaded: ", loaded, " Total: ", total);
                    console.log(progressEvent);

                    // setProgress(Math.floor((loaded / total) * 100));
                  },
                });
                toast.promise(resPromise, {
                  pending: `Fetching document ${fileName}.`,
                  success: "Document successfully downloaded.",
                  error: "Error downloading document.",
                });

                const res = await resPromise;

                if (res.status === 200) {
                  const blob = new Blob([res.data], {
                    type: res.headers["content-type"],
                  });
                  const blobUrl = URL.createObjectURL(blob);
                  const link = document.createElement("a");
                  link.href = blobUrl;
                  link.download = fileName;
                  link.click();
                  URL.revokeObjectURL(blobUrl);
                } else {
                  toast.error(
                    `Error downloading file ${fileName} \nerror: ${
                      (await res.data)?.detail
                    }`
                  );
                }

                // Trigger a click event on the link to initiate the download
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
