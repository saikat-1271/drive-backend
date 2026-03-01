import * as crypto from 'crypto';

const ALGORITHM = 'aes-256-cbc';

// ⚠️ Must be 32 bytes for aes-256
const SECRET_KEY = crypto
  .createHash('sha256')
  .update(String(process.env.KEY))
  .digest(); // 32 bytes

// Encrypt
export function encrypt(text: string): string {
  const iv = crypto.randomBytes(16); // AES block size = 16 bytes

  const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);

  const encrypted = Buffer.concat([
    cipher.update(text, 'utf8'),
    cipher.final(),
  ]);

  // Return iv + encrypted (base64)
  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

// Decrypt
export function decrypt(encryptedText: string): string {
  const [ivHex, encryptedHex] = encryptedText.split(':');

  const iv = Buffer.from(ivHex, 'hex');
  const encrypted = Buffer.from(encryptedHex, 'hex');

  const decipher = crypto.createDecipheriv(ALGORITHM, SECRET_KEY, iv);

  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ]);

  return decrypted.toString('utf8');
}
