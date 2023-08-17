import React from "react";
import {
  BsFillFileEarmarkPdfFill,
  BsFillImageFill,
  BsFillFileEarmarkTextFill,
  BsFillFileEarmarkZipFill,
  BsFiletypeExe,
  BsFiletypeJson,
  BsFillFileEarmarkFill,
} from "react-icons/bs";
import {
  RiFileExcel2Fill,
  RiFilePpt2Fill,
  RiFileWord2Fill,
} from "react-icons/ri";

export default function ContentTypeIcon({
  contentType,
  className,
}: {
  contentType: string;
  className?: string;
}) {
  switch (contentType) {
    case "application/pdf":
      return <BsFillFileEarmarkPdfFill color="#F44336" className={className} />;
    case "image/jpeg":
    case "image/png":
      return <BsFillImageFill color="#FF5722" className={className} />;
    case "text/plain":
      return (
        <BsFillFileEarmarkTextFill color="#4CAF50" className={className} />
      );
    case "application/msexcel":
    case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
      return <RiFileExcel2Fill color="#009688" className={className} />;
    case "application/msword":
    case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      return <RiFileWord2Fill color="#2196F3" className={className} />;
    case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      return <RiFilePpt2Fill color="#E91E63" className={className} />;
    case "application/zip":
      return <BsFillFileEarmarkZipFill color="#9C27B0" className={className} />;
    case "application/x-msdownload":
      return <BsFiletypeExe color="#FFC107" className={className} />;
    case "application/json":
      return <BsFiletypeJson color="#607D8B" className={className} />;
    default:
      return <BsFillFileEarmarkFill color="#9E9E9E" className={className} />;
  }
}
