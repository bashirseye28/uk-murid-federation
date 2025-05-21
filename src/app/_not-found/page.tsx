// app/_not-found/page.tsx
export default function GlobalNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center p-10">
      <div>
        <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Not Found</h1>
        <p className="text-slate-600 mb-6">Sorry, we couldn’t find that page.</p>
        <a
          href="/"
          className="inline-block px-6 py-2 bg-mourid-green text-white rounded hover:bg-mourid-blue"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}