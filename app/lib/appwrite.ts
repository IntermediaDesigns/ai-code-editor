// lib/appwrite.ts
import { Client, Account, Databases, Functions } from 'appwrite';

const client = new Client();

// Make sure to check if we're in a browser environment
if (typeof window !== 'undefined') {
  client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '')
}

export const account = new Account(client);
export const databases = new Databases(client);
export const functions = new Functions(client);
export { ID } from 'appwrite';

// Database collection IDs
export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '';
export const SNIPPETS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_SNIPPETS_COLLECTION_ID || '';
export const CONVERSATIONS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_CONVERSATIONS_COLLECTION_ID || '';
export const USERS_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID || '';