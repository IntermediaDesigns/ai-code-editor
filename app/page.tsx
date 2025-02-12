"use client";

import { useAuth } from "./providers/AuthProvider";
import { useRouter } from "next/navigation";
import { Button } from "./components/ui/button";

export default function Home() {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Welcome to AI Code Editor</h1>

        {user ? (
          <div className="space-y-6">
            <p className="text-lg">
              Welcome back, <span className="font-semibold">{user.name}</span>!
            </p>
            <div className="grid gap-4">
              <Button
                onClick={() => router.push("/editor")}
                className="w-full h-12 text-lg"
              >
                Open Editor
              </Button>
              <Button
                variant="outline"
                onClick={logout}
                className="w-full h-12 text-lg"
              >
                Logout
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <p className="text-lg">
              Create, edit, and enhance your code with AI assistance.
            </p>
            <div className="grid gap-4">
              <Button
                onClick={() => router.push("/login")}
                className="w-full h-12 text-lg"
              >
                Login
              </Button>
              <p className="text-center text-gray-600">
                Don&apos;t have an account?{" "}
                <button
                  onClick={() => router.push("/login")}
                  className="text-blue-500 hover:text-blue-600 font-semibold"
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}