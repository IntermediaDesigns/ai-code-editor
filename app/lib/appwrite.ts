'use client';
// lib/appwrite.ts
import { Client, Account, Databases, Functions } from 'appwrite';

const client = new Client();

client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || '')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '');

export const account = new Account(client);
export const databases = new Databases(client);
export const functions = new Functions(client);

// Database collection IDs
export const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '';
export const SNIPPETS_COLLECTION_ID = 'code_snippets';
export const CONVERSATIONS_COLLECTION_ID = 'ai_conversations';

// Helper function to check auth status
export async function checkAuthStatus() {
    try {
        const user = await account.get();
        return user;
    } catch (error) {
        return null;
    }
}