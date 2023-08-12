import { randomBytes, createHash } from "crypto";
import { createCipheriv, createDecipheriv } from "crypto";

const bytesToSize = (bytes: number): string => {
  if (bytes === 0) return "0 KB";

  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const value = (bytes / Math.pow(1024, i)).toFixed(2);

  return `${value} ${sizes[i]}`;
};

const generatePassKeyHash = (key: string): string => {
  key = key.trim();
  key = createHash("sha256").update(String(key)).digest("base64").substr(0, 32);
  return key;
};

const sleep = (milliseconds: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
};

const algorithm = "aes-256-ctr";

const encrypt = (buffer: Buffer, key: string) => {
  // Create an initialization vector
  const iv = randomBytes(16);
  // Create a new cipher using the algorithm, key, and iv
  const cipher = createCipheriv(algorithm, key, iv);
  // Create the new (encrypted) buffer
  const result = Buffer.concat([iv, cipher.update(buffer), cipher.final()]);
  return result;
};

const decrypt = (encrypted: Buffer, key: string) => {
  // Get the iv: the first 16 bytes
  const iv = encrypted.slice(0, 16);
  // Get the rest
  encrypted = encrypted.slice(16);
  // Create a decipher
  const decipher = createDecipheriv(algorithm, key, iv);
  // Actually decrypt it
  const result = Buffer.concat([decipher.update(encrypted), decipher.final()]);
  return result;
};

const generateAvatarText = (name: string) => {
  name = name.trim();
  let n = name.split(" ");
  return n?.[0][0].toUpperCase() + n?.[1][0].toUpperCase();
};

export {
  bytesToSize,
  generatePassKeyHash,
  sleep,
  encrypt,
  decrypt,
  generateAvatarText,
};
