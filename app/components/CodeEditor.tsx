// components/CodeEditor.tsx
"use client";

import React, { useRef, useState, useEffect } from "react";
import { Editor, loader } from "@monaco-editor/react";
import { Button } from "../components/ui/button";
import { Loader2, Play } from "lucide-react";
import type { editor } from 'monaco-editor';

// Configure Monaco Editor loader
loader.config({
  paths: {
    vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.43.0/min/vs'
  }
});

interface EditorProps {
  defaultLanguage?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSelectionChange?: (selection: string) => void;
}

const CodeEditor = ({
  defaultLanguage = "javascript",
  defaultValue = "// Start coding here...",
  onChange,
  onSelectionChange,
}: EditorProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const monacoRef = useRef<any>(null);

  useEffect(() => {
    // Cleanup function
    return () => {
      if (editorRef.current) {
        editorRef.current.dispose();
      }
    };
  }, []);

  function handleEditorDidMount(editor: editor.IStandaloneCodeEditor, monaco: any) {
    editorRef.current = editor;
    monacoRef.current = monaco;
    setIsLoading(false);

    // Add selection change listener
    editor.onDidChangeCursorSelection((e) => {
      if (onSelectionChange) {
        const selection = editor.getModel()?.getValueInRange(e.selection) || '';
        onSelectionChange(selection);
      }
    });

    // Configure editor features
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      handleSaveCode();
    });

    // Add basic autocompletion suggestions
    monaco.languages.registerCompletionItemProvider('javascript', {
      provideCompletionItems: (model: any, position: any) => {
        const suggestions = [
          {
            label: 'console.log',
            kind: monaco.languages.CompletionItemKind.Function,
            insertText: 'console.log($1)',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          },
          {
            label: 'function',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'function ${1:name}(${2:params}) {\n\t${3}\n}',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          },
          // Add more suggestions as needed
        ];
        return { suggestions };
      }
    });
  }

  function handleEditorChange(value: string | undefined) {
    if (onChange && value) {
      onChange(value);
    }
  }

  async function handleRunCode() {
    if (!editorRef.current) return;
    const code = editorRef.current.getValue();
    try {
      // Safely evaluate code in a controlled environment
      const result = await evaluateCode(code);
      console.log('Code execution result:', result);
    } catch (error) {
      console.error('Code execution error:', error);
    }
  }

  async function handleSaveCode() {
    if (!editorRef.current) return;
    const code = editorRef.current.getValue();
    // TODO: Implement save functionality
    console.log('Saving code:', code);
  }

  // Safe code evaluation function
  const evaluateCode = async (code: string) => {
    // TODO: Implement secure code evaluation
    // For now, just return the code
    return code;
  };

  return (
    <div className="w-full h-full min-h-[500px] border rounded-lg overflow-hidden flex flex-col">
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
          onChange={(e) => {
            if (editorRef.current) {
              const model = editorRef.current.getModel();
              if (model) {
                monacoRef.current?.editor.setModelLanguage(model, e.target.value);
              }
            }
          }}
        >
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="python">Python</option>
        </select>

        <div className="flex gap-2">
          <Button onClick={handleSaveCode} variant="outline" className="flex items-center gap-2">
            Save
          </Button>
          <Button onClick={handleRunCode} className="flex items-center gap-2">
            <Play className="w-4 h-4" />
            Run Code
          </Button>
        </div>
      </div>

      <div className="flex-1">
        <Editor
          height="100%"
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
            wordWrap: "on",
            suggest: {
              showWords: true,
              showSnippets: true,
              showUsers: true,
            },
            quickSuggestions: {
              other: true,
              comments: true,
              strings: true
            },
            formatOnPaste: true,
            formatOnType: true,
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;