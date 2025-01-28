import { Injectable } from '@angular/core';
import { isBrowser } from '../../utils';
import { decryptData, encryptData } from '../cryptography/cryptography.service';

const DEFAULT_LOCALSTORAGE_HASH_PASSWORD = 'localStorageHashPassword'; // The password for key derivation

// Class component for managing local storage with encryption and decryption
@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  // Store encrypted data in localStorage with generic type
  async storeLocalData<T>({
    key,
    value,
    password = DEFAULT_LOCALSTORAGE_HASH_PASSWORD,
  }: {
    key: string;
    value: T;
    password?: string;
  }): Promise<void> {
    if (!isBrowser()) {
      // If not in a browser environment, do nothing or handle accordingly
      return;
    }

    const dataToStore =
      typeof value === 'string' ? value : JSON.stringify(value); // Convert object to string if necessary
    const encryptedData = await encryptData({
      data: dataToStore,
      password: password,
    }); // Encrypt the data

    if (encryptedData) {
      localStorage.setItem(key, encryptedData); // Store encrypted data in localStorage
    }
  }

  // Retrieve and decrypt data from localStorage with generic type
  async fetchLocalData<T>({
    key,
    password = DEFAULT_LOCALSTORAGE_HASH_PASSWORD,
  }: {
    key: string;
    password?: string;
  }): Promise<T | null> {
    if (!isBrowser()) {
      // If not in a browser environment, do nothing or handle accordingly
      return null;
    }

    const encryptedData = localStorage.getItem(key);
    if (!encryptedData) {
      return null;
    } // If no data exists for the key, return null

    const decryptedData = await decryptData({
      encryptedData,
      password: password,
    }); // Decrypt the data

    try {
      if (!isBrowser() || !decryptedData) {
        // If not in a browser environment, return null or handle accordingly
        return null;
      }
      return JSON.parse(decryptedData) as T; // If the data is a JSON object, parse it and cast to type T
    } catch {
      return decryptedData as unknown as T; // If it's not JSON, return the decrypted string cast to type T
    }
  }

  // Clear data from localStorage
  clearLocalStorage({ key }: { key?: string }): void {
    if (!isBrowser()) {
      return;
    }

    if (key) {
      localStorage.removeItem(key); // Remove a specific key
    } else {
      localStorage.clear(); // Clear all items
    }
  }
}
