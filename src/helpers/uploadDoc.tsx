"use server";
import { prisma } from "@/db";
import { writeFile, mkdirSync, existsSync, rmSync, rm } from "fs";
import { redirect } from "next/navigation";
import { Session } from "next-auth";
import { UPLOAD_PATH_PREFIX } from "@/config/site";

const dirCheck = (accountId: string) => {
  const uploadFolderPath = "./public/uploads";
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

const storeFile = async (
  file: File,
  session: Session | null,
  doc: {
    id: string;
    userEmail: string;
    name: string;
    fileName: string;
    description: string | null;
    fileType: string;
    size: bigint;
    path: string | null;
    createdAt: Date;
    updatedAt: Date;
  }
) => {
  if (!(session && session.user?.email)) {
    throw new Error("User is not logged in.");
  }
  const buffer = await fileToBuffer(file);
  dirCheck(session?.user?.email);
  let filePath: string =
    UPLOAD_PATH_PREFIX +
    "/uploads/" +
    session.user.email +
    "/doc/" +
    doc.id +
    file.name;

  try {
    writeFile(filePath, buffer, (err) => {});
    await prisma.doc.update({
      where: {
        id: doc.id,
      },
      data: {
        fileName: file.name,
        path: filePath.replace(UPLOAD_PATH_PREFIX, ""),
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
};

const saveDoc = async (formData: FormData, session: Session | null) => {
  const docName = formData.get("name") as string;
  const description = formData.get("description") as string;
  const file = formData.get("doc") as File;

  if (!(session && session.user?.email)) {
    throw new Error("User is not logged in.");
  }
  const doc = await prisma.doc.create({
    data: {
      name: docName,
      fileName: file.name,
      description,
      fileType: file.type,
      size: file.size,
      userEmail: session?.user?.email,
    },
  });

  await storeFile(file, session, doc);
  redirect("/dashboard/doc");
};

const updateDoc = async (formData: FormData, session: Session | null) => {
  const docName = formData.get("name") as string;
  const docId = formData.get("docId") as string;
  const description = formData.get("description") as string;
  const file = formData.get("doc") as File | undefined;

  if (!(session && session.user?.email)) {
    throw new Error("User is not logged in.");
  }

  let prevDoc = await prisma.doc.findFirst({
    where: {
      id: docId,
    },
  });
  console.log("PrevDoc: ", prevDoc);
  console.log("File: ", file);

  const doc = await prisma.doc.update({
    where: {
      id: docId,
    },
    data: {
      name: docName,
      fileName: file?.size ? file.name : prevDoc?.fileName,
      description,
      fileType: file?.size ? file.type : prevDoc?.fileType,
      size: file?.size ? file.size : prevDoc?.size,
      userEmail: session?.user?.email,
    },
  });
  console.log("doc: ", doc);

  if (file?.size) {
    rm(prevDoc?.path ?? "", (err) => {
      console.log("Error deleting current file: ", err);
    });
    await storeFile(file, session, doc);
  }
};

export { saveDoc, updateDoc };
