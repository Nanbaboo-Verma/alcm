export const metadata = {
  title: "About - MyApp",
  description: "About page",
};

export default function About() {
  return (
    <div className="max-w-[1200] mx-auto p-5">
      <div>
        <h1 className="text-2xl font-semibold mb-4">About MyApp</h1>
        <p className="text-zinc-700 dark:text-zinc-300">
          This is the About page. Click the header or sidebar links to navigate
          between routes.
        </p>
      </div>
    </div>
  );
}
