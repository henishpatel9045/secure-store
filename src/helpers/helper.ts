import { randomBytes, createHash } from "crypto";

const bytesToSize = (bytes: number): string => {
  if (bytes === 0) return "0 KB";

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = (bytes / Math.pow(1024, i)).toFixed(2);

  return `${value} ${sizes[i]}`;
};

const generateHash = (password: string): string => {
  const salt = process.env.SECRET_KEY; // Generate a random salt
  const hash = createHash("sha256")
    .update(password + salt)
    .digest("hex"); // Hash the password with the salt
  return salt + hash; // Combine salt and hash for storage
};

const sleep = (milliseconds: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
};

export { bytesToSize, generateHash, sleep };
