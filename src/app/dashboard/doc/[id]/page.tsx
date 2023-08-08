import DocForm from "@/components/DocForm";
import { prisma } from "@/db";
import { updateDoc } from "@/helpers/uploadDoc";

export default async function Page({ params }: { params: { id: string } }) {
  const doc = await prisma.doc.findFirst({
    where: {
      id: params.id,
    },
  });
  const docData = {
    _id: doc?.id ?? params.id,
    name: doc?.name ?? "",
    description: doc?.description ?? "",
    fileName: doc?.fileName ?? "",
    path: doc?.path ?? "",
  };

  return <DocForm docData={docData} isEdit={true} callAction={updateDoc} />;
}
