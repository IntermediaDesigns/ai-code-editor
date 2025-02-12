// lib/auth.ts
import { account } from './appwrite';
import { ID } from 'appwrite';

export async function signUp(email: string, password: string, name: string) {
  try {
    // Create the user account
    const user = await account.create(
      ID.unique(),
      email,
      password,
      name
    );

    // Log in the user immediately after sign up
    await signIn(email, password);

    return user;
  } catch (error) {
    console.error('Sign up error:', error);
    throw error;
  }
}

export async function signIn(email: string, password: string) {
  try {
    return await account.createSession(email, password);
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
}

export async function signOut() {
  try {
    return await account.deleteSession('current');
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
}

export async function getCurrentUser() {
  try {
    return await account.get();
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
}

export async function isAuthenticated() {
  try {
    const user = await getCurrentUser();
    return !!user;
  } catch {
    return false;
  }
}