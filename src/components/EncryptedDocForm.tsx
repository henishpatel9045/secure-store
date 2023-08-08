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
    <DocForm docData={docData} callAction={callAction}>
      <div className="grid grid-cols-6 gap-4 items-center">
        <label
          className="sm:text-md md:text-xl lg:text-xl sm:col-span-2 md:col-span-1 break-words"
          htmlFor="name"
        >
          PassKey
        </label>
        <input
          type="text"
          placeholder="Any text you want to set as this doc's passKey. Store it someplace safe as you will never see this again."
          className="input input-bordered w-fit md:w-full sm:col-span-4 md:col-span-5"
          name="passKey"
          id="name"
          required={!isEdit}
        />
      </div>
    </DocForm>
  );
}
