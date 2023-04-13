const crypto = require('crypto');

// Key and IV used for decryption
const key = Buffer.from('de838e073a5204169c46a114828476d5230530ae6b63af98df5ed3d23c0000f5', 'hex');
const iv = Buffer.alloc(16, 0);

// Base64-encoded ciphertext
const ciphertext = 'NiT26uScsuvuSO16yz/vs8yRQ1pQfM+T/t+aPPvG8Q/BvjiPt9v4K8ymR1oFyT+qxThbhtHwXUnF2JSmvS6adtJhYueIfHkQv2gOv5Jt5TZFgr1xKBQh9QXMNW7jhOF78eUq/35viRXsSc56/ZsJCpw6mT6XHDagNwuFPYvFLOl9S4ahUgaVOS1o3z7gxSsgdFz/L8m3ZH70CrV8tw1+FQ==';

// Decryption function
function decrypt(ciphertext, key, iv) {
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decrypted = decipher.update(ciphertext, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// Decrypt the ciphertext and log the result
const plaintext = decrypt(ciphertext, key, iv);
console.log(plaintext);
