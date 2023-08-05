"use client";

import { saveDoc, updateDoc } from "@/helpers/uploadDoc";
import { useSession } from "next-auth/react";
import { ChangeEvent, useState } from "react";
import { useRouter, redirect } from "next/navigation";
import { deleteDoc } from "@/helpers/dbCalls";

export default function DocForm({
  docData = { name: "", description: "", fileName: "" },
  isEdit = false,
}: {
  docData?: {
    _id?: string;
    name: string;
    description?: string;
    fileName?: string;
    path?: string;
  };
  isEdit?: boolean;
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
          if (isEdit) {
            await updateDoc(formData, session);
            setLoading(false);
            setShowToast(true);
            setTimeout(() => {
              setShowToast(false);
            }, 2000);
            router.refresh();
          } else {
            await saveDoc(formData, session);
          }
        }}
        className="flex flex-col w-full gap-4"
      >
        {docData._id && (
          <input type="hidden" name="docId" value={docData._id} />
        )}
        <div className="grid grid-cols-6 gap-4 items-center">
          <label
            className="sm:text-md md:text-xl lg:text-xl sm:col-span-2 md:col-span-1 break-words"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            placeholder="Doc Name"
            className="input input-bordered w-fit md:w-full sm:col-span-4 md:col-span-5"
            name="name"
            id="name"
            value={name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid grid-cols-6 gap-4 items-center">
          <label
            className="sm:text-md md:text-xl lg:text-xl sm:col-span-2 md:col-span-1 break-words"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="textarea textarea-bordered sm:col-span-4 md:col-span-5 w-fit md:w-full"
            placeholder="Description"
            name="description"
            id="description"
            value={description}
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-6 gap-4 items-center">
          <label
            className="sm:text-md md:text-xl lg:text-xl sm:col-span-2 md:col-span-1 break-words"
            htmlFor="doc"
          >
            Document
          </label>
          <div className="sm:col-span-4 md:col-span-2 w-fit md:w-full flex flex-col items-start justify-center">
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
        <div
          className={`w-full self-center grid ${
            isEdit ? "grid-cols-3" : "grid-cols-2"
          } gap-4 mt-20`}
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
            {loading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              "Save"
            )}
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
                    await deleteDoc(docData._id ?? "");
                  } catch (error) {}
                  router.push("/dashboard/doc");
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
