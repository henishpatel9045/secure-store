"use client";

import { bytesToSize } from "@/helpers/helper";
import Timer from "./Timer";

const GridLabel = ({ value }: { value: string }) => {
  return <p className="xs:text-md md:text-lg lg:text-xl font-bold">{value}</p>;
};

const ShareDoc = ({
  data,
}: {
  data: {
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
      <p className="text-secondary xs:text-md md:text-lg lg:text-xl col-span-3 before:content-[':'] before:text-white before:font-bold before:-ml-1 before:mr-2">
        {data?.docName}
      </p>

      <GridLabel value="FileName" />
      <p className="text-secondary xs:text-md md:text-lg lg:text-xl col-span-3 before:content-[':'] before:text-white before:font-bold before:-ml-1 before:mr-2">
        {data?.fileName}
      </p>

      <GridLabel value="FileType" />
      <p className="text-secondary xs:text-md md:text-lg lg:text-xl col-span-3 before:content-[':'] before:text-white before:font-bold before:-ml-1 before:mr-2">
        {data?.fileType}
      </p>

      <GridLabel value="FileSize" />
      <p className="text-secondary xs:text-md md:text-lg lg:text-xl col-span-3 before:content-[':'] before:text-white before:font-bold before:-ml-1 before:mr-2">
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
    </div>
  );
};

export default ShareDoc;
