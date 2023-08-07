import RequestForm from "@/components/RequestForm";
import ShareDoc from "@/components/ShareDoc";
import { prisma } from "@/db";

export default async function ShareDocView({
  params,
}: {
  params: { id: string };
}) {
  const shareDoc = await prisma.sharableDocs.findFirst({
    where: {
      id: params.id,
    },
  });

  let doc;

  if (shareDoc?.expireAt?.valueOf() ?? 0 > Date.now()) {
    doc = await prisma.doc.findFirst({
      where: {
        id: shareDoc?.docId,
      },
    });
  }

  if (!shareDoc) {
    return (
      <div className="w-full h-full flex items-center justify-center p-4">
        <p className="sm:text-3xl lg:text-4xl font-bold text-white sm:w-10/12 lg:w-2/3 badge badge-error py-6 px-4 h-fit">
          Shared link is invalid or deleted, please check again and if problem
          persists contact owner to generate other link!!!
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center">
      {doc && shareDoc.expireAt.valueOf() > Date.now() ? (
        <ShareDoc
          data={{
            docName: doc.name,
            fileName: doc.fileName,
            fileType: doc.fileType,
            size: Number(doc.size),
            expireAt: shareDoc.expireAt.valueOf(),
          }}
        />
      ) : (
        <RequestForm shareId={shareDoc.id} />
      )}
    </div>
  );
}
