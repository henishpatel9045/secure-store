import {
  deleteObject,
  getBlob,
  getDownloadURL,
  getStream,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "@/FirebaseConfig";

const writeFile = async (
  path: string,
  file: Buffer,
  callBack?: (err: any) => void
) => {
  try {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
  } catch (error) {
    callBack?.(error);
  }
};

const rmSync = async (path: string) => {
  try {
    const storageRef = ref(storage, path);
    await deleteObject(storageRef);
  } catch (error) {
    console.log("Firebase Deleting error: ", error);
  }
};

const getFile = async (path: string) => {
  const storageRef = ref(storage, path);

  const fileURL = await getDownloadURL(storageRef);
  const file = await fetch(fileURL);

  return await file.blob();
};

export { writeFile, rmSync, getFile };
