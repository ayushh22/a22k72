export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="w-full max-w-5xl space-y-8">
        <h1 className="text-h1">Headline 1</h1>
        <h2 className="text-h2">Headline 2</h2>
        <h3 className="text-h3">Headline 3</h3>
        <p className="text-sans">
          This is a paragraph with the default sans-serif font style. The quick brown fox jumps over the lazy dog.
        </p>
        <p className="text-sans-sm">
          This is a paragraph with the small sans-serif font style. The quick brown fox jumps over the lazy dog.
        </p>
        <p className="text-sans-xs">
          This is a paragraph with the extra-small sans-serif font style. The quick brown fox jumps over the lazy dog.
        </p>
      </div>
    </main>
  );
}
