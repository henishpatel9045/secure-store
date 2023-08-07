"use client";

import { createDocShareRequest } from "@/helpers/dbCalls";
import { useState } from "react";
import BtnLoading from "./BtnLoading";

const RequestForm = ({ shareId }: { shareId: string }) => {
  const [loading, setLoading] = useState(false);

  return (
    <form
      className="rounded-lg bg-base-300 grid grid-cols-3 gap-4 px-4 py-6"
      action={async (formData) => {
        setLoading(true);
        await createDocShareRequest(formData);
        setLoading(false);
        alert("Request form submitted successfully!!");
        window.location.reload();
      }}
    >
      <p className="col-span-3 text-3xl font-bold">
        Send request for new access link
      </p>
      <p className="col-span-3 divider mt-0" />
      <input
        type="hidden"
        name="id"
        value={shareId}
        className="input input-bordered"
      />
      <p className="text-xl font-bold">Name: </p>
      <input
        type="text"
        className="col-span-2 input input-bordered"
        name="name"
        required
      />

      <p className="text-xl font-bold">Email: </p>
      <input
        type="email"
        name="email"
        id="email"
        className="col-span-2 input input-bordered"
      />

      <p className="text-xl font-bold">Message: </p>
      <textarea
        name="message"
        id="message"
        className="col-span-2 input input-bordered h-fit"
        rows={3}
      />
      <button type="submit" className="col-span-3 btn btn-primary">
        {loading ? <BtnLoading /> : "Send"}
      </button>
    </form>
  );
};

export default RequestForm;
