"use client";

import { error } from "console";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { ImGithub, ImGoogle, ImMail3 } from "react-icons/im";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="relative w-full h-full bg-base-200 px-4 flex items-center justify-center">
      <div className="xs:w-11/12 md:w-8/12 lg:w-6/12 flex flex-col items-center justify-center gap-4 bg-black py-8 px-6 rounded-xl">
        <div className="flex flex-col gap-2 items-center justify-center w-full">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="xyz@abc.com"
            onChange={(e) => setEmail(e.target.value)}
            className="input outline-2 outline-slate-300 w-full"
          />
          <button
            disabled={loading}
            onClick={async () => {
              if (email && /\w+@\w+\.\w+/.test(email)) {
                setLoading(true);
                const res = signIn("email", {
                  email: email,
                  callbackUrl: "/dashboard/profile",
                });
                await toast.promise(res, {
                  pending: "Sending login link to your mail.",
                  success: "Link sent to your email successfully.",
                  error: "Error sending mail try again.",
                });
              } else toast.error("Incorrect email address.");
              setLoading(false);
            }}
            className="btn btn-outline btn-neutral w-full"
          >
            <ImMail3 /> Continue with email
          </button>
        </div>
        <div className="divider divide-neutral text-neutral font-bold">OR</div>
        <div className="w-full flex flex-col gap-2 items-center">
          <button
            className="btn btn-outline btn-neutral w-full"
            disabled={loading}
          >
            <ImGoogle /> Continue with Google
          </button>
          <button
            className="btn btn-outline btn-neutral w-full"
            disabled={true}
          >
            <ImGithub /> Continue with GitHub
          </button>
        </div>
      </div>
    </div>
  );
}
