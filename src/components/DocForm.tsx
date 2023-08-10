"use client";

import { useSession } from "next-auth/react";
import { ChangeEvent, useState } from "react";
import { useRouter, redirect } from "next/navigation";
import { deleteDoc, deleteEncryptedDoc } from "@/helpers/dbCalls";
import BtnLoading from "./BtnLoading";

export default function DocForm({
  children,
  docData = { name: "", description: "", fileName: "" },
  isEdit,
  callAction,
  isEncryptedDoc = false,
}: {
  children?: React.ReactNode;
  docData?: {
    _id?: string;
    name: string;
    description?: string;
    fileName?: string;
    path?: string;
  };
  isEdit?: boolean;
  callAction: any;
  isEncryptedDoc?: boolean;
}) {
  const { data: session } = useSession();
  const [name, setName] = useState(docData.name);
  const [description, setDescription] = useState(docData.description);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
      default:
        break;
    }
  };

  return (
    <div className="flex-1 p-4 md:p-6">
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>{isEdit ? "Document updated." : "Document saved"}</span>
          </div>
        </div>
      )}
      <h1 className="text-2xl font-bold">
        {isEdit ? "Edit" : "Add New"} Document
      </h1>
      <p className="divider mt-0" />
      <form
        action={async (formData) => {
          setLoading(true);
          await callAction(formData, session);
          if (isEdit) {
            setLoading(false);
            setShowToast(true);
            setTimeout(() => {
              setShowToast(false);
            }, 2000);
            router.refresh();
          }
        }}
        className="flex flex-col w-full gap-4"
      >
        {docData._id && (
          <input type="hidden" name="docId" value={docData._id} />
        )}
        <div className="grid grid-cols-6 gap-4 items-center w-full">
          <label
            className="md:text-lg lg:text-xl sm:col-span-2 md:col-span-1 break-words xs:hidden md:block"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            placeholder="Doc Name"
            className="input input-bordered min-w-fit md:w-full xs:col-span-6 sm:col-span-4 md:col-span-5"
            name="name"
            id="name"
            value={name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid grid-cols-6 gap-4 items-center">
          <label
            className="md:text-lg lg:text-xl sm:col-span-2 md:col-span-1 break-words xs:hidden md:block"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="textarea textarea-bordered min-w-fit md:w-full xs:col-span-6 sm:col-span-4 md:col-span-5"
            placeholder="Description"
            name="description"
            id="description"
            value={description}
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-6 gap-4 items-center">
          <label
            className="md:text-lg lg:text-xl sm:col-span-2 md:col-span-1 break-words xs:hidden md:block"
            htmlFor="doc"
          >
            Document
          </label>
          <div className="min-w-fit md:w-full xs:col-span-6 sm:col-span-4 md:col-span-5 flex flex-col items-start justify-center">
            {docData.fileName && (
              <p>
                Current File:{" "}
                <span className="text-success">
                  <a href={docData.path} target="_blank">
                    {docData.fileName}
                  </a>
                </span>
              </p>
            )}
            <input
              type="file"
              className="file-input file-input-bordered w-full"
              name="doc"
              id="doc"
              required={!isEdit}
            />
          </div>
        </div>
        {children}
        <div
          className={`w-full self-center grid ${
            isEdit ? "grid-cols-3" : "grid-cols-2"
          } gap-4 xs:mt-10 sm:mt-20`}
        >
          <button
            type="submit"
            className="btn btn-info"
            disabled={loading}
            onSubmit={() => {
              setLoading(true);
              return true;
            }}
          >
            {loading ? <BtnLoading /> : "Save"}
          </button>
          <button type="reset" className="btn btn-warning" disabled={loading}>
            Clear
          </button>
          {isEdit && (
            <button
              className="btn btn-error text-white"
              type="button"
              disabled={loading}
              onClick={async () => {
                if (
                  confirm(`Are you sure to delete the doc ${docData.name} ?`)
                ) {
                  try {
                    if (isEncryptedDoc) {
                      await deleteEncryptedDoc(docData._id ?? "");
                      router.push("/dashboard/encryptedDoc");
                    } else {
                      await deleteDoc(docData._id ?? "");
                      router.push("/dashboard/doc");
                    }
                  } catch (error) {
                    console.log("Error while deleting: ", error);
                  }
                }
              }}
            >
              DELETE
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
