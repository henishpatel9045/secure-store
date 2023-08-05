import DocCard from "@/components/DocCard";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex-1 relative flex flex-col w-full p-6">
      <Link
        href="/dashboard/encryptedDoc/addNew"
        className="btn btn-primary text-white absolute top-4 right-4 z-10 shadow-gray-50"
      >
        Add Doc
      </Link>
      <div className="w-full text-start text-2xl font-bold">
        Your Encrypted Documents
      </div>
      <div className="divider -mt-0" />
      <div className="w-full h-full grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(8)].map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <DocCard
            key={`doc-${index}`}
            fileType={"pdf"}
            name={`${index}.pdf`}
          />
        ))}
      </div>
    </div>
  );
}
