import React from "react";
import DocForm from "./DocForm";

export default function EncryptedDocForm({
  docData = { name: "", description: "", fileName: "" },
  isEdit,
  callAction,
}: {
  docData?: {
    _id?: string;
    name: string;
    description?: string;
    fileName?: string;
    path?: string;
    passKey?: string;
  };
  isEdit?: boolean;
  callAction: any;
}) {
  return (
    <DocForm docData={docData} callAction={callAction} isEdit={isEdit}>
      <div className="grid grid-cols-6 gap-4 items-center">
        <label
          className="md:text-lg lg:text-xl break-words xs:hidden md:block sm:col-span-2 md:col-span-1 "
          htmlFor="name"
        >
          PassKey
        </label>
        <textarea
          placeholder="Any text you want to set as this doc's passKey. Store it someplace safe as you will never see this again."
          className="input input-bordered min-h-fit h-full min-w-fit md:w-full xs:col-span-6 sm:col-span-4 md:col-span-5 p-2"
          rows={4}
          name="passKey"
          id="name"
          required={!isEdit}
        />
      </div>
    </DocForm>
  );
}
