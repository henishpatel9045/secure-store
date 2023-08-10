import { UPLOAD_PATH_PREFIX } from "@/config/site";
import { prisma } from "@/db";
import { getFile } from "@/helpers/fileStorageFunctions";
import { readFileSync } from "fs";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const url = new URL(req.url);
  const queryParams = new URLSearchParams(url.searchParams);
  const session = req.headers.get("Authorization");
  const userData = JSON.parse(session ?? "{}");

  if (userData) {
    const doc = await prisma.doc.findFirst({
      where: {
        id: params.id,
      },
    });
    if (doc?.userEmail === userData?.email) {
      if (doc && doc.path) {
        try {
          const file = await getFile(doc.path);
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

          return new Response(file, {
            headers: headers,
            status: 200,
          });
        } catch (error) {
          console.log(error);
          return new Response(
            JSON.stringify({
              detail: "Error occurred.",
            })
          );
        }
      }
    }
  }

  return new Response("You don't have access to this document.");
}
