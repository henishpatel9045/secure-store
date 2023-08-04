"use server";

import { prisma } from "@/db";
import { rmSync } from "fs";

const getDocsData = async (email: string) => {
  const docsData = await prisma.doc.findMany({
    where: {
      userEmail: email,
    },
    select: {
      id: true,
      name: true,
      fileType: true,
      fileName: true,
      path: true,
    },
  });

  return docsData;
};

const getDocData = async (email: string) => {
  const docsData = await prisma.doc.findMany({
    where: {
      userEmail: email,
    },
    select: {
      id: true,
      name: true,
      fileType: true,
      fileName: true,
      description: true,
      path: true,
    },
  });

  return docsData;
};

const deleteDoc = async (id: string) => {
  const doc = await prisma.doc.delete({
    where: {
      id,
    },
  });

  try {
    rmSync("./public" + doc.path ?? "");
  } catch (error) {
    console.log(error);
  }
};

export { getDocsData, getDocData, deleteDoc };
