export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-4xl font-bold mb-4">Store Admin Portal</h1>
      <p className="text-gray-500 max-w-xl">
        Real-time inventory intelligence. Browse catalogue, analyze stock,
        inspect products, and execute retail management decisions with speed and clarity.
      </p>

      <div className="flex gap-4 mt-8">
        <a href="/inventory" className="px-6 py-3 bg-black text-white rounded-lg">
          Inventory Overview
        </a>

        <a href="/catalogue" className="px-6 py-3 bg-gray-800 text-white rounded-lg">
          Catalogue Overview
        </a>
      </div>
    </main>
  );
}
