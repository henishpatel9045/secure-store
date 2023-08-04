import DocForm from "@/components/DocForm";
import { prisma } from "@/db";

export default async function page({ params }: { params: { id: string } }) {
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
  };

  return <DocForm docData={docData} isEdit={true} />;
}
