import DocForm from "@/components/DocForm";
import EncryptedDocForm from "@/components/EncryptedDocForm";
import { prisma } from "@/db";
import { updateEncryptedDoc } from "@/helpers/uploadDoc";

export default async function Page({ params }: { params: { id: string } }) {
  const doc = await prisma.encryptedDoc.findFirst({
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

  return (
    <EncryptedDocForm
      docData={docData}
      isEdit={true}
      callAction={updateEncryptedDoc}
    />
  );
}
