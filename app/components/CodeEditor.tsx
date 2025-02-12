// components/CodeEditor.tsx
"use client";

import React, { useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { Button } from "@/app/components/ui/button";
import { Loader2, Play } from "lucide-react";
import { editor } from "monaco-editor";

interface EditorProps {
  defaultLanguage?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

const CodeEditor = ({
  defaultLanguage = "javascript",
  defaultValue = "// Start coding here...",
  onChange,
}: EditorProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  function handleEditorDidMount(editor: editor.IStandaloneCodeEditor) {
    editorRef.current = editor;
    setIsLoading(false);
  }

  function handleEditorChange(value: string | undefined) {
    if (onChange && value) {
      onChange(value);
    }
  }

  async function handleRunCode() {
    if (!editorRef.current) return;
    const code = editorRef.current.getValue();
    // TODO: Implement code execution
    console.log("Running code:", code);
  }

  return (
    <div className="w-full h-full min-h-[500px] border rounded-lg overflow-hidden">
      {isLoading && (
        <div className="flex items-center justify-center h-full">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      )}

      <div className="bg-gray-800 p-2 flex items-center justify-between">
        <select
          aria-label="Programming Language"
          className="bg-gray-700 text-white px-3 py-1 rounded"
          defaultValue={defaultLanguage}
        >
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="python">Python</option>
        </select>

        <Button onClick={handleRunCode} className="flex items-center gap-2">
          <Play className="w-4 h-4" />
          Run Code
        </Button>
      </div>

      <Editor
        height="90%"
        defaultLanguage={defaultLanguage}
        defaultValue={defaultValue}
        theme="vs-dark"
        onMount={handleEditorDidMount}
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: true },
          fontSize: 14,
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};

export default CodeEditor;
