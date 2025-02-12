// app/(navigation)/editor/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import CodeEditor from "@/app/components/CodeEditor";
import ChatInterface from "@/app/components/ChatInterface";
import { useAuth } from "@/app/providers/AuthProvider";

export default function EditorPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Don't render anything while checking auth
  if (loading || !user) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Navigation Header */}
      <div className="flex flex-col w-full">
        <div className="bg-white border-b px-4 py-2 flex justify-between items-center">
          <h1 className="text-xl font-semibold">AI Code Editor</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {user.name || user.email}
            </span>
          </div>
        </div>

        {/* Editor Layout */}
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 flex flex-col">
            <div className="flex-1 p-4">
              <CodeEditor
                defaultValue="// Start coding here..."
              />
            </div>
          </div>
          <div className="w-96 border-l bg-white">
            <ChatInterface />
          </div>
        </div>
      </div>
    </div>
  );
}