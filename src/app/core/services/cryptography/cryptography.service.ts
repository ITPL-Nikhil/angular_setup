const DEFAULT_HASH_PASSWORD = 'mySuperSecurePassword'; // The password for key derivation
// Static string salt (convert it to Uint8Array)
const STATIC_SALT_STRING = 'my-static-salt';

// Helper function to convert a string to Uint8Array (for static salt)
function stringToUint8Array(str: string): Uint8Array {
  const encoder = new TextEncoder();
  return encoder.encode(str); // Convert string to Uint8Array
}

const STATIC_SALT = stringToUint8Array(STATIC_SALT_STRING); // Convert string to Uint8Array

// Deriving a key using PBKDF2 with static salt
async function deriveKey(
  password: string,
  salt: Uint8Array
): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);

  // Import password as a base key for PBKDF2
  const baseKey = await window.crypto.subtle.importKey(
    'raw', // Key format
    passwordBuffer, // Password buffer
    { name: 'PBKDF2' }, // Key algorithm
    false, // Extractable (not extractable for security)
    ['deriveKey'] // Allowed usages
  );

  // Derive the key using PBKDF2 with SHA-256
  return window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt, // Static salt used in key derivation (as Uint8Array)
      iterations: 100000, // Number of iterations for security
      hash: 'SHA-256', // Hash function
    },
    baseKey, // Base key (derived from password)
    { name: 'AES-GCM', length: 256 }, // Desired key algorithm (AES-GCM)
    true, // Extractable for encryption/decryption operations
    ['encrypt', 'decrypt'] // Key usages
  );
}

// Check if window.crypto is available (only in browser environment)
function isBrowser(): boolean {
  return typeof window !== 'undefined' && !!window.crypto;
}

// Encrypting data using the derived key with static salt
export async function encryptData({
  data,
  password = DEFAULT_HASH_PASSWORD,
}: {
  data: string;
  password?: string;
}): Promise<string | null> {
  try {
    if (!isBrowser()) {
      return null;
    }

    const key = await deriveKey(password, STATIC_SALT); // Derive key from password and static salt

    const iv = window.crypto.getRandomValues(new Uint8Array(12)); // 12 bytes IV for AES-GCM
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(data); // Encode the data as Uint8Array

    // Encrypt the data using AES-GCM
    const encryptedData = await window.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      encodedData
    );

    // Combine the IV and encrypted data into a single array (salt is static and not included here)
    const encryptedBuffer = new Uint8Array(encryptedData);
    const ivAndEncryptedData = new Uint8Array(
      iv.length + encryptedBuffer.length
    );
    ivAndEncryptedData.set(iv, 0); // Set IV at the beginning
    ivAndEncryptedData.set(encryptedBuffer, iv.length); // Set encrypted data after IV

    // Return the encrypted data as a base64 string
    return btoa(String.fromCharCode(...ivAndEncryptedData));
  } catch {
    return null;
  }
}

// Decrypting data using the derived key with static salt
export async function decryptData({
  encryptedData,
  password = DEFAULT_HASH_PASSWORD,
}: {
  encryptedData: string;
  password?: string;
}): Promise<string | null> {
  try {
    if (!isBrowser()) {
      return null;
    }

    // Decode the base64 encrypted data
    const ivAndEncryptedData = new Uint8Array(
      atob(encryptedData)
        .split('')
        .map((c) => c.charCodeAt(0))
    );

    // Extract IV (first 12 bytes)
    const iv = ivAndEncryptedData.slice(0, 12);
    // Extract the encrypted data (remaining bytes)
    const encryptedBuffer = ivAndEncryptedData.slice(12);

    // Derive the key using the same password and static salt
    const key = await deriveKey(password, STATIC_SALT);

    // Decrypt the data using AES-GCM
    const decryptedData = await window.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      encryptedBuffer
    );

    // Decode the decrypted data to a string
    const decoder = new TextDecoder();
    return decoder.decode(decryptedData);
  } catch {
    return null;
  }
}
