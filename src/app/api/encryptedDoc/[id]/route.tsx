import { UPLOAD_PATH_PREFIX } from "@/config/site";
import { prisma } from "@/db";
import { getFile } from "@/helpers/fileStorageFunctions";
import { decrypt, generatePassKeyHash } from "@/helpers/helper";
import { readFileSync } from "fs";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const url = new URL(req.url);
  const queryParams = new URLSearchParams(url.searchParams);
  let passKey = queryParams.get("passKey");
  const session = req.headers.get("Authorization");
  const userData = JSON.parse(session ?? "{}");
  passKey = generatePassKeyHash(passKey ?? "");

  if (userData) {
    const doc = await prisma.encryptedDoc.findFirst({
      where: {
        id: params.id,
        userEmail: userData?.email,
      },
    });

    if (doc && doc.path) {
      console.log("PassKry l :  ", passKey);
      console.log("doc,PassKey: l :  ", doc.passKey);

      try {
        if (!passKey || passKey !== doc.passKey) {
          console.log("If called");
          return new Response(
            JSON.stringify({ detail: "Error occurred passkey is incorrect." }),
            {
              status: 400,
            }
          );
        } else {
          console.log("Outside IF CALLED");

          const encFile = await getFile(doc.path);
          const file = decrypt(
            Buffer.from(await encFile.arrayBuffer()),
            doc?.passKey
          );

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
        }
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

  return new Response("You don't have access to this document.");
}
