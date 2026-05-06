export function Footer() {
  return (
    <footer className="border-t bg-white dark:bg-zinc-950 dark:border-zinc-800 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} InterviewBook. All rights reserved.</p>
      </div>
    </footer>
  );
}
