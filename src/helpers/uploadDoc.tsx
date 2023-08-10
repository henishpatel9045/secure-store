"use server";
import { prisma } from "@/db";
import { mkdirSync, existsSync, rm, write } from "fs";
import { redirect } from "next/navigation";
import { Session } from "next-auth";
import { UPLOAD_PATH_PREFIX } from "@/config/site";
import { encrypt, generatePassKeyHash } from "./helper";
import { writeFile, rmSync } from "./fileStorageFunctions";

const dirCheck = (accountId: string) => {
  const uploadFolderPath = UPLOAD_PATH_PREFIX + "/uploads";
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
  },
  isEncrypted: boolean,
  key?: string
) => {
  if (!(session && session.user?.email)) {
    throw new Error("User is not logged in.");
  }

  // ----------------------- LOCAL FILE UPLOAD -----------------------------
  // // // dirCheck(session?.user?.email);
  // // // let filePath: string =
  // // //   UPLOAD_PATH_PREFIX +
  // // //   "/uploads/" +
  // // //   session.user.email +
  // // //   (isEncrypted ? "/encDoc/" : "/doc/") +
  // // //   doc.id +
  // // //   (isEncrypted ? doc.name + ".bin" : file.name);

  let filePath: string =
    "uploads/" +
    session.user.email +
    (isEncrypted ? "/encDoc/" : "/doc/") +
    doc.id +
    (isEncrypted ? doc.name + ".bin" : file.name);

  let buffer = await fileToBuffer(file);
  if (isEncrypted) {
    if (!key) throw new Error("Key is required to store encrypted documents.");
    buffer = encrypt(buffer, key);
    try {
      await writeFile(filePath, buffer, (err) => {
        console.log("Error in FIREBASE UPLOAD: ", err);
      });

      await prisma.encryptedDoc.update({
        where: {
          id: doc.id,
        },
        data: {
          fileName: file.name,
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
      await rmSync(filePath);
      throw error;
    }
  } else {
    try {
      await writeFile(filePath, buffer, (err) => {});
      await prisma.doc.update({
        where: {
          id: doc.id,
        },
        data: {
          fileName: file.name,
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
      await rmSync(filePath);
      throw error;
    }
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

  await storeFile(file, session, doc, false);
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
    try {
      await storeFile(file, session, doc, false);
      try { 
        await rmSync(prevDoc?.path ?? "");
      } catch (error) {}
    } catch (error) {
      await prisma.doc.update({
        where: {
          id: doc.id,
        },
        data: {
          name: prevDoc?.name,
          fileName: prevDoc?.fileName,
          fileType: prevDoc?.fileType,
          description: prevDoc?.description,
          path: prevDoc?.path,
          size: prevDoc?.size,
        },
      });
      console.error(error);
    }
  }
};

const saveEncrypted = async (formData: FormData, session: Session | null) => {
  const docName = formData.get("name") as string;
  const passKey = formData.get("passKey") as string;
  const description = formData.get("description") as string;
  const file = formData.get("doc") as File;

  if (!(session && session.user?.email)) {
    throw new Error("User is not logged in.");
  }
  const doc = await prisma.encryptedDoc.create({
    data: {
      name: docName,
      fileName: file.name,
      description,
      passKey: generatePassKeyHash(passKey),
      fileType: file.type,
      size: file.size,
      userEmail: session?.user?.email,
    },
  });

  await storeFile(file, session, doc, true, doc.passKey);
  redirect("/dashboard/encryptedDoc");
};

const updateEncryptedDoc = async (
  formData: FormData,
  session: Session | null
) => {
  const docName = formData.get("name") as string;
  const docId = formData.get("docId") as string;
  const description = formData.get("description") as string;
  const passKey = formData.get("passKey") as string | undefined;
  const file = formData.get("doc") as File | undefined;

  if (!(session && session.user?.email)) {
    throw new Error("User is not logged in.");
  }

  let prevDoc = await prisma.encryptedDoc.findFirst({
    where: {
      id: docId,
    },
  });

  const doc = await prisma.encryptedDoc.update({
    where: {
      id: docId,
      userEmail: session.user.email,
    },
    data: {
      name: docName,
      fileName: file?.size ? file.name : prevDoc?.fileName,
      passKey: passKey ? generatePassKeyHash(passKey) : prevDoc?.passKey,
      description,
      fileType: file?.size ? file.type : prevDoc?.fileType,
      size: file?.size ? file.size : prevDoc?.size,
      userEmail: session?.user?.email,
    },
  });

  if (file?.size) {
    try {
      await storeFile(file, session, doc, true, doc.passKey);
      try {
        await rmSync(prevDoc?.path ?? "");
      } catch (error) {}
    } catch (error) {
      await prisma.encryptedDoc.update({
        where: {
          id: doc.id,
        },
        data: {
          name: prevDoc?.name,
          fileName: prevDoc?.fileName,
          fileType: prevDoc?.fileType,
          description: prevDoc?.description,
          passKey: prevDoc?.passKey,
          path: prevDoc?.path,
          size: prevDoc?.size,
        },
      });
      console.error(error);
    }
  }
};

export { saveDoc, updateDoc, saveEncrypted, updateEncryptedDoc };
