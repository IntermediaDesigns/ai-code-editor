// lib/auth.ts
import { account } from './appwrite';
import { ID } from 'appwrite';

export async function createAccount(email: string, password: string, name: string) {
    try {
        await account.create(
            ID.unique(),
            email,
            password,
            name
        );
        
        // Login immediately after account creation
        return await login(email, password);
    } catch (error) {
        throw error;
    }
}

export async function login(email: string, password: string) {
    try {
        return await account.createEmailSession(email, password);
    } catch (error) {
        throw error;
    }
}

export async function logout() {
    try {
        return await account.deleteSession('current');
    } catch (error) {
        throw error;
    }
}

export async function getCurrentSession() {
    try {
        return await account.getSession('current');
    } catch (error) {
        return null;
    }
}

export async function getCurrentUser() {
    try {
        return await account.get();
    } catch (error) {
        return null;
    }
}