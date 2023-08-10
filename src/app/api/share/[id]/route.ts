import { UPLOAD_PATH_PREFIX } from "@/config/site";
import { prisma } from "@/db";
import { readFileSync } from "fs";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const url = new URL(req.url);
  const queryParams = new URLSearchParams(url.searchParams);
  console.log("ID: ", params.id);

  const shareLink = await prisma.sharableDocs.findFirst({
    where: {
      id: params.id,
    },
    include: {
      doc: true,
    },
  });

  if (!shareLink || !shareLink.doc) {
    return new Response(
      JSON.stringify({
        detail: "Link is deleted.",
      }),
      { status: 401 }
    );
  }

  if (shareLink?.expireAt.valueOf() <= Date.now()) {
    return new Response(
      JSON.stringify({
        detail: "Link is expired.",
      }),
      { status: 401 }
    );
  }

  let doc = shareLink.doc;

  if (doc && doc.path) {
    try {
      const file = readFileSync(UPLOAD_PATH_PREFIX + doc.path);
      const headers = new Headers();
      headers.set(
        "Content-Disposition",
        `${
          (queryParams.get("inline") as number | null) == 1
            ? "inline"
            : "attachment"
        }; filename=${doc.fileName}`
      );
      headers.set("Content-Type", doc.fileType);
      await prisma.sharableDocs.update({
        where: {
          id: shareLink.id,
        },
        data: {
          accessed: {
            increment: 1,
          },
        },
      });
      return new Response(file, {
        headers: headers,
        status: 200,
      });
    } catch (error) {
      console.log("ShareDocAPI: error: ", error);
      return new Response(
        JSON.stringify({
          detail: "Error occurred.",
        }),
        { status: 500 }
      );
    }
  }

  return new Response(
    JSON.stringify({
      detail: "Respective document not found.",
    }),
    { status: 500 }
  );
}
