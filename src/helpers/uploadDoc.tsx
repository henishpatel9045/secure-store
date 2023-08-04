"use server";
import { prisma } from "@/db";
import { writeFile, mkdirSync, existsSync, rmSync } from "fs";
import { redirect } from "next/navigation";
import { Session } from "next-auth";

const dirCheck = (accountId: string) => {
  const uploadFolderPath = "./uploads";
  if (!existsSync(uploadFolderPath)) {
    mkdirSync(uploadFolderPath);
    console.log(`Created ${uploadFolderPath} folder.`);
  }

  // Step 2: Check whether ./upload/om/doc and ./upload/om/encDoc folders exist or not, if not then create them
  const folderPath = uploadFolderPath + "/" + accountId;
  const docFolderPath = folderPath + "/" + "doc";
  const encDocFolderPath = folderPath + "/" + "encDoc";

  if (!existsSync(folderPath)) {
    mkdirSync(folderPath);
    console.log(`Created ${folderPath} folder.`);
  }

  if (!existsSync(docFolderPath)) {
    mkdirSync(docFolderPath);
    console.log(`Created ${docFolderPath} folder.`);
  }

  if (!existsSync(encDocFolderPath)) {
    mkdirSync(encDocFolderPath);
    console.log(`Created ${encDocFolderPath} folder.`);
  }
};

const fileToBuffer = async (file: File) => {
  return Buffer.from(await file.arrayBuffer());
};

const saveDoc = async (formData: FormData, session: Session | null) => {
  const docName = formData.get("name") as string;
  const description = formData.get("description") as string;
  const file = formData.get("doc") as File;
  console.log(session);

  if (!(session && session.user?.email)) {
    throw new Error("User is not logged in.");
  }
  const doc = await prisma.doc.create({
    data: {
      name: docName,
      description,
      fileType: file.type,
      size: file.size,
      userEmail: session?.user?.email,
    },
  });

  const buffer = await fileToBuffer(file);
  dirCheck(session?.user?.email);
  let filePath: string =
    "./uploads/" + session.user.email + "/doc/" + doc.id + file.name;

  try {
    writeFile(filePath, buffer, (err) => {});
    await prisma.doc.update({
      where: {
        id: doc.id,
      },
      data: {
        path: filePath,
      },
    });
  } catch (error) {
    console.log(error);
    await prisma.doc.delete({
      where: {
        id: doc.id,
      },
    });
    rmSync(filePath);
    throw error;
  }
  redirect("/dashboard/doc");
};

export { saveDoc };
