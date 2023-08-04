"use server";

import { prisma } from "@/db";

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

export { getDocsData, getDocData };
