"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SwitchButton({ value }: { value: string }) {
  return (
    <button
      className="w-fit xs:text-3xl md:text-4xl rounded-2xl border-b-4 border-b-blue-600 bg-blue-500 py-3 font-bold text-white hover:bg-blue-400 active:translate-y-[0.125rem] active:border-b-blue-400 px-6 z-50"
      onClick={() => {
        signIn("google", { callbackUrl: "/dashboard/profile" });
      }}
    >
      {value}
    </button>
  );
}
