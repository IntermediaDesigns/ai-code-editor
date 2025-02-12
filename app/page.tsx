export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Welcome to AI Code Editor</h1>
      <div className="grid gap-4">
        <a
          href="/editor"
          className="p-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-center"
        >
          Open Editor
        </a>
        <a
          href="/login"
          className="p-4 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 text-center"
        >
          Login
        </a>
      </div>
    </div>
  );
}
