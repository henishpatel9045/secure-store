"use server";

import {
  DATE_ISO_ADJUST,
  SHARE_LINK_PREFIX,
  TABLE_PAGE_SIZE,
} from "@/config/site";
import { prisma } from "@/db";
import { rmSync } from "./fileStorageFunctions";

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
    orderBy: {
      createdAt: "desc",
    },
  });

  return docsData;
};

// const getDocData = async (email: string) => {
//   const docsData = await prisma.doc.findMany({
//     where: {
//       userEmail: email,
//     },
//     select: {
//       id: true,
//       name: true,
//       fileType: true,
//       fileName: true,
//       description: true,
//       path: true,
//     },
//   });

//   return docsData;
// };

const deleteDoc = async (id: string) => {
  const doc = await prisma.doc.delete({
    where: {
      id,
    },
  });
  console.log(doc);

  try {
    await rmSync(doc.path ?? "");
  } catch (error) {
    console.log(error);
  }
};

const getEncryptedDocsData = async (email: string) => {
  const docsData = await prisma.encryptedDoc.findMany({
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

  const totalEncrypted = await prisma.encryptedDoc.aggregate({
    _sum: {
      size: true,
    },
    where: {
      userEmail: email,
    },
  });

  const data = {
    accountId: user?.googleId,
    spaceUsed: (docData?.[1] ?? 0) + Number(totalEncrypted._sum.size),
    docs: {
      total: totalDocs,
      sharable: docData?.[0],
    },
    encryptedDocs: {
      total: user?.EncryptedDoc.length,
    },
  };
  console.log("TotalEncrypted: ", totalEncrypted);

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

  const shareData = data?.Doc.reduce(
    (prev, doc) => {
      let tempShareData = doc.SharableDocs.map((item, index) => {
        return {
          id: item.id,
          docName: doc.name,
          createdAt: item.createdAt.toDateString(),
          expiredAt: item.expireAt,
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
      expiredAt: Date;
      accessedFor: number;
    }>()
  );

  return {
    data: shareData?.slice(page * limit, (page + 1) * limit),
    totalPages: Math.ceil((shareData?.length ?? 0) / limit),
  };
};

const deleteShareDoc = async (id: string) => {
  await prisma.sharableDocs.delete({
    where: {
      id,
    },
  });
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
        id: doc.id,
        expiredAt: doc.expireAt.valueOf() + DATE_ISO_ADJUST,
        link: SHARE_LINK_PREFIX + doc.id,
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

  console.log("From FORM:  ", expireAt.toISOString());

  const shareDoc = await prisma.sharableDocs.create({
    data: {
      docId: docId,
      expireAt: expireAt,
    },
  });

  console.log(shareDoc.expireAt);
  console.log();
  return {
    id: shareDoc.id,
    expiredAt: shareDoc.expireAt.valueOf() + DATE_ISO_ADJUST,
    link: SHARE_LINK_PREFIX + shareDoc.id,
    accessedFor: shareDoc.accessed,
  };
};

const createDocShareRequest = async (formData: FormData) => {
  const shareId = formData.get("id") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;

  const docId = (
    await prisma.sharableDocs.findFirst({
      where: {
        id: shareId,
      },
    })
  )?.docId;

  if (docId) {
    await prisma.docShareRequest.create({
      data: {
        docId: docId,
        senderName: name,
        senderEmail: email,
        message: message,
      },
    });
  }
};

const deleteEncryptedDoc = async (id: string) => {
  const doc = await prisma.encryptedDoc.delete({
    where: {
      id,
    },
  });
  try {
    await rmSync(doc?.path ?? "");
  } catch (error) {
    console.log("deleteEncryptedDoc: error: ", error);
  }
};

const getNotifications = async (email: string) => {
  const data = await prisma.docShareRequest.findMany({
    where: {
      doc: {
        userEmail: email,
      },
      visited: false,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      senderName: true,
      senderEmail: true,
      createdAt: true,
      doc: {
        select: {
          name: true,
          id: true,
        },
      },
    },
  });

  return data;
};

const markNoificationAsRead = async (id: number) => {
  await prisma.docShareRequest.update({
    where: {
      id,
    },
    data: {
      visited: true,
    },
  });
};

export {
  getDocsData,
  // getDocData,
  deleteDoc,
  getEncryptedDocsData,
  getUserData,
  getSharedDocData,
  checkActiveDocShare,
  generateShare,
  deleteShareDoc,
  createDocShareRequest,
  deleteEncryptedDoc,
  getNotifications,
  markNoificationAsRead,
};
