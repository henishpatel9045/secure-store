import { randomBytes, createHash } from "crypto";
import { createCipheriv, createDecipheriv } from "crypto";

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

function encrypt(text: string, key: string, iv: string) {
  const cipher = createCipheriv("aes-256-cbc", key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

// Decryption function using AES-CBC
function decrypt(encryptedText: string, key: string, iv: string) {
  const decipher = createDecipheriv("aes-256-cbc", key, iv);
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

export { bytesToSize, generateHash, sleep };
