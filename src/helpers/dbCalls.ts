"use server";

import { TABLE_PAGE_SIZE } from "@/config/site";
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

const getUserData = async (email: string) => {
  const user = await prisma.user.findFirst({
    where: {
      email,
    },
    include: {
      Doc: {
        include: {
          _count: true,
          SharableDocs: true,
        },
      },
      EncryptedDoc: true,
    },
  });

  let totalDocs = user?.Doc.length;
  let docData = user?.Doc.reduce(
    (data, doc) => [
      data[0] + doc.SharableDocs.length,
      data[1] + Number(doc.size),
    ],
    [0, 0]
  );

  const data = {
    accounrId: user?.googleId,
    spaceUsed: docData?.[1],
    docs: {
      total: totalDocs,
      sharable: docData?.[0],
    },
    encryptedDocs: {
      total: user?.EncryptedDoc.length,
    },
  };

  return data;
};

const getSharedDocData = async (email: string, page: number) => {
  let limit = TABLE_PAGE_SIZE;

  const data = await prisma.user.findUnique({
    where: {
      email: email,
    },
    include: {
      Doc: {
        include: {
          SharableDocs: true,
        },
      },
    },
  });

  let count = 0;

  const shareData = data?.Doc.reduce(
    (prev, doc) => {
      let tempShareData = doc.SharableDocs.map((item, index) => {
        return {
          id: item.id,
          docName: doc.name,
          createdAt: item.createdAt.toDateString(),
          expiredAt: item.expireAt.valueOf(),
          accessedFor: item.accessed,
        };
      });
      prev.push(...tempShareData);
      return prev;
    },
    new Array<{
      id: string;
      docName: string;
      createdAt: string;
      expiredAt: number;
      accessedFor: number;
    }>()
  );

  return {
    data: shareData?.slice(page * limit, (page + 1) * limit),
    totalPages: Math.ceil((shareData?.length ?? 0) / limit),
  };
};

const checkActiveDocShare = async (docId: string) => {
  const doc = await prisma.sharableDocs.findFirst({
    where: {
      docId,
      expireAt: {
        gt: new Date(Date.now() + 1000 * 30),
      },
    },
  });

  if (doc) {
    return {
      exists: true,
      doc: {
        id: doc.docId,
        expiredAt: doc.expireAt.valueOf(),
        link: "/share/" + doc.id,
        accessedFor: doc.accessed,
      },
    };
  }
  return {
    exists: false,
  };
};

const generateShare = async (formData: FormData) => {
  const docId = formData.get("docId") as string;
  const expireAt = new Date(Date.parse(formData.get("expiresAt") as string));

  const shareDoc = await prisma.sharableDocs.create({
    data: {
      docId: docId,
      expireAt: expireAt,
    },
  });

  return {
    id: shareDoc.docId,
    expiredAt: shareDoc.expireAt.valueOf(),
    link: "/share/" + shareDoc.id,
    accessedFor: shareDoc.accessed,
  };
};

export {
  getDocsData,
  getDocData,
  deleteDoc,
  getUserData,
  getSharedDocData,
  checkActiveDocShare,
  generateShare,
};
