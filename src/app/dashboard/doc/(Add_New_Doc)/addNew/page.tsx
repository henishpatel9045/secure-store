"use client";

// import { prisma } from "@/db";
// import { writeFile, mkdirSync, existsSync, rmSync } from "fs";
// import { join } from "path";
// import { redirect } from "next/navigation";
// import { Session, getServerSession } from "next-auth";
// import { POST } from "@/app/api/auth/[...nextauth]/route";
import { saveDoc } from "@/helpers/uploadDoc";
import { useSession } from "next-auth/react";

// const dirCheck = (accountId: string) => {
//   const uploadFolderPath = "./upload";
//   if (!existsSync(uploadFolderPath)) {
//     mkdirSync(uploadFolderPath);
//     console.log(`Created ${uploadFolderPath} folder.`);
//   }

//   // Step 2: Check whether ./upload/om/doc and ./upload/om/encDoc folders exist or not, if not then create them
//   const folderPath = join(uploadFolderPath, accountId);
//   const docFolderPath = join(folderPath, "doc");
//   const encDocFolderPath = join(folderPath, "encDoc");

//   if (!existsSync(folderPath)) {
//     mkdirSync(folderPath);
//     console.log(`Created ${folderPath} folder.`);
//   }

//   if (!existsSync(docFolderPath)) {
//     mkdirSync(docFolderPath);
//     console.log(`Created ${docFolderPath} folder.`);
//   }

//   if (!existsSync(encDocFolderPath)) {
//     mkdirSync(encDocFolderPath);
//     console.log(`Created ${encDocFolderPath} folder.`);
//   }
// };

// const fileToBuffer = async (file: File) => {
//   return Buffer.from(await file.arrayBuffer());
// };

// const saveDoc = async (formData: FormData, session: Session | null) => {
//   "use server";
//   const docName = formData.get("name") as string;
//   const description = formData.get("description") as string;
//   const file = formData.get("doc") as File;
//   console.log(session);

//   // if (!session) {
//   //   throw new Error("User is not logged in.");
//   // }
//   // const doc = await prisma.doc.create({
//   //   data: {
//   //     name: file.name,
//   //     fileType: file.type,
//   //     size: file.size,
//   //     userEmail: session?.user?.email,
//   //   },
//   // });

//   // console.log(doc);

//   // const buffer = await fileToBuffer(file);
//   // dirCheck(session?.user?.email);
//   // let filePath: string =
//   //   "./uploads/" + session.user.email + "/doc/" + doc.id + file.name;

//   // try {
//   //   writeFile(filePath, buffer, (err) => {});
//   // } catch (error) {
//   //   await prisma.doc.delete({
//   //     where: {
//   //       id: doc.id,
//   //     },
//   //   });
//   //   rmSync(filePath);
//   //   throw error;
//   // }
//   return redirect("/dashboard/doc");
// };

export default function page() {
  const { data: session } = useSession();

  return (
    <div className="flex-1 p-4 md:p-6">
      <h1 className="text-2xl font-bold">Add New Document</h1>
      <p className="divider mt-0" />
      <form
        action={(formData) => saveDoc(formData, session)}
        className="flex flex-col w-full gap-4"
      >
        <div className="grid grid-cols-6 gap-4 items-center">
          <label
            className="sm:text-md md:text-xl lg:text-xl sm:col-span-2 md:col-span-1 break-words"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            placeholder="Doc Name"
            className="input input-bordered w-fit md:w-full sm:col-span-4 md:col-span-5"
            name="name"
            id="name"
            required
          />
        </div>
        <div className="grid grid-cols-6 gap-4 items-center">
          <label
            className="sm:text-md md:text-xl lg:text-xl sm:col-span-2 md:col-span-1 break-words"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className="textarea textarea-bordered sm:col-span-4 md:col-span-5 w-fit md:w-full"
            placeholder="Description"
            name="description"
            id="description"
          />
        </div>
        <div className="grid grid-cols-6 gap-4 items-center">
          <label
            className="sm:text-md md:text-xl lg:text-xl sm:col-span-2 md:col-span-1 break-words"
            htmlFor="doc"
          >
            Document
          </label>
          <input
            type="file"
            className="file-input file-input-bordered sm:col-span-4 md:col-span-2 w-fit md:w-full"
            name="doc"
            id="doc"
            required
          />
        </div>
        <div className="w-full self-center grid grid-cols-2 gap-4 mt-20">
          <button type="submit" className="btn btn-info ">
            Save
          </button>
          <button type="reset" className="btn btn-warning">
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}
