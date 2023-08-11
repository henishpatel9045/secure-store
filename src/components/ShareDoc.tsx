"use client";

import { bytesToSize } from "@/helpers/helper";
import Timer from "./Timer";
import { HiOutlineDocumentDownload, HiViewGrid } from "react-icons/hi";
import Link from "next/link";

const GridLabel = ({ value }: { value: string }) => {
  return (
    <p className="xs:text-md md:text-lg lg:text-xl font-bold break-words text-ellipsis">
      {value}:
    </p>
  );
};

const ShareDoc = ({
  data,
}: {
  data: {
    shareId: string;
    expireAt: number;
    docName: string;
    fileName: string;
    fileType: string;
    size: number;
  };
}) => {
  return (
    <div className="rounded-lg bg-base-300 grid grid-cols-4 gap-4 px-4 py-6 items-center">
      <p className="col-span-4 text-4xl font-bold">Shared Doc Detail</p>
      <p className="divider col-span-4 mt-0" />

      <GridLabel value="DocName" />
      <p className="text-secondary xs:text-md md:text-lg lg:text-xl col-span-3 break-words">
        {data?.docName}
      </p>

      <GridLabel value="FileName" />
      <p className="text-secondary xs:text-md md:text-lg lg:text-xl col-span-3 break-words">
        {data?.fileName}
      </p>

      <GridLabel value="FileType" />
      <p className="text-secondary xs:text-md md:text-lg lg:text-xl col-span-3 break-words">
        {data?.fileType}
      </p>

      <GridLabel value="FileSize" />
      <p className="text-secondary xs:text-md md:text-lg lg:text-xl col-span-3 break-words">
        {bytesToSize(data.size)}
      </p>

      <GridLabel value="ExpiresIn" />
      <Timer
        time={(data.expireAt - Date.now()) / 1000}
        className="col-span-3"
        onComplete={() => {
          window.location.reload();
        }}
      />

      <Link
        target="_blank"
        href={"/api/share/" + data.shareId}
        className="btn btn-neutral col-span-2 mt-4"
      >
        <HiOutlineDocumentDownload size={35} />
      </Link>
      <Link
        target="_blank"
        href={"/api/share/" + data.shareId + "?inline=1"}
        className="btn btn-neutral col-span-2 mt-4"
      >
        <HiViewGrid size={35} />
      </Link>
    </div>
  );
};

export default ShareDoc;
