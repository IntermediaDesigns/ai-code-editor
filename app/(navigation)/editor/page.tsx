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
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-50">
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
  );
}